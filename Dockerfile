FROM      python:2.7.12
LABEL Timothy Lam
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash
RUN apt-get install -y nodejs
RUN npm install express.io

