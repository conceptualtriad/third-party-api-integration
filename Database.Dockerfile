# FROM mongo:3.6.2
FROM mongo

# Config file to create database and user
COPY ./mongo.config.js /docker-entrypoint-initdb.d/
# Expose default mongodb port to host
EXPOSE 27017
# Start mongo with authorization enabled
CMD ["mongod", "--auth"]