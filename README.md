# Third Party API Integration

## Overview

Web application for integrating with a third party API, using a local database. The database container uses MongoDB image, and the backend uses Node image.

## Dependencies

- Docker
- Docker Compose

## Getting Started

1. Export Environment Variables or create **.env** file in root directory. See **.env.sample** for required variables
1. Start the application

- **Production:**

```bash
docker-compose up --build -d
```

- **Development:**

```bash
docker-compose -f docker-compose-dev.yml up --build
```

## Routes:

```
/customers/populate-all-data
/tickets/populate-all-data
/actions/populate-all-data
```

Note that the **Actions** route can return a **very large number** of 3rd party API calls, and can max out the daily quota.
