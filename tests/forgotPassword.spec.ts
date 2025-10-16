import { expect } from '@playwright/test';
import { test } from '../pages/fixtures/forgotPasswordFixture';
import { Logger } from '../utils/Logger';

test.describe('Forgot Password Flow', () => {
  test.beforeEach(async ({ forgotPasswordPage }) => {
    // Step 1: Navigate to Challenge 3 Page
    await forgotPasswordPage.navigateToChallenge(3);
  });

  test('Forgot Password - Valid Email', async ({ forgotPasswordPage }) => {
    Logger.info('Starting Forgot Password - Valid Email test');

    // Step 1: Click Forgot Password
    await forgotPasswordPage.clickForgotPassword();

    // Step 2: Enter a valid email and submit the form
    const email = 'user@example.com';
    await forgotPasswordPage.enterEmail(email);
    await forgotPasswordPage.submitForgotPasswordForm();

    // Step 3: Verify the success message
    const successMessage = await forgotPasswordPage.getSuccessMessage();
    expect(successMessage).toContain('Password reset link sent!');
    expect(successMessage).toContain(email);

    Logger.info('Forgot Password - Valid Email test completed successfully');
  });

  test('Forgot Password - Back to Login', async ({ forgotPasswordPage }) => {
    Logger.info('Starting Forgot Password - Back to Login test');

    // Step 1: Click Forgot Password
    await forgotPasswordPage.clickForgotPassword();

    // Step 2: Click Back to Login
    await forgotPasswordPage.clickBackToLogin();

    // Step 3: Verify navigation back to Login page
    await forgotPasswordPage.validateLoginFormHeading('Login');

    Logger.info('Forgot Password - Back to Login test completed successfully');
  });
});
