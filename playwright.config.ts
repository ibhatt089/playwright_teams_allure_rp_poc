import { defineConfig, devices, ReporterDescription } from "@playwright/test";
import RP_Agent_Config from './rpConfig';

const BASE_URL = 'http://localhost:3000';

const reporters: ReporterDescription[] = [];

reporters.push(["allure-playwright"]);
reporters.push(["html", { open: process.env.CI ? "never" : "always" }]);
reporters.push(["junit", { outputFile: "test-results/playwright-report.xml" }]);

if (process.env.CI) {
  reporters.unshift(["@reportportal/agent-js-playwright", RP_Agent_Config]);
}

export default defineConfig({
  globalSetup: './global/global-setup',
  globalTeardown: './global/global-teardown',
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : 6,
  reporter: reporters,
  timeout: 2 * 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    testIdAttribute: 'data-testid',
    baseURL: BASE_URL,
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        launchOptions: {
          args: ['--disable-web-security', '--start-maximized'],
          slowMo: 0,
          headless: false,
        },
      },
    },

    {
      name: 'chromiumheadless',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          args: ['--disable-web-security'],
          slowMo: 0,
          headless: true,
        },
      },
    },
  ],

  /**
   * If the tests are being run on localhost, this configuration starts a web server.
   * See https://playwright.dev/docs/test-webserver#configuring-a-web-server
   */
  webServer: {
    command: 'npm start', // Start the UI server
    url: BASE_URL,
    ignoreHTTPSErrors: true,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: true,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
