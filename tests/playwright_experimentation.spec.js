import{test, expect} from '@playwright/test'

test('Playwright Experimentation', async({page}) => {
    await page.pause()
	await page.goto('http://localhost:8080/')
	await expect(page).toHaveTitle("Run Marketplace - Nigeria's Trusted Shopping Platform")
})