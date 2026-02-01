#!/bin/bash
# Install systemd timer for daily resume sync

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
USER=$(whoami)

# Copy service files
sudo cp "$SCRIPT_DIR/resume-sync.service" /etc/systemd/system/resume-sync@.service
sudo cp "$SCRIPT_DIR/resume-sync.timer" /etc/systemd/system/resume-sync@.timer

# Enable and start timer
sudo systemctl daemon-reload
sudo systemctl enable "resume-sync@${USER}.timer"
sudo systemctl start "resume-sync@${USER}.timer"

echo "✓ Installed resume-sync timer"
echo "  Check status: systemctl status resume-sync@${USER}.timer"
echo "  View logs: journalctl -u resume-sync@${USER}.service"
