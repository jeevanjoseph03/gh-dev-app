# gh-dev-app

A simple GitHub App built with [Probot](https://probot.github.io/) that automatically comments on newly opened issues with "Thanks for the report!".

## Features

- Listens for `issues.opened` webhook events
- Automatically posts a comment saying "Thanks for the report!" on new issues

## Prerequisites

- Node.js >= 18.0.0
- npm
- A GitHub account

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/jeevanjoseph03/gh-dev-app.git
   cd gh-dev-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Setting Up Local Webhook Proxying with smee-client

To test your GitHub App locally, you need to use [smee.io](https://smee.io/) to proxy webhooks from GitHub to your local machine.

### Step 1: Create a Smee Channel

1. Go to [https://smee.io/](https://smee.io/)
2. Click **"Start a new channel"**
3. Copy the unique Smee URL (e.g., `https://smee.io/abc123xyz`)

### Step 2: Run the Smee Client

You can run the smee-client in a separate terminal window:

```bash
npx smee-client --url https://smee.io/YOUR_CHANNEL_ID --target http://localhost:3000/api/github/webhooks
```

Or install it globally:

```bash
npm install -g smee-client
smee --url https://smee.io/YOUR_CHANNEL_ID --target http://localhost:3000/api/github/webhooks
```

Keep this running while developing locally.

## Registering Your GitHub App in Developer Settings

Follow these steps to register your GitHub App:

### Step 1: Navigate to Developer Settings

1. Sign in to your GitHub account
2. Click your **profile photo** in the top-right corner
3. Click **Settings**
4. In the left sidebar, scroll down and click **Developer settings**

### Step 2: Create a New GitHub App

1. Click **GitHub Apps** in the left sidebar
2. Click **New GitHub App**

### Step 3: Fill in the App Details

Fill in the required fields:

| Field | Value |
|-------|-------|
| **GitHub App name** | `gh-dev-app` (or any unique name) |
| **Homepage URL** | `https://github.com/jeevanjoseph03/gh-dev-app` |
| **Webhook URL** | Your Smee URL (e.g., `https://smee.io/YOUR_CHANNEL_ID`) |
| **Webhook secret** | Create a secure secret (e.g., use `openssl rand -hex 20`) |

### Step 4: Set Permissions

Under **Permissions**, configure the following:

**Repository permissions:**
- **Issues**: Read & write (required to post comments)

### Step 5: Subscribe to Events

Under **Subscribe to events**, check:
- ✅ **Issues**

### Step 6: Installation Options

Under **Where can this GitHub App be installed?**, select:
- **Only on this account** (for testing)

### Step 7: Create the GitHub App

1. Click **Create GitHub App**
2. After creation, you'll see your App ID and be prompted to generate a private key

### Step 8: Generate a Private Key

1. Scroll down to **Private keys**
2. Click **Generate a private key**
3. Save the downloaded `.pem` file to your project directory

### Step 9: Create Environment Variables

Create a `.env` file in your project root:

```bash
APP_ID=your_app_id
PRIVATE_KEY_PATH=./your-app-name.private-key.pem
WEBHOOK_SECRET=your_webhook_secret
```

Or set `PRIVATE_KEY` directly with the contents of the `.pem` file.

### Step 10: Install the App

1. Go to your GitHub App's settings page
2. Click **Install App** in the left sidebar
3. Choose a repository to install it on
4. Click **Install**

## Running the App

Start the app:

```bash
npm start
```

For development with auto-reload (requires nodemon):

```bash
npm install -g nodemon
npm run dev
```

## Testing

1. Make sure smee-client is running and forwarding webhooks
2. Start your app with `npm start`
3. Open a new issue in a repository where your app is installed
4. The app will automatically comment "Thanks for the report!"

## GitHub Developer Program

By creating and registering a GitHub App, you demonstrate experience with the GitHub API and platform, which can help with GitHub Developer Program eligibility. Visit [GitHub Developer Program](https://developer.github.com/program/) for more information.

## Project Structure

```
gh-dev-app/
├── index.js          # Main app logic
├── package.json      # Dependencies and scripts
├── README.md         # This file
└── .env              # Environment variables (create this)
```

## License

ISC