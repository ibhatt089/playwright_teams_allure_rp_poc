import { Page } from '@playwright/test';
import { MultiLoginPage } from './MultiLoginPage.locators';
import { ResetPasswordPage } from './ResetPasswordPage.locators';
import { LoginAppStatePage } from './LoginAppStatePage.locators';
import { AnimatedLoginPage } from './AnimatedLoginPage.locators';

export class Locators {
  loginPage: MultiLoginPage;
  forgotPasswordPage: ResetPasswordPage;
  appStatePage: LoginAppStatePage;
  animatedLoginPage: AnimatedLoginPage;

  constructor(public page: Page) {
    this.loginPage = new MultiLoginPage(page);
    this.forgotPasswordPage = new ResetPasswordPage(page);
    this.appStatePage = new LoginAppStatePage(page);
    this.animatedLoginPage = new AnimatedLoginPage(page);
  }
}
