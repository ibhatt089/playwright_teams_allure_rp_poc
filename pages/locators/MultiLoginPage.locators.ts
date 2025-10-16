import { Locator, Page } from '@playwright/test';

export class MultiLoginPage {
  emailField: Locator;
  passwordField: Locator;
  signInButton: Locator;
  successMessage: Locator;
  emailDisplay: Locator;
  passwordDisplay: Locator;
  formHeading: Locator;

  constructor(public page: Page) {
    this.emailField = page.getByLabel('Email');
    this.passwordField = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.successMessage = page.locator('#successMessage.success-message.show');
    this.emailDisplay = this.page.locator('#emailDisplay');
    this.passwordDisplay = this.page.locator('#passwordDisplay');
    this.formHeading = this.page.locator('h2.form-title');
  }
}
