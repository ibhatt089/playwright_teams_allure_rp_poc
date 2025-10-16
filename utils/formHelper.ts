import { Page } from '@playwright/test';
import { Logger } from './Logger';

export class FormHelper {
  static async fillForm(page: Page, fields: { [selector: string]: string }) {
    try {
      for (const [selector, value] of Object.entries(fields)) {
        const field = page.locator(selector);
        await field.fill(value);
      }
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Form filling failed: ${error.message}`);
      } else {
        Logger.error('Form filling failed: Unknown error');
      }
      throw error;
    }
  }
}
