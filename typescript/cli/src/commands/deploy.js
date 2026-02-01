import { execSync } from 'child_process';
import chalk from 'chalk';
import path from 'path';

export async function deploy(options) {
  console.log(chalk.blue('🚀 Starting deployment...'));

  try {
    const { workerFile, dir, env } = options;

    if (!process.env.CLOUDFLARE_API_KEY || !process.env.CLOUDFLARE_EMAIL) {
      throw new Error('Missing Cloudflare credentials in .env');
    }

    if (workerFile) {
      console.log(chalk.yellow(`📦 Deploying worker file: ${workerFile}`));
      const workerDir = path.dirname(workerFile);

      const cmd = `npx wrangler deploy --env ${env}`;
      console.log(chalk.gray(`Running: ${cmd} in ${workerDir}`));

      execSync(cmd, {
        cwd: workerDir,
        stdio: 'inherit',
        env: { ...process.env },
      });
    }

    if (dir) {
      console.log(chalk.yellow(`📦 Deploying directory: ${dir}`));
      const cmd = `npx wrangler deploy --env ${env}`;
      console.log(chalk.gray(`Running: ${cmd} in ${dir}`));

      execSync(cmd, {
        cwd: dir,
        stdio: 'inherit',
        env: { ...process.env },
      });
    }

    console.log(chalk.green('✅ Deployment successful!'));
  } catch (error) {
    console.error(chalk.red('❌ Deployment failed:'), error.message);
    process.exit(1);
  }
}
