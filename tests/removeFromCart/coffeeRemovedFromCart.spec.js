import { test } from '../_fixtures/fixtures';
import { 
  COFFEE_NAMES,
 } from '../../src/constants';

let testParameters = [];

for(const value of Object.values(COFFEE_NAMES)) {
  testParameters.push({ coffeeName: value });
}

testParameters.forEach(({ coffeeName }) => {
  test(`Add ${coffeeName} to cart and remove coffee from cart`, async ({
    cartPage,
    menuPage,
  }) => {
    
    await menuPage.open();
    await menuPage.addCoffeeToCart(coffeeName);
  
    await menuPage.clickCartLink();
    await cartPage.waitForLoading();
    await cartPage.assertCoffeeItemIsVisible(coffeeName);
    
    await cartPage.clickRemoveCoffeeButton(coffeeName);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
  
})
