# slackblock example app

A practical Slack app built with [Bolt for JavaScript](https://github.com/slackapi/bolt-js) that consumes the **built** `slackblock` package to verify real-world usage.

## What it demonstrates

| Handler | Surface | API call |
|---------|---------|----------|
| `/deploy-status` slash command | Channel message | `chat.postMessage` |
| `/help` slash command | Ephemeral message | `chat.postEphemeral` |
| `/dm-me` slash command | Direct message | `conversations.open` + `chat.postMessage` |
| `app_home_opened` event | App Home tab | `views.publish` |

## Setup

### 1. Build slackblock

```bash
# from the repo root
pnpm build
```

### 2. Install example dependencies

```bash
cd example
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
# fill in SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN
```

### 4. Create a Slack app

Go to https://api.slack.com/apps and create a new app. Enable **Socket Mode** (generates the `SLACK_APP_TOKEN`). Add the following slash commands:

- `/deploy-status`
- `/help`
- `/dm-me`

Required OAuth scopes:
- `chat:write`
- `im:write`
- `commands`

Enable the `app_home_opened` event under **Event Subscriptions → Subscribe to bot events**.

### 5. Run

```bash
pnpm start
```

## Type-checking

```bash
pnpm build   # runs tsc --noEmit
```

This project is intentionally **not** included in the root `tsconfig.json` — it is a standalone consumer of the built package.
