FROM python:2.7.12
RUN sed -i '/jessie-updates/d' /etc/apt/sources.list
RUN apt-get update -qq && apt-get install -yqq curl && apt-get install -y sudo && apt-get install nano
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash
RUN apt-get install --yes nodejs
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 2000
ENTRYPOINT ["node"]
CMD ["server_basic.js"]

