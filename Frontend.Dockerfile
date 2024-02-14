FROM nginx
COPY ./ts-dashboard-frontend/build /usr/share/nginx/html
