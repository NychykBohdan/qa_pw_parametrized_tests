const { test, expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }
  
  getCoffeeItem(coffeeName) {
    return this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: coffeeName });
  }

  getCoffeeItemName(coffeeName) {
    return this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: coffeeName })
      .locator('div')
      .nth(0);
  }

  getCoffeeItemUnit(coffeeName) {
    return this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: coffeeName })
      .locator('div')
      .nth(1);
  }

  getCoffeeItemTotalCost(coffeeName) {
    return this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: coffeeName })
      .locator('div')
      .nth(3);
  }

  async open() {
    await test.step(`Open 'Cart page'`, async() => {
      await this.page.goto('/cart');  
    })
  }

  async waitForLoading() {
    await test.step(`Wait for loading 'Cart page'`, async() => {
      await this.page.waitForURL('/cart');
    })
  }

  async reload() {
    await test.step(`Reload 'Cart page'`, async() => {
      await this.page.reload();
    })
  }

  async clickRemoveCoffeeButton(coffeeName) {
    await test.step(`Click remove ${coffeeName} button`, async() => {
      this.page.getByLabel(`Remove all ${coffeeName}`).click();
    })
  }
  
  async addOneCoffeeItem(coffeeName) {
    await test.step(`Add one ${coffeeName} to cart`, async() => {
      await this.page.getByRole('button', {name: `Add one ${coffeeName}`})
      .click();
    })
  }

  async removeOneCoffeeItem(coffeeName) {
    await test.step(`Remove one ${coffeeName} from cart`, async() => {
      await this.page.getByRole('button', {name: `Remove one ${coffeeName}`})
      .click();
    })
  }

  async assertCoffeeItemIsVisible(coffeeName) {
    await test.step(`${coffeeName} row is visible`, async() => {
      await expect(this.getCoffeeItem(coffeeName)).toBeVisible();
    })
  }

  async assertCoffeeItemIsHidden(coffeeName) {
    await test.step(`${coffeeName} row is hidden`, async() => {
      await expect(this.getCoffeeItem(coffeeName)).toBeHidden();
    })
  }

  async assertCoffeeNameIsVisible(coffeeName) {
    await test.step(`Assert coffee in cart has name ${coffeeName}`, async() => {
      await expect(this.getCoffeeItemName(coffeeName)).toBeVisible();
    })
  }

  async assertCoffeeUnitHasCorrectCost(coffeeName, coffeePrice) {
    await test.step(`Assert coffee ${coffeeName} unit has price ${coffeePrice}`,
      async() => {
        await expect(this.getCoffeeItemUnit(coffeeName))
        .toHaveText(coffeePrice);
      }
    )
  }

  async assertCoffeeHasCorrectTotalCost(coffeeName, totalPrice) {
    await test.step(`Assert ${coffeeName} total cost is ${totalPrice}`, 
      async() => {
          await expect(this.getCoffeeItemTotalCost(coffeeName))
          .toHaveText(totalPrice);
      })
  }

  async assertNoCoffeeMessageIsVisible() {
    await test.step(`Assert message 'No coffee, go add some.' is visible`, 
      async() => {
        await expect(this.notCoffeeMessage).toBeVisible();
      })
  }

  async assertTotalCheckoutContainsValue(totalPrice) {
    await test.step(`Assert total cart cost is ${totalPrice}`, async() => {
      await expect(this.totalCheckout).toContainText(totalPrice);
    })
  }
}
