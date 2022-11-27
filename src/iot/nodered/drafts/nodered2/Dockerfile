FROM nodered/node-red:2.2.3

USER root
RUN mkdir -p /config \
    && mkdir -p /db \
    && mkdir -p /photos \
    && mkdir -p /static \
    && mkdir -p /tests
USER node-red
# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY ./data/package.json .
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production
