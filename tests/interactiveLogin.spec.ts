import { test } from '../pages/fixtures/animatedLoginFixture';
import { Logger } from '../utils/Logger';

test.describe('Challenge 2 - Animated Form, Menu Interactions, and Logout', () => {
  test('should handle login, menu interactions, and logout', async ({ animatedLoginFixture }) => {
    Logger.info('Starting test for animated login and interactions');
    await animatedLoginFixture.navigateToChallenge(2);
    // Step 1: Perform login with animated form, with handling of the animation stability for the Sign In Button
    await animatedLoginFixture.login('a@a.com', 'PAss');

    // Step 2: Validate the dashboard and email display
    await animatedLoginFixture.validateDashboard();

    // Step 3: Wait for the MyAccount Menu to load
    await animatedLoginFixture.openMyAccountMenu();

    // Step 4: Interact with menu options
    await animatedLoginFixture.interactWithMenuOptions();

    // Step 5: Logout
    await animatedLoginFixture.logout();

    Logger.info('Test for animated login and interactions completed successfully');
  });
});
