# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0
ARG PNPM_VERSION=8.10.5

FROM node:${NODE_VERSION}-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable

WORKDIR /usr/src/app

RUN mkdir -p $PNPM_HOME && addgroup node root && chmod -R 777 $PNPM_HOME && chown -R node:root $PNPM_HOME
RUN chmod -R 777 /usr/src/app && chown -R node:root /usr/src/app

FROM base as deps

USER node

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

FROM deps as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM base as final

ENV NODE_ENV production

USER node

RUN pnpm add -g prisma tsx

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.npmrc ./.npmrc
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3333

CMD pnpm run start
