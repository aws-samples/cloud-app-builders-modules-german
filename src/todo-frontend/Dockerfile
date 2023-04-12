FROM node:alpine AS builder
WORKDIR /app
COPY ./ /app
RUN npm install
RUN npm run build

FROM public.ecr.aws/bitnami/nginx:1.19
USER 1001
COPY --from=builder ./app/build /app
COPY --from=builder ./app/frontend.conf /opt/bitnami/nginx/conf/server_blocks/frontend.conf
EXPOSE 8080