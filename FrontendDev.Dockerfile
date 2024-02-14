# FROM node:16-slim AS development
FROM node:20-slim
# ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY ./frontend/package.json .
COPY ./frontend/yarn.lock .
RUN yarn
# Copy app files
COPY ./frontend .
# Expose port
EXPOSE 3000
# Start the app
CMD yarn start
