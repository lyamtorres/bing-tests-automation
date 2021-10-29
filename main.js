const {Builder, By, Key} = require("selenium-webdriver");
const assert = require("assert");

async function start() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://bing.com");
    await driver.findElement(By.id("sb_form_q")).sendKeys("Selenium", Key.RETURN);

    await driver.quit();
}

start();