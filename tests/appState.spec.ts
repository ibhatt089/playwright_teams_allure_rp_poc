import { test } from '../pages/fixtures/applicationStateFixture';
import { Logger } from '../utils/Logger';

test.describe('Challenge 4 - Application State', () => {
  // eslint-disable-next-line playwright/no-focused-test
  test('Validate login, profile interactions, and logout', async ({ applicationStatePage }) => {
    Logger.info('Starting Application State test');

    // Step 1: Navigate to the Dashboard page
    await applicationStatePage.navigateToDashboard();

    // Wait for the application to be ready
    await applicationStatePage.waitForAppReady();

    // Step 2: Perform login
    const testEmail = 'a@a.com';
    const testPassword = 'Pass';
    await applicationStatePage.login(testEmail, testPassword);

    // Step 3: Validate dashboard and email display
    await applicationStatePage.validateUserEmail(testEmail);

    // Step 4: Logout
    await applicationStatePage.logout();

    Logger.info('Application State test completed successfully');
  });
});
