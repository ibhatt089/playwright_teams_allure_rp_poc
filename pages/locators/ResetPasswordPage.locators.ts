import { Locator, Page } from '@playwright/test';

export class ResetPasswordPage {
  emailField: Locator;
  resetPasswordButton: Locator;
  successMessage: Locator;
  forgotPasswordLink: Locator;
  backToLoginLink: Locator;
  closeButton: Locator;

  constructor(public page: Page) {
    this.emailField = this.page.getByLabel('Email');
    this.resetPasswordButton = this.page.getByRole('button', { name: 'Reset Password' });
    this.successMessage = this.page.locator('.success-message');
    this.forgotPasswordLink = this.page.getByRole('button', { name: 'Forgot Password?' });
    this.backToLoginLink = this.page.locator('a.back-to-login');
    this.closeButton = this.page.getByRole('button', { name: 'Close' });
  }
}
