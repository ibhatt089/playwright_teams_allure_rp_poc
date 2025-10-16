import { FullConfig, chromium, firefox, webkit } from '@playwright/test';

async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('Global teardown: cleaning up browser instances...');

  // Iterate through all projects in the configuration
  for (const project of config.projects) {
    const browserName = project.use?.browserName;

    // Handle different browser types
    let browser;
    switch (browserName) {
      case 'chromium':
        browser = await chromium.launch();
        break;
      case 'firefox':
        browser = await firefox.launch();
        break;
      case 'webkit':
        browser = await webkit.launch();
        break;
      default:
        console.warn(`Unknown browser: ${browserName}`);
        continue; // Skip unknown browsers
    }

    // Close the browser if it was successfully launched
    if (browser) {
      await browser.close();
      console.log(`Closed ${browserName} browser`);
    }
  }

  console.log('Global teardown completed.');
}

export default globalTeardown;
