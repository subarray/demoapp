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

sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
