import { test } from '../_fixtures/fixtures';
import {
  unitPriceFormatStr,
  priceFormatStr,
} from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffeeName: value, coffeePrice: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffeeName, coffeePrice }) => {
  test(`Check ${coffeeName} correctly added to the Cart`, async ({
    menuPage,
    cartPage,
  }) => {
    const totalPriceStr = priceFormatStr(coffeePrice);
    const unitPriceStr = unitPriceFormatStr(coffeePrice, 1);

    await menuPage.open();
    await menuPage.addCoffeeToCart(coffeeName);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.assertCoffeeNameIsVisible(coffeeName);
    await cartPage.assertCoffeeUnitHasCorrectCost(
      coffeeName, 
      unitPriceStr
    );
    await cartPage.assertCoffeeHasCorrectTotalCost(
      coffeeName,
      totalPriceStr,
    );
  });
});
