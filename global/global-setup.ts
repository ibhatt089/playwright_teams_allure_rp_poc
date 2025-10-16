import { FullConfig, chromium, firefox, webkit } from '@playwright/test';
import { Logger } from '../utils/Logger';

async function globalSetup(config: FullConfig): Promise<void> {
  Logger.info('Global setup: initializing test environment...');

  for (const project of config.projects) {
    const browserName = project.use?.browserName;

    let browser;
    try {
      // Launch browser based on the project's configuration
      switch (browserName) {
        case 'chromium':
          browser = await chromium.launch({ headless: true });
          Logger.info('Chromium browser launched for global setup');
          break;
        case 'firefox':
          browser = await firefox.launch({ headless: true });
          Logger.info('Firefox browser launched for global setup');
          break;
        case 'webkit':
          browser = await webkit.launch({ headless: true });
          Logger.info('Webkit browser launched for global setup');
          break;
        default:
          Logger.warn(`Unknown browser: ${browserName}, skipping setup.`);
          continue;
      }

      // Perform any global setup actions with the browser instance
      const context = await browser.newContext();
      const page = await context.newPage();

      Logger.info(`Performing setup actions for browser: ${browserName}`);
      await page.goto('http://localhost:3000');

      // Close the context and browser
      await page.close();
      await context.close();
      await browser.close();

      Logger.info(`Global setup completed for browser: ${browserName}`);
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Error during global setup for browser ${browserName}: ${error.message}`);
      } else {
        Logger.error(`Error during global setup for browser ${browserName}: Unknown error`);
      }
      if (browser) {
        await browser.close();
      }
      throw error;
    }
  }

  Logger.info('Global setup: all browser-specific setup completed.');
}

export default globalSetup;
