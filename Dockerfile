# Latest Debian-based Node LTS
ARG NODE_VERSON=20.15-bookworm-slim

FROM node:${NODE_VERSON}

# Install git (used by yarn install)
RUN apt-get update -y
RUN apt-get install -y git

WORKDIR /usr/app

# Install packages first
# Provided that package.json does not change,
#  this will cache and have zero cost
COPY ./package.json ./
RUN yarn install --frozen-lockfile

# Add non-root user to system
RUN useradd -ms /bin/bash scl-user

COPY ./tsconfig.json ./
# TODO:  Do not embed environment files directly
#COPY ./environment.d.ts ./
COPY ./src ./

RUN yarn tsc

# Switch to non-privileged user
USER scl-user

CMD [ "yarn", "prod:serve" ]
