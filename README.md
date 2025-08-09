# user-api
Node JS/ Typescript application Training

# Description
API for manage users and roles to serce data to a web application.

# Requirements
- Node 20 or latest
- Postgres

# Installation
Run these commands to prepare your environment:
```bash
    npm init -y
    npm install typescript --save-dev
    npx tsc --init
```

Run these command to init the prisma ORM:
```bash
    npx prisma init
```

# Migrations
For create a new migration you type:
```bash
    npx prisma migrate dev --name descriptive_name_for_migration
```
Then you geneate or update your prisma client:
```bash
    npx prisma generate
```

For pushing all changes to your db use:
```bash
    npx prisma db push 
```
