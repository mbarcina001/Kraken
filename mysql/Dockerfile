# docker build -t kraken-mysql .
# docker run -d -p 3406:3306 --name kraken-mysql kraken-mysql
# docker exec -it kraken-mysql bash

# Derived from official mysql image (our base image)
FROM mysql

# Add a database and a user
ENV MYSQL_DATABASE=kraken \
    MYSQL_ROOT_PASSWORD=root

# Add the content of the sql-scripts/ directory to the image
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/