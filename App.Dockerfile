FROM node:lts-alpine3.20 AS prepare

WORKDIR /

RUN corepack prepare pnpm@latest --activate
RUN corepack enable pnpm

COPY . .


FROM prepare AS app-builder

WORKDIR /client

RUN pnpm install --frozen-lockfile
RUN pnpm build


FROM prepare AS server-builder

WORKDIR /server

RUN pnpm install --frozen-lockfile
RUN pnpm build


FROM node:lts-alpine3.20 AS run

WORKDIR /

ARG APP_DIRECTORY
ARG SERVER_PORT

COPY --from=server-builder /server/dist app
COPY --from=server-builder /server/node_modules app/node_modules

COPY --from=app-builder /client/dist/ app/$APP_DIRECTORY/

EXPOSE $SERVER_PORT

CMD ["node", "app/index.js"]