#Python Node.js Dockerfile

#Pull base image
FROM python:2.7.12

#Install Node.js
RUN sed -i '/jessie-updates/d' /etc/apt/sources.list
RUN apt-get update -qq && apt-get install -yqq curl && apt-get install -y sudo && apt-get install nano
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash
RUN apt-get install --yes nodejs

WORKDIR webrtcproj

#Install app dependencies
RUN npm install

EXPOSE 3000

