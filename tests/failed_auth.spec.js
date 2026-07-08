import { test, expect } from '@playwright/test';

//There is no network traffic to interrupt, therefore this code cannot do it's job
test.skip('Friendly message for login server crash', async({page}) => {
    await page.route('**/api/login', async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal Server Error' }),
        });
    });

    await page.goto('localhost:8080/');
    await page.pause()
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('customer@ekasi.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('customer123');
    await page.getByRole('button', { name: 'Sign In' }).click();
})