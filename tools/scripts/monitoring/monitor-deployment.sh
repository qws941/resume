#!/bin/bash
# Monitor resume deployment session in real-time

SESSION_NAME="resume-deploy"
WINDOW_NAME="main"

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📺 Resume Deployment Monitor${NC}"
echo ""

# Check if session exists
if ! tmux has-session -t "${SESSION_NAME}" 2>/dev/null; then
    echo -e "${RED}❌ Session '${SESSION_NAME}' not found${NC}"
    echo ""
    echo "Start deployment with:"
    echo "   ./scripts/deployment/deploy-with-monitoring.sh"
    exit 1
fi

echo -e "${GREEN}✅ Session found: ${SESSION_NAME}${NC}"
echo ""
echo -e "${BLUE}Choose monitoring mode:${NC}"
echo "  1) Attach to session (interactive)"
echo "  2) Stream output (read-only, 2-second refresh)"
echo "  3) Get current status snapshot"
echo "  4) Search logs for errors"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo -e "${BLUE}🔗 Attaching to session...${NC}"
        echo "   Press 'Ctrl+B, D' to detach"
        sleep 1
        tmux attach -t "${SESSION_NAME}"
        ;;
    2)
        echo -e "${BLUE}📡 Streaming output (Ctrl+C to stop)...${NC}"
        echo ""
        while true; do
            clear
            echo -e "${BLUE}=== Resume Deployment Stream ===${NC}"
            echo "Session: ${SESSION_NAME} | $(date '+%Y-%m-%d %H:%M:%S')"
            echo ""
            tmux capture-pane -t "${SESSION_NAME}:${WINDOW_NAME}" -p -S -30
            sleep 2
        done
        ;;
    3)
        echo -e "${BLUE}📸 Current status snapshot:${NC}"
        echo ""
        tmux capture-pane -t "${SESSION_NAME}:${WINDOW_NAME}" -p -S -50
        ;;
    4)
        echo -e "${BLUE}🔍 Searching for errors in logs...${NC}"
        echo ""
        OUTPUT=$(tmux capture-pane -t "${SESSION_NAME}:${WINDOW_NAME}" -p)

        ERRORS=$(echo "$OUTPUT" | grep -iE "(error|failed|fatal)" || true)
        if [ -n "$ERRORS" ]; then
            echo -e "${RED}Found errors:${NC}"
            echo "$ERRORS"
        else
            echo -e "${GREEN}✅ No errors found in logs${NC}"
        fi

        echo ""
        WARNINGS=$(echo "$OUTPUT" | grep -iE "(warning|warn)" || true)
        if [ -n "$WARNINGS" ]; then
            echo -e "${BLUE}Warnings found:${NC}"
            echo "$WARNINGS"
        else
            echo -e "${GREEN}✅ No warnings found${NC}"
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac
