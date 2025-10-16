import { expect } from '@playwright/test';
import { test } from '../pages/fixtures/multiLoginFixture';
import { Logger } from '../utils/Logger';

const loginData = [
  { username: 'test_user1@villageIT.com', password: 'PassWord@123' },
  { username: 'test_user2@villageIT.com', password: 'PassWord@456' },
  { username: 'test_user3@villageIT.com', password: 'PassWord@789' },
];

test.describe('Multiple Login Tests', () => {
  loginData.forEach(({ username, password }) => {
    test(`should log in and validate post-login details for user: ${username}`, async ({ multiLoginPage }) => {
      Logger.info(`Running test for user: ${username}`);

      // Step 1: Navigate to Challenge 1 Page
      await multiLoginPage.navigateToChallenge(1);

      // Step 2: Perform login
      await multiLoginPage.login(username, password);

      // Step 3: Wait for the success message and validate it
      const successMessage = await multiLoginPage.waitForSuccessMessage();
      expect(successMessage).toContain('Successfully submitted!');

      // Step 4: Validate the displayed email
      const emailDisplay = await multiLoginPage.getEmailDisplay();
      expect(emailDisplay).toContain(`Email: ${username}`);

      // Step 5: Validate the displayed password
      const passwordDisplay = await multiLoginPage.getPasswordDisplay();
      expect(passwordDisplay).toContain(`Password: ${password}`);

      Logger.info(`Test completed successfully for user: ${username}`);
    });
  });
});
