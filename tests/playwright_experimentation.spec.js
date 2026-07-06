import{test, expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/')

});

test('Correct Website Title', async({page}) => {
    await page.pause()
	await expect(page).toHaveTitle("Run Marketplace - Nigeria's Trusted Shopping Platform")
})



test('Invalid Login Test', async({page}) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('username@email.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.pause()
    await expect(page.getByRole('alert')).toBeVisible();
})