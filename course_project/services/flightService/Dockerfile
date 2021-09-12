FROM ubuntu:latest

RUN apt-get -y update && apt-get install -y tzdata

ENV TZ=Russia/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV PGVER 12
RUN apt-get -y update && apt-get install -y postgresql-$PGVER

USER postgres

RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
    createdb -O docker flightService &&\
    /etc/init.d/postgresql stop

EXPOSE 5432

USER root


RUN apt-get install -y curl
RUN curl —silent —location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

COPY ./services/flightService/ /appFlight
WORKDIR /appFlight

RUN npm install

EXPOSE 8380

ENV PGPASSWORD docker
CMD service postgresql start && psql -h localhost -d flightService -U docker -p 5432 -a -q -f /appFlight/init.sql && npm start