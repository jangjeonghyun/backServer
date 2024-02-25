#!/bin/bash
SERVER_NAME=pp_server
FILE=/home/ubuntu/.npm

/home/ubuntu/.nvm/versions/node/v18.17.0/bin/pm2 stop $SERVER_NAME

/home/ubuntu/.nvm/versions/node/v18.17.0/bin/pm2 start $SERVER_NAME