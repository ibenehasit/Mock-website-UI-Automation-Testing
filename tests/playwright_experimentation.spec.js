import{test, expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/')

});

test('Correct Website Title', async({page}) => {
    await page.pause()
	await expect(page).toHaveTitle("Run Marketplace - Nigeria's Trusted Shopping Platform")
})

test.describe('Login Tests', () => {

test('Valid Login Test', async({page}) => {
    //logging in 
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('customer@ekasi.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('customer123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    //assurances
    await expect.soft(page.locator('[data-lov-name="ToastTitle"]')).toHaveText(/welcome/i);
    await expect.soft(page.locator('[data-lov-name="ToastDescription"]')).toHaveText(/signed in/i);
    await expect.soft(page.getByRole('button', { name: 'Login' })).toBeHidden({ timeout: 5 });
    await expect.soft(page.getByRole('button', { name: 'Sign Up' })).toBeHidden({ timeout: 5 });
    await expect(page).toHaveTitle("Run Marketplace - Nigeria's Trusted Shopping Platform");
})

test('Invalid Login Test', async({page}) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('username@email.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Dynamic fail check, as current text is "Failed to fetch" and is likely to change
    await expect(page.getByRole('alert')).toBeVisible();
})

})


/*test('Checking the footer links' , async({page}) => {
    //made redundant by below test
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; i++) {
        const link = footerLinks.nth(i);
        const destinationUrl = await link.getAttribute('href');
        if (destinationUrl && destinationUrl.startsWith('/')) {
            await link.click();
            await expect(page).toHaveURL(new RegExp(destinationUrl));
            await page.goBack();
        }
    }
})

*/

test.describe('Homepage Links', () => {
    test('Checking homepage links work' , async({page}) => {
        const headerLinks = page.locator('[data-lov-name="div"] a');
        const count = await headerLinks.count();
        for (let i = 0; i < count; i++) {
            const link = headerLinks.nth(i);
            const destinationUrl = await link.getAttribute('href');
            if (destinationUrl && destinationUrl.startsWith('/') && destinationUrl !== '/'){ 
                await link.click();
                await expect(page).toHaveURL(new RegExp(destinationUrl));
                await page.goBack();
            } else if(destinationUrl=== '/'){
                await expect(link).toBeVisible();
            }
        }
    })    
})