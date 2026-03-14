import { test } from '../_fixtures/fixtures';
import { 
  COFFEE_NAMES,
  COFFEE_PRICES
 } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffeeName: value, coffeePrice: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffeeName, coffeePrice}) => {
  test(`Check ${coffeeName} cup has correct cost $${coffeePrice}.00`,
    async ({ menuPage }) => {
  
      await menuPage.open();
      await menuPage.assertCoffeeCupCost(coffeeName, coffeePrice);
  });
  
})
