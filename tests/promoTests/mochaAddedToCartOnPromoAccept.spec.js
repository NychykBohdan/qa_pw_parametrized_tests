import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { 
  COFFEE_PRICES,
  COFFEE_NAMES
 } 
 from '../../src/constants';



test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  const espressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const discMochaPrice = priceFormatStr(COFFEE_PRICES.discountedMocha);
  const cappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const americanoPrice = priceFormatStr(COFFEE_PRICES.americano);

  await menuPage.open();
  await menuPage.addCoffeeToCart(COFFEE_NAMES.cappuccino);
  await menuPage.addCoffeeToCart(COFFEE_NAMES.espresso);
  await menuPage.addCoffeeToCart(COFFEE_NAMES.americano);

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.espresso, 
    espressoPrice
  );
  await cartPage.assertCoffeeHasCorrectTotalCost(
    '(Discounted) Mocha',
    discMochaPrice,
  );
  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.cappuccino,
    cappuccinoPrice
  );
  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.americano,
    americanoPrice
  );
});
