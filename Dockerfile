#FROM ubuntu:14.04.3
FROM centos:7.3.1611

ENV APP_USER deploy
ENV APP_DIR /home/deploy/frontend
ENV NVM_DIR $APP_DIR/nvm
ENV NODE_VERSION 9.2.0

# Replace shell with bash so we can source files
#RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN (yum check-update || true)
RUN yum -y update
RUN yum -y group install "Development Tools"
RUN yum -y install make curl build-essential; yum clean all
RUN rm -rf /var/cache/yum

RUN useradd -ms /bin/bash $APP_USER

USER $APP_USER 
RUN mkdir $APP_DIR

WORKDIR $APP_DIR

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

CMD ["echo 'PATH=$PATH:node_modules/.bin' >> ~/.bashrc"]

CMD ["npm", "install", "yarn"]

CMD ["source", "~/.bashrc"]

# Bundle app source
COPY . $APP_DIR

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
