const { test, expect } = require('@playwright/test');

const itensMenu = [
  'Home',
  'Estações',
  'Manual'
];

let arrItensMenu = [];

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  arrItensMenu = await page.locator('#page-sidebar > div > nav > ul > li');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Carregamento da página', () => {
  test('Página não deve ser vazia', async ({ page }) => {
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();
  })
});

test.describe('Itens do menu', () => {
  test('Verificar Home', async ({ page }) => {
    const item = await arrItensMenu.nth(0);
    await expect(item).toHaveText([itensMenu[0]]);

    await item.click();
    await expect(page).toHaveURL('http://localhost:3000/');
  })

  test('Verificar Estações', async ({ page }) => {
    const item = await arrItensMenu.nth(1);
    await expect(item).toHaveText([itensMenu[1]]);

    await item.click();
    await expect(page).toHaveURL('http://localhost:3000/estacoes');
  })

  test('Verificar Manual', async ({ page }) => {
    const item = await arrItensMenu.nth(2);
    await expect(item).toHaveText([itensMenu[2]]);

    const [page1] = await Promise.all([
      page.waitForEvent('popup'),
      item.click()
    ]);

    await expect(page1).toHaveURL('https://portal.inmet.gov.br/manual');
  })
});

test.describe('Página das Estações', () => {
  test('Página deve conter plot', async ({ page }) => {
    await arrItensMenu.nth(1).click();

    const plot = await page.locator('#root > div > main > section > div > div:nth-child(1) > div > div > div > svg:nth-child(1)');
    await plot.screenshot({path: './tests/screenshots/plot.png'});
    await expect(plot).toBeVisible();
  });

  test('Gerar novo plot', async ({ page }) => {
    await arrItensMenu.nth(1).click();
    await expect(page).toHaveURL('http://localhost:3000/estacoes');
    // Click #pf-select-toggle-id-6
    await page.locator('#pf-select-toggle-id-6').click();
    // Click text=A422 - ABROLHOS
    await page.locator('text=A422 - ABROLHOS').click();
    // Click #pf-select-toggle-id-12
    await page.locator('#pf-select-toggle-id-12').click();
    // Click text=Temperatura Média
    await page.locator('text=Temperatura Média').click();
    // Click [aria-label="Toggle date picker"] >> nth=0
    await page.locator('[aria-label="Toggle date picker"]').first().click();
    // Click td:has-text("7") >> nth=0
    await page.locator('td:has-text("7")').first().click();
    // Click [aria-label="Toggle date picker"] >> nth=1
    await page.locator('[aria-label="Toggle date picker"]').nth(1).click();
    // Click td:has-text("11")
    await page.locator('td:has-text("11")').click();
    // Click text=Buscar
    await page.locator('text=Buscar').click();
    await expect(page).toHaveURL('http://localhost:3000/estacoes/TEMP_MED/2019-10-07/2019-10-11/A422');

    const plot = await page.locator('#root > div > main > section > div > div:nth-child(1) > div > div > div > svg:nth-child(1)')
    await expect(plot).toBeVisible();
    await plot.screenshot({path: './tests/screenshots/plot2.png'})
  });
});