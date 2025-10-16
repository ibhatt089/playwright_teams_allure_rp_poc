import { Locator, Page } from '@playwright/test';

const animatedLoginPageLocators = {
  emailField: "label:has-text('Email')",
  passwordField: "label:has-text('Password')",
  signInButton: 'button:has-text("Sign In")',
  submitButton: '#submitButton',
  dashboard: '#dashboard',
  userEmail: '#userEmail',
  loginHeading: 'h1:has-text("Login")',
  logOutOption: '#logoutOption',
  settingsOption: '#settingsOption',
  preferencesOption: '#preferencesOption',
  profileOption: '#profileOption',
};

export class AnimatedLoginPage {
  userEmailAddressInputText: Locator;
  passwordInputText: Locator;
  signInButton: Locator;
  submitButton: string;
  loginHeading: Locator;
  userEmailDisplay: Locator;
  dashboardDisplay: Locator;
  myAccountButton: Locator;
  profileOption: Locator;
  preferencesOption: Locator;
  settingsOption: Locator;
  logoutOption: Locator;

  constructor(public page: Page) {
    this.userEmailAddressInputText = page.locator(animatedLoginPageLocators.emailField);
    this.passwordInputText = page.locator(animatedLoginPageLocators.passwordField);
    this.signInButton = page.locator(animatedLoginPageLocators.signInButton);
    this.submitButton = animatedLoginPageLocators.submitButton;
    this.loginHeading = page.locator(animatedLoginPageLocators.loginHeading);
    this.userEmailDisplay = page.locator(animatedLoginPageLocators.userEmail);
    this.dashboardDisplay = page.locator(animatedLoginPageLocators.dashboard);
    this.myAccountButton = this.page.getByRole('button', { name: 'My Account' });
    this.profileOption = this.page.locator(animatedLoginPageLocators.profileOption);
    this.preferencesOption = this.page.locator(animatedLoginPageLocators.preferencesOption);
    this.settingsOption = this.page.locator(animatedLoginPageLocators.settingsOption);
    this.logoutOption = this.page.locator(animatedLoginPageLocators.logOutOption);
    this.loginHeading = this.page.getByRole('heading', { name: 'Login' });
  }
}
