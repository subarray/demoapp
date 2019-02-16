#!/bin/bash

apt update
apt install -y openjdk-8-jdk postgresql-9.5 maven

sudo -u postgres createuser -s root
sudo createdb db

cat > /etc/postgresql/9.5/main/pg_hba.conf << EOF
local   all             all                                     peer
host    all             all             127.0.0.1/32            trust
EOF

sudo service postgresql restart
sudo psql -d db < $(dirname "$0")/schema.sql

# firewall deny all but
sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp

git clone https://github.com/subarray/demoapp
cd demoapp
mvn package
sudo java -jar target/gs-spring-boot-0.1.0.jar & 
