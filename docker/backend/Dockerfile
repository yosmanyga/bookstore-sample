FROM node:22-alpine

# Copy entrypoint script
COPY ./docker/backend/entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
