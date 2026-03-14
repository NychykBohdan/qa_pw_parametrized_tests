import { test } from '../_fixtures/fixtures';
import { 
  COFFEE_PRICES,
  COFFEE_NAMES
} from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffeeName: value, coffeePrice: COFFEE_PRICES[key]})
}

testParameters.forEach(({ coffeeName, coffeePrice }) => {
  test(`Add coffee ${coffeeName} to cart and assert ${coffeePrice}`, async ({
    menuPage,
  }) => {
  
    await menuPage.open();
    await menuPage.addCoffeeToCart(coffeeName);
    await menuPage.assertTotalCheckoutContainsValue(coffeePrice);
  });
  
});

