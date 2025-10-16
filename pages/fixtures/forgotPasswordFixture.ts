import { test as base, expect } from '@playwright/test';
import { Locators } from '../locators/Locators';
import { Logger } from '../../utils/Logger';

export const test = base.extend<{
  forgotPasswordPage: {
    navigateToChallenge: (challengeNumber: number) => Promise<void>;
    enterEmail: (email: string) => Promise<void>;
    submitForgotPasswordForm: () => Promise<void>;
    getSuccessMessage: () => Promise<string>;
    clickBackToLogin: () => Promise<void>;
    clickForgotPassword: () => Promise<void>;
    validateLoginFormHeading: (headerText: string) => Promise<void>;
  };
}>({
  forgotPasswordPage: async ({ page }, use) => {
    const locators = new Locators(page);

    const forgotPasswordPage = {
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

      async enterEmail(email: string) {
        Logger.info(`Entering email for password reset: ${email}`);
        try {
          await locators.forgotPasswordPage.emailField.waitFor({ state: 'visible' });
          await locators.forgotPasswordPage.emailField.fill(email);
          Logger.info('Email entered successfully');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to enter email: ${error.message}`);
          } else {
            Logger.error('Failed to enter email: Unknown error');
          }
          throw error;
        }
      },

      async submitForgotPasswordForm() {
        Logger.info('Submitting Forgot Password form');
        try {
          await locators.forgotPasswordPage.resetPasswordButton.click();
          Logger.info('Forgot Password form submitted successfully');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to submit Forgot Password form: ${error.message}`);
          } else {
            Logger.error('Failed to submit Forgot Password form: Unknown error');
          }
          throw error;
        }
      },

      async getSuccessMessage() {
        Logger.info('Retrieving success message');
        try {
          const successMessage = locators.forgotPasswordPage.successMessage;
          await successMessage.waitFor({ state: 'visible', timeout: 5000 });
          const message = (await successMessage.textContent()) || '';
          Logger.info(`Success message retrieved: ${message}`);
          return message;
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to retrieve success message: ${error.message}`);
          } else {
            Logger.error('Failed to retrieve success message: Unknown error');
          }
          throw error;
        }
      },

      async clickBackToLogin() {
        Logger.info('Clicking Back to Login');
        try {
          await locators.forgotPasswordPage.backToLoginLink.click();
          Logger.info('Navigated back to Login');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to navigate back to Login: ${error.message}`);
          } else {
            Logger.error('Failed to navigate back to Login: Unknown error');
          }
          throw error;
        }
      },

      async clickForgotPassword() {
        Logger.info('Clicking Forgot Password');
        try {
          await locators.forgotPasswordPage.forgotPasswordLink.click();
          await expect(locators.forgotPasswordPage.backToLoginLink).toBeAttached({ timeout: 5000 });
          await expect(locators.forgotPasswordPage.emailField).toBeAttached();
          await expect(locators.forgotPasswordPage.emailField).toBeVisible();
          await expect(locators.forgotPasswordPage.emailField).toBeEditable();
          Logger.info('Forgot Password link clicked successfully');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to click Forgot Password link: ${error.message}`);
          } else {
            Logger.error('Failed to click Forgot Password link: Unknown error');
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

    await use(forgotPasswordPage);
  },
});
