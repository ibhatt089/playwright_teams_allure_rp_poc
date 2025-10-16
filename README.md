# Playwright Testing Framework with CI/CD Integration

> A comprehensive Playwright testing framework integrated with Report Portal, Microsoft Teams notifications, Allure reports, and GitHub Pages deployment.

[TOC]

## Overview

This repository demonstrates best practices for end-to-end testing with Playwright, featuring:

- Automated test execution in CI/CD
- Dual report generation (Playwright HTML + Allure)
- Real-time notifications via Microsoft Teams
- Integration with Report Portal for test history
- Automated deployment to GitHub Pages
- Secure credential management via GitHub Secrets

## Features

- **Multiple Test Challenges** - Complex UI testing scenarios
- **Dual Reporting** - Playwright HTML & Allure reports
- **Teams Integration** - Instant test notifications
- **Report Portal** - Historical test data and trends
- **GitHub Pages** - Automated report hosting
- **Security First** - All credentials via GitHub Secrets
- **Type-Safe Config** - TypeScript-based configuration
- **Page Object Model** - Maintainable test structure

## Architecture

```md
┌─────────────────┐
│ GitHub Secrets  │
└────────┬────────┘
         ↓
┌─────────────────┐
│  .env file      │ (Generated in CI/CD)
└────────┬────────┘
         ↓
┌─────────────────┐
│ env.config.ts   │ (Central Configuration Hub)
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
┌─────────┐ ┌──────────────┐
│rpConfig │ │testbeats.json│
│  .ts    │ │              │
└────┬────┘ └──────┬───────┘
     ↓             ↓
┌─────────────────────────┐
│  Test Execution         │
├─────────────────────────┤
│ • Playwright Tests      │
│ • Report Generation     │
│ • Teams Notifications   │
│ • Report Portal Upload  │
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│   GitHub Pages          │
│ • Allure Report         │
│ • Playwright Report     │
└─────────────────────────┘
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- **Git** for version control
- **GitHub Account** with Actions enabled
- **Report Portal** account (optional)
- **Microsoft Teams** webhook (optional)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ibhatt089/playwright_teams_allure_rp_poc.git
cd playwright_teams_allure_rp_poc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Local Environment

Create a `.env` file in the project root:

```bash
# Copy and customize these values
TEAMS_WEBHOOK_URL=your_teams_webhook_url
TEAMS_USER_NAME=Your Name
TEAMS_USER_EMAIL=your.email@company.com
REPORT_PORTAL_BASE_URL=https://reportportal.epam.com/api/v1
REPORT_PORTAL_API_KEY=your_api_key
REPORT_PORTAL_PROJECT=YOUR_PROJECT
REPORT_PORTAL_LAUNCH_NAME=Playwright_Test_Launch
REPORT_PORTAL_LAUNCH_ATTRIBUTES=Platform:Playwright;POC;Browser:Chrome
PW_PROJECT=chromium
```

### 4. Run Tests Locally

```bash
# Run all tests
npm test

# Run headless
npm run test:chromium-headless

# Run with UI
npm test -- --headed
```

## Configuration

### GitHub Secrets Setup

Configure the following secrets in your GitHub repository for CI/CD:

1. Navigate to: **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each of the following:

| Secret Name              | Description                          | Required |
| ------------------------ | ------------------------------------ | -------- |
| `TEAMS_WEBHOOK_URL`      | Microsoft Teams incoming webhook URL | Optional |
| `TEAMS_USER_NAME`        | Your name for Teams mentions         | Optional |
| `TEAMS_USER_EMAIL`       | Your Teams UPN (`user@company.com`)  | Optional |
| `REPORT_PORTAL_BASE_URL` | Report Portal API endpoint           | Optional |
| `REPORT_PORTAL_API_KEY`  | Report Portal API authentication key | Optional |
| `REPORT_PORTAL_PROJECT`  | Report Portal project name           | Optional |

**Note:** GitHub Actions requires the repository to be **public** for free GitHub Pages hosting, or you need GitHub Pro/Enterprise for private repositories.

#### How to Get These Values

**Microsoft Teams Webhook:**

1. Go to your Teams channel → **Connectors** → **Incoming Webhook**
2. Create a webhook and copy the URL

**Report Portal:**

1. Login to Report Portal → **User Profile** → **API Keys**
2. Copy your API key and project name

### Environment Variables

#### Complete List

| Variable                          | Purpose                         | Example                                  |
| --------------------------------- | ------------------------------- | ---------------------------------------- |
| `TEAMS_WEBHOOK_URL`               | Teams notification endpoint     | `https://outlook.office.com/webhook/...` |
| `TEAMS_USER_NAME`                 | Display name for Teams mentions | `John Doe`                               |
| `TEAMS_USER_EMAIL`                | Teams UPN for @ mentions        | `john.doe@company.com`                   |
| `REPORT_PORTAL_BASE_URL`          | Report Portal API URL           | `https://yourinstance.reportportal.com/api/v1`   |
| `REPORT_PORTAL_API_KEY`           | Authentication token            | `project_xxx...`                         |
| `REPORT_PORTAL_PROJECT`           | Project identifier              | `MY_PROJECT`                             |
| `REPORT_PORTAL_LAUNCH_NAME`       | Test launch name                | `Playwright_Test_Launch_42`              |
| `REPORT_PORTAL_LAUNCH_ATTRIBUTES` | Test attributes                 | `Platform:Playwright;POC;Browser:Chrome` |
| `PW_PROJECT`                      | Playwright project to run       | `chromium` or `chromiumheadless`         |

#### Attribute Format

Use semicolon-separated key-value pairs:

```md
Platform:Playwright;POC;Browser:Chrome
```

This creates:

- `{key: 'Platform', value: 'Playwright'}`
- `{value: 'POC'}` (tag without key)
- `{key: 'Browser', value: 'Chrome'}`

### Local Development Setup

1. **Create `.env` file** (never commit this):

   ```bash
   cp .gitignore .env  # .env is already in .gitignore
   ```

2. **Add your local values:**

   ```env
   TEAMS_WEBHOOK_URL=https://your-webhook-url
   TEAMS_USER_NAME=Your Name
   TEAMS_USER_EMAIL=your.email@company.com
   REPORT_PORTAL_BASE_URL=https://yourinstance.reportportal.com/api/v1
   REPORT_PORTAL_API_KEY=your_local_api_key
   REPORT_PORTAL_PROJECT=YOUR_PROJECT
   REPORT_PORTAL_LAUNCH_NAME=Playwright_Local_Test
   REPORT_PORTAL_LAUNCH_ATTRIBUTES=Platform:Playwright;Environment:Local;Browser:Chrome
   PW_PROJECT=chromium
   ```

3. **Verify configuration:**

   ```bash
   npm test -- --grep "@c1"  # Run Challenge 1 tests only
   ```

## Running Tests

### Local Execution

```bash
# Run all tests
npm test

# Run in headless mode
npm run test:chromium-headless

# Run with specific project
npm test -- --project=chromium
```

### Available Scripts

```bash
# Start the test server
npm start

# Run tests (headed mode)
npm test

# Run headless tests
npm run test:chromium-headless

# Generate Allure report
npm run allure-generate

# Open Allure report
npm run allure-open

# Send test results to Teams
npm run notify-teams-channel

# Lint tests
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format
```

## Test Reports

### Automated Report Generation

After each CI/CD run, two types of reports are automatically generated and published:

#### 1. Allure Report

**URL:** `https://<username>.github.io/<repo>/allure-report/`

**Features:**

- Historical trend graphs
- Test execution timeline
- Failure categorization
- Screenshots and videos
- Detailed step-by-step logs

#### 2. Playwright HTML Report

**URL:** `https://<username>.github.io/<repo>/playwright-report/`

**Features:**

- Interactive test results
- Trace viewer integration
- Network activity logs
- Console output
- Filterable results

### Report Access

🔗 **Live Reports:** [View Test Results on GitHub Pages](https://ibhatt089.github.io/playwright_teams_allure_rp_poc)

**Report Contents:**

- ✅ Test execution results (passed/failed/skipped)
- 📋 Detailed step-by-step logs
- 📸 Screenshots (on failure)
- 🎥 Video recordings (configurable)
- ⏱️ Execution time and statistics
- 📈 Historical trends (Allure)

### Local Report Viewing

```bash
# Generate and open Allure report
npm run allure-generate
npm run allure-open

# Open Playwright HTML report (after test run)
npx playwright show-report
```

## CI/CD Pipeline

### Workflow Triggers

The pipeline runs on:

- **Push** to `main` branch
- **Pull Requests** to `main` branch

### Pipeline Steps

```yaml
1. Checkout Repository
2. Setup Node.js (v20) & JDK (v17)
3. Install Dependencies (npm ci)
4. Install Playwright Browsers
5. Create .env file from GitHub Secrets
6. Run Playwright Tests
7. Upload Test Artifacts
8. Publish to TestBeats (Teams + Report Portal)
9. Load Allure Report History
10. Build Allure Report
11. Publish Allure Report to GitHub Pages
12. Publish Playwright Report to GitHub Pages
```

### Pipeline Features

- ✅ Automatic secret injection
- ✅ Parallel test execution
- ✅ Artifact retention (30 days)
- ✅ Dual report publishing
- ✅ Teams notifications
- ✅ Report Portal integration
- ✅ GitHub Pages deployment

### Workflow File

Located at: `.github/workflows/playwright.yml`

## Project Structure

```md
playwright_teams_allure_rp_poc/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
├── global/
│   ├── global-setup.ts             # Global test setup
│   └── global-teardown.ts          # Global test teardown
├── pages/
│   ├── fixtures/                   # Playwright fixtures
│   │   ├── animatedLoginFixture.ts
│   │   ├── applicationStateFixture.ts
│   │   ├── forgotPasswordFixture.ts
│   │   └── multiLoginFixture.ts
│   └── locators/                   # Page object locators
│       ├── AnimatedLoginPage.locators.ts
│       ├── LoginAppStatePage.locators.ts
│       ├── MultiLoginPage.locators.ts
│       └── ResetPasswordPage.locators.ts
├── public/                         # Test application HTML files
│   ├── challenge1.html
│   ├── challenge2.html
│   ├── challenge3.html
│   ├── challenge4.html
│   └── index.html
├── tests/                          # Tests Dir 
│   ├── appState.spec.ts            
│   ├── forgotPassword.spec.ts      
│   ├── interactiveLogin.spec.ts    
│   └── login.spec.ts               
├── utils/                          # Helper/Utility functions
│   ├── animationHelper.ts
│   ├── formHelper.ts
│   ├── Logger.ts
│   └── testDataGenerator.ts
├── env.config.ts                   # Central configuration hub
├── rpConfig.ts                     # Report Portal configuration
├── testbeats.config.json           # TestBeats reporter config
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── server.js                       # Local test server
```

## Troubleshooting

### Common Issues

#### 1. Tests Fail with "Configuration Undefined"

**Cause:** Missing or incorrect environment variables

**Solution:**

```bash
# Verify .env file exists
ls -la .env

# Check .env contents (without revealing secrets)
cat .env | grep "REPORT_PORTAL"

# Ensure all required variables are set
grep -E "^[A-Z_]+=" .env
```

#### 2. GitHub Actions Pipeline Fails

**Cause:** Missing GitHub Secrets

**Solution:**

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Verify all 6 secrets are configured:
   - `TEAMS_WEBHOOK_URL`
   - `TEAMS_USER_NAME`
   - `TEAMS_USER_EMAIL`
   - `REPORT_PORTAL_BASE_URL`
   - `REPORT_PORTAL_API_KEY`
   - `REPORT_PORTAL_PROJECT`

#### 3. Tests Pass Locally but Fail in CI

**Cause:** Different environment or timing issues

**Solution:**

```typescript
// Increase timeouts in playwright.config.ts for CI
export default defineConfig({
  timeout: 2 * 60 * 1000, // 2 minutes
  expect: {
    timeout: 10 * 1000, // 10 seconds
  },
  workers: process.env.CI ? 4 : 6, // Fewer workers in CI
});
```

### Getting Help

- **Issues:** [GitHub Issues](https://github.com/ibhatt089/playwright_teams_allure_rp_poc/issues)
- **Playwright Docs:** [https://playwright.dev](https://playwright.dev)
- **Report Portal Docs:** [https://reportportal.io](https://reportportal.io)

## 👤 Author: **Ishan**

- GitHub: [@ibhatt089](https://github.com/ibhatt089)

## Acknowledgments

- Playwright Team for the excellent testing framework
- Report Portal for test management platform
- TestBeats for the reporting integration
- Allure Framework for beautiful reports

---

**⭐ Star this repository if you find it helpful!**
