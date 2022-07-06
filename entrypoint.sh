#!/bin/sh
set -e           # Stop on any error
npm run migrate  # Run migrations
npm run seed     # Preload initial data
exec "$@"        # Run the command as the main container process