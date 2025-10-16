import { Page } from '@playwright/test';

export class AnimationHelper {
  /**
   * Waits for the button's animation to complete and validates stability
   */
  static async waitForAnimationToStabilize(page: Page, selector: string, timeout: number = 10000) {
    await page.waitForFunction(
      sel => {
        const button = document.querySelector(sel) as HTMLElement;
        if (!button) return false;

        const transform = window.getComputedStyle(button).transform;

        // Debug: Log the transform during polling
        console.log('Current Button Transform:', transform);

        // Check if the transform is stable
        return transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)';
      },
      selector,
      { timeout },
    );
  }
}
