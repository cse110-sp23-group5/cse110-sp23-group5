//E2E tests
describe('Basic user flow for Website', () => {
    beforeAll(async () => {
        await page.goto('https://cse110-sp23-group5.github.io/cse110-sp23-group5/source/horoscope/horoscope.html');
      });
    // Fill out and submit the horoscope form
    it('Initial Page - Submit Information', async () => {
        console.log('Submitting information...');
        // Submit birthday
        await page.$eval('#birthday', el => el.value = '2003-08-05');
        // Select health fortune from dropdown
        await page.select('#category', 'Health')
        // Submit the form
        await page.evaluate(() => {
            document.querySelector('#save').click();
        });

        // Make sure localStorage is updated with the correct horoscope
        const localHoroscopes = await page.evaluate(() => localStorage.getItem("horoscopes"));
        let obj = JSON.parse(localHoroscopes)[0];
        expect(obj["sign"]).toBe("Leo");

        // Check if Horoscope is in history
        let pastEntries = await page.$$('past-entry-card');
        expect(pastEntries.length).toBe(1);


  }, 10000);

  it('Clearing Horoscopes', async () => {
    console.log("Clearing information...");
    //Clear horoscopes
    //let button = page.$("#clear-horos");
    await page.$eval("#clear-horos", button =>
        button.click()
    );

    // Make sure localStorage is updated
    const localHoroscopes = await page.evaluate(() => window.localStorage.getItem("horoscopes"));
    expect(localHoroscopes).toBe(null);
  }, 10000)
});


