# Animego Test Task

## pnpm , npm

#### Installation

```bash
$ pnpm install
```

#### Running the app

```bash
$ npm run dev
```

## Docker

#### Run container - PostgreSQL and NestJS locally via docker-compose

```bash
docker-compose up
```

#### Stop container - PostgreSQL and NestJS via docker-compose

```bash
docker-compose down
```

#### Stop & Remove container - PostgreSQL and NestJS via docker-compose

```bash
docker-compose down --rmi all -v
```

#### Build via docker

```bash
docker build -t nest-pnpm-docker .
docker run -dp 3000:3000 nest-pnpm-docker

```

<!-- docker build -t animego-test-task . -->
