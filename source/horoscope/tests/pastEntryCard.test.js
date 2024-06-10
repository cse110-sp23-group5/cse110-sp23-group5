//E2E tests

describe("pastEntryCard Tests", () => {
  let horoscope;

  beforeAll(async () => {
    try {
       await page.goto('http://127.0.0.1:5500/source/horoscope/pages/landing.html');
       console.log('Landing page loaded successfully');
    } catch (error) {
       console.error('Landing page load failed: ', error);
    }

    horoscope = {
      sign: "Leo",
      birthday: "August 5, 2003",
      date: "Now",
      category: "Health"
    };

 }, 30000);

  it("verifying elements and data", async () => {
    await page.$eval('#birthday-input', el => el.value = '2003-08-05');
    await page.$eval('#category-health', el => el.click());
    await Promise.all([
      page.waitForNavigation(),
      page.click('#submit-horo') 
    ]);

    await Promise.all([
      page.waitForNavigation(),
      page.click('#save-horo') 
    ]);

    /**
     * had to repeat this since a variable can't be passed into the querySelector as it isn't
     * within the scope of the method being passed into page.evaluate
     */
    let sign = await page.evaluate(() =>
      document
        .querySelector('#saved-list > past-entry-card')
        .shadowRoot
        .querySelector('.sign')
        .innerHTML
    );

    let birthday = await page.evaluate(() =>
      document
        .querySelector('#saved-list > past-entry-card')
        .shadowRoot
        .querySelector('.birthday')
        .innerHTML
    );

    let date = await page.evaluate(() =>
      document
        .querySelector('#saved-list > past-entry-card')
        .shadowRoot
        .querySelector('.date')
        .innerHTML
    );

    let message = await page.evaluate(() =>
      document
        .querySelector('#saved-list > past-entry-card')
        .shadowRoot
        .querySelector('.message')
        .innerHTML
    );

    let category = await page.evaluate(() =>
      document
        .querySelector('#saved-list > past-entry-card')
        .shadowRoot
        .querySelector('.category')
        .innerHTML
    );

    expect(sign).toBe(horoscope.sign);
    expect(birthday).toBe(horoscope.birthday);
    expect(date).toBe(horoscope.date);
    expect(message).not.toBe(null);
    expect(category).toBe(horoscope.category);
  }, 10000);
});