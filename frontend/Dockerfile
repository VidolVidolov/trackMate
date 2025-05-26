FROM ubuntu:latest

# Install dependencies
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs nginx && \
    npm config set registry https://registry.npmjs.org && \
    rm -rf /var/lib/apt/lists/*

RUN node -v && npm -v && nginx -v && npm config get registry

RUN addgroup --system nginx && adduser --system --no-create-home --ingroup nginx nginx

RUN mkdir -p /var/lib/nginx /var/lib/nginx/body \
    /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html \
    /var/log/nginx /run && \
    chown -R nginx:nginx /var/lib/nginx /var/cache/nginx /var/run \
    /etc/nginx /usr/share/nginx/html /var/log/nginx /run

RUN sed -i '/^user/d' /etc/nginx/nginx.conf

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R nginx:nginx /client

USER nginx

EXPOSE 5173

CMD [ "npm", "run", "dev:container" ]
