<br/>
<p align="center">
  <h1 align="center">Discord Clone</h3>

  <p align="center">
    This project is Discord clone with main features of Discord.
    <br/>
    <br/>
    <a href="https://discord-clone-production-5538.up.railway.app/">View Demo</a>
    .
    <a href="https://github.com/Jeda777/Discord-Clone/issues">Report Bug</a>
    .
  </p>
</p>

## :notebook_with_decorative_cover: Table Of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Demo Accounts](#demo-accounts)
  - [Features](#features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone The Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Install NPM Packages](#install-npm-packages)
  - [Setup Prisma](#setup-prisma)
  - [Run The App](#run-the-app)
  - [Deployment](#deployment)

## About The Project

### :camera: Screenshots

![DiscordClone1](https://github.com/Jeda777/Discord-Clone/assets/66244271/c38c668b-53f2-4872-91aa-fa4b12bf13a9)
![DiscordClone2](https://github.com/Jeda777/Discord-Clone/assets/66244271/f2ae57e1-97b0-42f1-a507-a8abc2ffaf3e)
![DiscordClone3](https://github.com/Jeda777/Discord-Clone/assets/66244271/8314e0b7-a3b2-4706-84c0-e538881b3609)

### Demo Accounts

| Username | E-mail             | Password |
| -------- | ------------------ | -------- |
| Demo 1   | egm13063@omeie.com | 123      |
| Demo 2   | naf50208@zbock.com | 123      |

### Features

- Authentication
- Light / Dark mode
- UI for PC (mobile UI in progress)
- Real-time messaging with deleting and editing
- Sending attachments
- Private conversations
- Servers
  - Member management (invite, kick, change role, leave)
  - Creating, editing and deleting servers
  - Creating, editing and deleting channels
  - Text, audio and video channel

### Built With

- Typescript
- Next.js
- Prisma
- Tailwind CSS
- Clerk
- LiveKit
- SocketIO
- UploadThing
- MySQL database\

## :toolbox: Getting Started

### Prerequisites

- Node

### Clone The Repository

```sh
git clone https://github.com/Jeda777/Discord-Clone.git
```

### Environment Variables

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
DATABASE_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Install NPM packages

```sh
npm i
```

### Setup Prisma

```sh
npm run prisma1
npm run prisma2
```

or

```sh
npx prisma generate
npx prisma db push
```

### Run The App

```sh
npm run dev
```

### Deployment

On builds you need to add one more environment variable. In 'YOUR_SITE_URL' place url of your deployed site.

```
NEXT_PUBLIC_SITE_URL=YOUR_SITE_URL
```
