import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { 
  COFFEE_PRICES,
  COFFEE_NAMES
 } from '../../src/constants';

test('Assert cart updated correctly after clicking plus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  const oneCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const twoCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
  const oneEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const twoEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso * 2);
  const totalPriceNum =
    COFFEE_PRICES.cappuccino * 2 + COFFEE_PRICES.espresso * 2;
  const totalPrice = priceFormatStr(totalPriceNum);

  await menuPage.open();
  await menuPage.addCoffeeToCart(COFFEE_NAMES.cappuccino);
  await menuPage.addCoffeeToCart(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.espresso,
    oneEspressoPrice
  );

  await cartPage.addOneCoffeeItem(COFFEE_NAMES.espresso);

  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.espresso,
    twoEspressoPrice
  );
  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.cappuccino,
    oneCappuccinoPrice
  );

  await cartPage.addOneCoffeeItem(COFFEE_NAMES.cappuccino);

  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.cappuccino,
    twoCappuccinoPrice
  );
  await cartPage.assertCoffeeHasCorrectTotalCost(
    COFFEE_NAMES.espresso,
    twoEspressoPrice
  );

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
});
