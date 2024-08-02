#!/bin/sh

# Install dependencies
npm install --loglevel verbose

# NX_REJECT_UNKNOWN_LOCAL_CACHE=0 is used to avoid the following error: https://nx.dev/troubleshooting/unknown-local-cache

# Generate Prisma client
NX_REJECT_UNKNOWN_LOCAL_CACHE=0 npx nx run bookstore-backend:prisma-generate --verbose

# Start the app
NX_REJECT_UNKNOWN_LOCAL_CACHE=0 npx nx run bookstore-backend:serve -- --host=0.0.0.0
