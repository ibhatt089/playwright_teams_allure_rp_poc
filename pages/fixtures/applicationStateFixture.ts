import { test as base, expect } from '@playwright/test';
import { Locators } from '../locators/Locators';
import { Logger } from '../../utils/Logger';

export const test = base.extend<{
  applicationStatePage: {
    navigateToDashboard: () => Promise<void>;
    waitForAppReady: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    validateUserEmail: (expectedEmail: string) => Promise<void>;
    logout: () => Promise<void>;
  };
}>({
  applicationStatePage: async ({ page }, use) => {
    const locators = new Locators(page);

    const applicationStatePage = {
      async navigateToDashboard() {
        Logger.info('Navigating to the App Login page');
        try {
          await page.goto('http://localhost:3000/challenge4.html');
          Logger.info('Successfully navigated to the Login page');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to navigate to Login: ${error.message}`);
          } else {
            Logger.error('Failed to navigate to Login: Unknown error');
          }
          throw error;
        }
      },
      /**
       * Wait for the application to be ready by checking a global variable
       */
      async waitForAppReady() {
        await page.waitForFunction('window.isAppReady === true', {
          timeout: 5000,
        });
      },
      async login(email: string, password: string): Promise<void> {
        Logger.info('Starting login process');
        try {
          await locators.loginPage.emailField.fill(email);
          await locators.loginPage.passwordField.fill(password);
          await locators.loginPage.signInButton.click();
          Logger.info('Login process completed');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Login failed: ${error.message}`);
          } else {
            Logger.error(`Login failed: Unknown error`);
          }
          throw error;
        }
      },

      async validateUserEmail(expectedEmail: string) {
        Logger.info(`Validating displayed user email: ${expectedEmail}`);
        try {
          await expect(locators.appStatePage.userEmailDisplay).toHaveText(expectedEmail);
          Logger.info('User email validated successfully');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to validate user email: ${error.message}`);
          } else {
            Logger.error('Failed to validate user email: Unknown error');
          }
          throw error;
        }
      },

      async logout() {
        Logger.info('Attempting to log out');
        try {
          await locators.appStatePage.profileButton.click();
          await locators.appStatePage.logoutOption.click();
          Logger.info('Successfully logged out');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to log out: ${error.message}`);
          } else {
            Logger.error('Failed to log out: Unknown error');
          }
          throw error;
        }
      },
    };

    await use(applicationStatePage);
  },
});
