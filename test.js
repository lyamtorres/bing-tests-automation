const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

// promise.USE_PROMISE_MANAGER = false;

describe('Bing Search', function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('should open bing.com, then search for "webdriver"', async function() {
    await driver.get('https://www.bing.com');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.ENTER);
    let newUrl = await driver.getCurrentUrl();
    assert.notEqual(newUrl, 'https://www.bing.com/');
  });

  it('should open bing.com, then search with the search button', async function() {
    await driver.get('https://www.bing.com');
    await driver.findElement(By.name('q')).sendKeys('webdriver');
    await driver.findElement(By.id('search_icon')).click();
    let newUrl = await driver.getCurrentUrl();
    assert.notEqual(newUrl, 'https://www.bing.com/');
  });

  it('should open the virtual keyboard, then search for "java"', async function() {
    await driver.get('https://www.bing.com');
    await driver.findElement(By.id('vkeyIcon')).click();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.findElement(By.id('key31')).click();
    await driver.findElement(By.id('key25')).click();
    await driver.findElement(By.id('key41')).click();
    await driver.findElement(By.id('key25')).click();
    await driver.findElement(By.id('eK')).click();
    let newUrl = await driver.getCurrentUrl();
    assert.notEqual(newUrl, 'https://www.bing.com/');
  });

  it('should open bing.com, then choose the first recommended option', async function() {
    await driver.get('https://www.bing.com');
    await driver.findElement(By.id('vkeyIcon')).click();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.findElement(By.id('key26')).click();
    await driver.findElement(By.id('key15')).click();
    await driver.findElement(By.name('q')).sendKeys(Key.ARROW_DOWN);
    await driver.findElement(By.name('q')).sendKeys(Key.ENTER);

    let newUrl = await driver.getCurrentUrl();
    assert.notEqual(newUrl, 'https://www.bing.com/');
  });

  /* Des fois ce test cause des problèmes et doit être exécuté seul */
  it('should open the image search option, then select the third example', async function() {
    await driver.get('https://www.bing.com');
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.findElement(By.id('bnp_btn_accept')).click();
    await driver.findElement(By.className('camera icon ')).click();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.findElement(By.className('sbiDmImg sbiable rms_img')).click();

    let newUrl = await driver.getCurrentUrl();
    assert.notEqual(newUrl, 'https://www.bing.com/');
  });

});