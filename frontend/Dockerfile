FROM ubuntu:latest

# Install dependencies
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs nginx && \
    npm config set registry https://registry.npmjs.org && \
    rm -rf /var/lib/apt/lists/*

RUN node -v && npm -v && nginx -v && npm config get registry

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN addgroup --system nginx && adduser --system --no-create-home --ingroup nginx nginx

RUN mkdir -p /var/lib/nginx /var/lib/nginx/body \
    /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html \
    /var/log/nginx /run && \
    chown -R nginx:nginx /var/lib/nginx /var/cache/nginx /var/run \
    /etc/nginx /usr/share/nginx/html /var/log/nginx /run

RUN sed -i '/^user/d' /etc/nginx/nginx.conf

USER nginx

EXPOSE 3333
EXPOSE 5173


CMD ["nginx", "-g", "daemon off;"]
# CMD ["nginx", "-g", "daemon off;", "npm", "run", "dev"] with forward porting 5173:5173

