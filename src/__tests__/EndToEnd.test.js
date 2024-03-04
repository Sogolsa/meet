import puppeteer from 'puppeteer';

// Defining a new scope for feature 2 (3 scenarios)
describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    // launching the browser using puppeteer, the Chromium window will open
    browser = await puppeteer.launch({
      // watch the test being conducted within the browser
      headless: false,
      sloMo: 250, // Slow down by 250 ms
      timeOut: 0, // removes any puppeteer/browser timeout limitations(this isn't the same as the timeout of jest)
    });
    // Puppeteer API is used to create a new page and navigate to locally hosted app
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // wait until the event list is loaded by the page
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    // Closing the Chromium window after completing the test run
    browser.close();
  });
  // Feature 2: Scenario 1
  test('An event element is collapsed by default', async () => {
    // If this element is present means the event is expanded
    const eventDetails = await page.$('.event .details');
    // check if the event details exists or not
    expect(eventDetails).toBeNull();
  });

  // Feature 2: Scenario 2
  test('User can expand an event to see its details', async () => {
    // User clicking on the button, with className of details-btn
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  // Feature 2: Scenario 3
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
