//E2E tests
const BASEURL = 'http://127.0.0.1:5500/source/horoscope/pages/'
describe('Basic user flow for Love Compatibility', () => {
    beforeAll(async () => {
      try {
        await page.goto(BASEURL + 'compatibility.html');
        console.log('Page loaded successfully');
      } catch (error) {
        console.error('Error loading page:', error);
      }
    }, 30000); //increased time for connection


    // Fill out and submit the horoscope form
    it('Initial Page - Submit Information', async () => {
        console.log('Submitting information...');
        // Submit birthday
        await page.$eval('#birthday-input1', el => el.value = '2003-02-20');
        await page.$eval('#birthday-input2', el => el.value = '2003-09-10');

        // Submit the form
        await Promise.all([
          page.waitForNavigation(),
          page.click('#submit-compatibility') 
        ]);

        await Promise.all([
          page.waitForNavigation(),
          page.click('#save-compatibility') 
        ]);

        // Make sure localStorage is updated with the correct horoscope
        const localHoroscopes = await page.evaluate(() => localStorage.getItem("horoscopes"));
        let obj = JSON.parse(localHoroscopes)[0];
        expect(obj["sign"]).toBe("Pisces + Virgo");

        // Check if Horoscope is in history
        let pastEntries = await page.$$('past-entry-card');
        expect(pastEntries.length).toBe(1);


  }, 10000);

});

