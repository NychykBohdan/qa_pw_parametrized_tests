const { test, expect } = require('@playwright/test');
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { priceFormatStr } from '../../src/common/priceFormatters';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');
    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  getCoffeeCup(coffeeName) {
    return this.page.getByLabel(coffeeName, { exact: true });
  }

  getCoffeeCupCost(coffeeName) {
    return this.page
    .getByRole('listitem')
    .filter({ has: this.getCoffeeCup(coffeeName) });
  }

  async open() {
    await test.step(`Open 'Menu page'`, async() => {
      await this.page.goto('/');
    })
  }

  async clickCartLink() {
    await test.step(`Click 'Cart' link`, async() => {
      await this.cartLink.click();
    })
  }

  async clickYesPromoButton() {
    await test.step(`Click 'Yes' in promo window`, async() => {
      await this.yesPromoButton.click();
    })
  }

  async clickNoPromoButton() {
    await test.step(`Click 'No' in promo window`, async() => {
      await this.noPromoButton.click();
    })
  }

  async assertPromoMessageIsVisible() {
    await test.step(`Assert 'Promo message' is visible`, async() => {
      await expect(this.promoMessage).toBeVisible();
    })
  }

  async addCoffeeToCart(coffeeName) {
    await test.step(`Add ${coffeeName} to cart`, async() => {
      await this.getCoffeeCup(coffeeName).click();
    })
  }
  
  async assertTotalCheckoutContainsValue(coffeePrice) {
    await test.step(`Assert checkout total is ${coffeePrice}.00$`, async () => {
      await expect(this.totalCheckout)
      .toContainText(totalPriceFormatStr(coffeePrice));
    })
    
  }

  async assertCoffeeCupCost(coffeeName, coffeePrice) {
    await test.step(
      `Assert one cup of ${coffeeName} has cost $${coffeePrice}.00`, 
      async () => {
        await expect(this.getCoffeeCupCost(coffeeName))
        .toContainText(priceFormatStr(coffeePrice));
      })
  }

}
