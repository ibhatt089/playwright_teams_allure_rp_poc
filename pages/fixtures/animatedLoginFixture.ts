import { test as base, expect } from '@playwright/test';
import { Locators } from '../locators/Locators';
import { Logger } from '../../utils/Logger';
import { AnimationHelper } from 'utils/animationHelper';

export const test = base.extend<{
  animatedLoginFixture: {
    login: (email: string, password: string) => Promise<void>;
    navigateToChallenge: (challengeNumber: number) => Promise<void>;
    validateDashboard: () => Promise<void>;
    verifyButtonAnimation: () => Promise<void>;
    openMyAccountMenu: () => Promise<void>;
    interactWithMenuOptions: () => Promise<void>;
    logout: () => Promise<void>;
  };
}>({
  animatedLoginFixture: async ({ page }, use) => {
    const locators = new Locators(page);

    const animatedLoginFixture = {
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

      async login(email: string, password: string) {
        Logger.info(`Logging in with email: ${email}`);
        try {
          await locators.animatedLoginPage.userEmailAddressInputText.fill(email);
          await locators.animatedLoginPage.passwordInputText.fill(password);
          await AnimationHelper.waitForAnimationToStabilize(page, locators.animatedLoginPage.submitButton);
          await locators.animatedLoginPage.signInButton.click();
          Logger.info('Login successful');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to login: ${error.message}`);
          } else {
            Logger.error('Failed to login: Unknown error');
          }
          throw error;
        }
      },

      async validateDashboard() {
        Logger.info('Validating dashboard');
        try {
          await expect(locators.animatedLoginPage.dashboardDisplay).toContainText('Welcome!');
          Logger.info('Dashboard validation successful');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to validate dashboard: ${error.message}`);
          } else {
            Logger.error('Failed to validate dashboard: Unknown error');
          }
          throw error;
        }
      },

      async verifyButtonAnimation() {
        Logger.info('Verifying button animation');
        try {
          const initialTransform = await locators.animatedLoginPage.signInButton.evaluate(
            el => window.getComputedStyle(el).transform,
          );

          await AnimationHelper.waitForAnimationToStabilize(page, locators.animatedLoginPage.submitButton);

          const finalTransform = await locators.animatedLoginPage.signInButton.evaluate(
            el => window.getComputedStyle(el).transform,
          );

          // Ensure the button moved (transform changed)
          // eslint-disable-next-line playwright/no-standalone-expect
          expect(initialTransform).not.toBe(finalTransform);
          Logger.info('Button animation verified successfully');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to verify button animation: ${error.message}`);
          } else {
            Logger.error('Failed to verify button animation: Unknown error');
          }
          throw error;
        }
      },

      async openMyAccountMenu() {
        await locators.animatedLoginPage.myAccountButton.waitFor({ state: 'visible' });
        // eslint-disable-next-line playwright/no-standalone-expect
        await expect(locators.animatedLoginPage.myAccountButton).toHaveAttribute('data-initialized', 'true');
        await locators.animatedLoginPage.myAccountButton.click();
      },

      async interactWithMenuOptions() {
        Logger.info('Interacting with menu options');
        try {
          await locators.animatedLoginPage.profileOption.click();
          Logger.info('Menu interactions successful');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to interact with menu options: ${error.message}`);
          } else {
            Logger.error('Failed to interact with menu options: Unknown error');
          }
          throw error;
        }
      },

      async logout() {
        Logger.info('Logging out');
        try {
          await locators.animatedLoginPage.logoutOption.click();
          Logger.info('Logout successful');
        } catch (error) {
          if (error instanceof Error) {
            Logger.error(`Failed to logout: ${error.message}`);
          } else {
            Logger.error('Failed to logout: Unknown error');
          }
          throw error;
        }
      },
    };

    await use(animatedLoginFixture);
  },
});
