# Multi-stage build for Resume service
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    exiftool \
    && rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source files
COPY . .

# Build the worker
RUN npm run build:full

# Production stage
FROM node:20-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built web assets from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/web ./web

# Create Express server
RUN cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || 'unknown',
    environment: process.env.NODE_ENV || 'production'
  });
});

app.get('/ready', (req, res) => {
  // Check if worker.js exists
  const workerPath = path.join(__dirname, 'web', 'worker.js');
  const isReady = fs.existsSync(workerPath);

  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'ready' : 'not ready',
    timestamp: new Date().toISOString(),
    workerExists: isReady
  });
});

// Serve static files directly in development
if (isDev) {
  app.use(express.static('web'));

  // Fallback to index.html for SPA-like behavior
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
  });
} else {
  // Production: Use Cloudflare Worker emulation
  app.use('*', async (req, res) => {
    try {
      const workerPath = path.join(__dirname, 'web', 'worker.js');

      // Simple worker emulation
      const mockRequest = {
        url: req.originalUrl,
        method: req.method,
        headers: req.headers,
        cf: {
          country: 'KR'
        }
      };

      const mockWaitUntil = (promise) => {
        promise.catch(err => console.error('Background task failed:', err));
      };

      // Create a mock worker environment
      const workerCode = fs.readFileSync(workerPath, 'utf8');
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

      // Extract the fetch handler from the worker
      const fetchMatch = workerCode.match(/export default \{[\s\S]*?fetch:\s*async\s*\([^)]*\)\s*=>\s*{([\s\S]*?})[\s\S]*?}/);

      if (fetchMatch) {
        const fetchBody = fetchMatch[1];
        const fetchHandler = new AsyncFunction('request', 'env', 'ctx', fetchBody);

        const response = await fetchHandler(mockRequest, {}, { waitUntil: mockWaitUntil });

        // Set headers
        if (response.headers) {
          Object.entries(response.headers).forEach(([key, value]) => {
            res.set(key, value);
          });
        }

        // Send response
        if (typeof response.body === 'string') {
          res.send(response.body);
        } else if (response.body) {
          response.body.pipe(res);
        } else {
          res.end();
        }
      } else {
        // Fallback: serve static files
        const filePath = path.join(__dirname, 'web', req.path === '/' ? 'index.html' : req.path);
        if (fs.existsSync(filePath)) {
          res.sendFile(filePath);
        } else {
          res.status(404).send('Not Found');
        }
      }
    } catch (error) {
      console.error('Worker error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Resume service running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
EOF

# Change ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]