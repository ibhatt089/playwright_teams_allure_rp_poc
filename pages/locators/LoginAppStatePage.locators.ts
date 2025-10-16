import { Locator, Page } from '@playwright/test';

const appStateLocators = {
  emailField: "label:has-text('Email')",
  passwordField: "label:has-text('Password')",
  signInButton: 'button:has-text("Sign In")',
  dashboardHeading: '.logo',
  userEmailDisplay: '#userEmail',
  profileButton: '#profileButton',
  profileMenu: '#profileMenu',
  logoutOption: '#logoutOption',
};

export class LoginAppStatePage {
  userEmailAddressInputText: Locator;
  passwordInputText: Locator;
  signInButton: Locator;
  dashboardHeading: Locator;
  userEmailDisplay: Locator;
  profileButton: Locator;
  profileMenu: Locator;
  logoutOption: Locator;

  constructor(public page: Page) {
    this.userEmailAddressInputText = page.locator(appStateLocators.emailField);
    this.passwordInputText = page.locator(appStateLocators.passwordField);
    this.signInButton = page.locator(appStateLocators.signInButton);
    this.dashboardHeading = page.locator(appStateLocators.dashboardHeading);
    this.userEmailDisplay = page.locator(appStateLocators.userEmailDisplay);
    this.profileButton = page.locator(appStateLocators.profileButton);
    this.profileMenu = page.locator(appStateLocators.profileMenu);
    this.logoutOption = page.locator(appStateLocators.logoutOption);
  }
}
