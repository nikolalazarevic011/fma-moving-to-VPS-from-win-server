#!/bin/bash

# FMA Next.js App Restart Script for VPS
# This replaces the Windows PowerShell IIS restart functionality

APP_NAME="fma-nextjs"
APP_DIR="/home/yourusername/public_html"  # Update this path
LOGS_DIR="$APP_DIR/logs"
LOG_FILE="$LOGS_DIR/restart-$(date +%Y-%m-%d).log"

# Ensure logs directory exists
mkdir -p "$LOGS_DIR"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
    echo "$1"
}

log_message "=== Starting app restart process ==="

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    log_message "Using PM2 for process management"
    
    # Check if app is running
    if pm2 list | grep -q "$APP_NAME"; then
        log_message "Restarting PM2 process: $APP_NAME"
        pm2 restart "$APP_NAME"
        if [ $? -eq 0 ]; then
            log_message "SUCCESS: PM2 process restarted"
        else
            log_message "ERROR: Failed to restart PM2 process"
            exit 1
        fi
    else
        log_message "PM2 process not found, starting new instance"
        cd "$APP_DIR" || exit 1
        pm2 start npm --name "$APP_NAME" -- start
        if [ $? -eq 0 ]; then
            log_message "SUCCESS: PM2 process started"
        else
            log_message "ERROR: Failed to start PM2 process"
            exit 1
        fi
    fi

elif command -v systemctl &> /dev/null; then
    log_message "Using systemd for process management"
    
    # Restart systemd service
    sudo systemctl restart "$APP_NAME"
    if [ $? -eq 0 ]; then
        log_message "SUCCESS: Systemd service restarted"
    else
        log_message "ERROR: Failed to restart systemd service"
        exit 1
    fi

else
    log_message "Using manual process management"
    
    # Find and kill existing process
    PID=$(pgrep -f "node.*server.js")
    if [ ! -z "$PID" ]; then
        log_message "Stopping existing process (PID: $PID)"
        kill "$PID"
        sleep 2
        
        # Force kill if still running
        if kill -0 "$PID" 2>/dev/null; then
            log_message "Force killing process"
            kill -9 "$PID"
        fi
    fi
    
    # Start new process
    cd "$APP_DIR" || exit 1
    log_message "Starting new process"
    nohup npm start > "$LOGS_DIR/app.log" 2>&1 &
    
    if [ $? -eq 0 ]; then
        log_message "SUCCESS: Process started"
    else
        log_message "ERROR: Failed to start process"
        exit 1
    fi
fi

# Clear Next.js cache
if [ -d "$APP_DIR/.next/cache" ]; then
    log_message "Clearing Next.js cache"
    rm -rf "$APP_DIR/.next/cache"
    log_message "Cache cleared"
fi

# Optional: Warmup the site
log_message "Performing site warmup"
SITE_URL="https://www.faithministriesalliance.org"
curl -s "$SITE_URL" > /dev/null
if [ $? -eq 0 ]; then
    log_message "Site warmup successful"
else
    log_message "Site warmup failed"
fi

log_message "=== App restart process completed ==="