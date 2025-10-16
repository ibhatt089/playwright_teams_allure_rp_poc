import { test as base, expect } from '@playwright/test';
import { Locators } from '../locators/Locators';
import { Logger } from '../../utils/Logger';

export const test = base.extend<{
  multiLoginPage: {
    navigateToChallenge: (challengeNumber: number) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    waitForSuccessMessage: () => Promise<string>;
    getEmailDisplay: () => Promise<string>;
    getPasswordDisplay: () => Promise<string>;
    validateLoginFormHeading: (headerText: string) => Promise<void>;
  };
}>({
  multiLoginPage: async ({ page }, use) => {
    const locators = new Locators(page);

    const multiLoginPage = {
      async navigateToChallenge(challengeNumber: number) {
        Logger.info(`Navigating to Challenge ${challengeNumber}`);
        try {
          await page.goto('http://localhost:3000/');
          await page.getByRole('link', { name: `Try Challenge ${challengeNumber}` }).click();
          Logger.info(`Successfully navigated to Challenge ${challengeNumber}`);
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to navigate to Challenge ${challengeNumber}: ${error.message}`);
          } else {
            Logger.error(`Failed to navigate to Challenge ${challengeNumber}: Unknown error`);
          }
          throw error;
        }
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

      async waitForSuccessMessage(): Promise<string> {
        Logger.info('Waiting for success message');
        try {
          const successMessage = locators.loginPage.successMessage;
          await successMessage.waitFor({ state: 'visible', timeout: 5000 });
          return (await successMessage.textContent()) || '';
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to retrieve success message: ${error.message}`);
          } else {
            Logger.error(`Failed to retrieve success message: Unknown error`);
          }
          throw error;
        }
      },

      async getEmailDisplay(): Promise<string> {
        Logger.info('Retrieving displayed email');
        try {
          return (await locators.loginPage.emailDisplay.textContent()) || '';
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to retrieve displayed email: ${error.message}`);
          } else {
            Logger.error(`Failed to retrieve displayed email: Unknown error`);
          }
          throw error;
        }
      },

      async getPasswordDisplay(): Promise<string> {
        Logger.info('Retrieving displayed password');
        try {
          return (await locators.loginPage.passwordDisplay.textContent()) || '';
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`FFailed to retrieve displayed password: ${error.message}`);
          } else {
            Logger.error(`Failed to retrieve displayed password: Unknown error`);
          }
          throw error;
        }
      },

      async validateLoginFormHeading(headerText: string): Promise<void> {
        Logger.info(`Validating login form heading with text: ${headerText}`);
        try {
          await expect(locators.loginPage.formHeading).toHaveText(headerText);
          Logger.info('Login form heading validated');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to validate login form heading: ${error.message}`);
          } else {
            Logger.error(`Failed to validate login form heading: Unknown error`);
          }
          throw error;
        }
      },
    };

    await use(multiLoginPage);
  },
});
