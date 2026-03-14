import { test } from '../_fixtures/fixtures';
import { 
  COFFEE_NAMES
 } 
 from '../../src/constants';


test('Assert cart cleaned after page refresh', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.addCoffeeToCart(COFFEE_NAMES.cappuccino);
  await menuPage.addCoffeeToCart(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(COFFEE_NAMES.cappuccino);
  await cartPage.assertCoffeeItemIsVisible(COFFEE_NAMES.espresso);

  await cartPage.reload();

  await cartPage.assertCoffeeItemIsHidden(COFFEE_NAMES.cappuccino);
  await cartPage.assertCoffeeItemIsHidden(COFFEE_NAMES.espresso);

  await cartPage.assertNoCoffeeMessageIsVisible();
});
