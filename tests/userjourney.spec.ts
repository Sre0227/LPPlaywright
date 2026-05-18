import {test,expect} from "@playwright/test"

test('descr',async ({page})=>{
  test.setTimeout(360000);

  await page.goto("https://int-customerportal.lendingpoint.com/apply/",
    { waitUntil: "load" })

  
  await page.locator('[name="firstName"]').fill('John');
  await page.locator('[name="lastName"]').fill('smith');
  await page.locator('[name="desiredLoanAmount"]').fill('3000');

  //await page.getByRole('combobox').click()
  //await page.getByRole("option",{name :'Home improvement'}).click()
  await page.locator('select[aria-hidden="true"]').selectOption('Home improvement')
  //await page.selectOption('select[aria-hidden="true"]','Home improvement')
  
  await page.getByRole("button",{name :'Continue to Contact Information'}).click()


  await page.locator('[name="phone"]').fill(generateRandomPhoneNum())
  await page.locator('[name="email"]').fill(generateRandomEmail())
  await page.getByRole("button",{name:"Continue to Verification"}).click()

  const otp = '123456';

  for (let i = 0; i < otp.length; i++) {
    
    await page.getByLabel(`Please enter OTP character ${i + 1}`).fill(otp.charAt(i));
  }

  await expect(page.locator('.loading-spinner')).toBeHidden();

  await expect(page.locator('[name="address"]')).toBeVisible();

  await page.locator('[name="address"]').fill("222333 Peachtree Place")
  await page.locator('[name="city"]').fill("Atlanta")

  //await page.getByRole('combobox').click()
  //await page.getByRole("option",{name :'GA'}).click()
  await page.locator('select[aria-hidden="true"]').selectOption('GA')

  await page.locator('[name="zipCode"]').fill("30318")

  await page.getByRole("button",{name:"Continue to Your Income"}).click()

  //await page.locator('input[name="annualIncome"]').fill("80000")
  const annualIncome = page.locator('input[name="annualIncome"]');

  // Playwright auto-waits for visible + enabled
  await annualIncome.waitFor({ state: 'visible' });
  await annualIncome.clear();
  await annualIncome.fill('80000');

  await page.locator('select[aria-hidden="true"]').selectOption("Other")
  await page.getByRole("button",{name:"Continue to About You"}).click()

  await page.locator('input[name="dob"]').fill("02/28/1975")
  await page.locator('input[name="ssn"]').fill("112223333")
  await page.getByRole("button",{name:"See Your Options"}).click()

  await expect(page.locator('.loading-spinner')).toBeHidden();

  const confirmBtn = page.locator('button:has-text("Confirm Offer")');
  await expect(confirmBtn).toBeVisible();
  await expect(confirmBtn).toBeEnabled();
  await confirmBtn.click();

  await page.getByRole("button",{name:"Let’s Go"}).click()

  await page.getByRole("button",{name:"Connect Bank Account"}).click()

  const plaidFrame = page.frameLocator('#plaid-link-iframe-1');
  await expect(plaidFrame.getByText('Continue without phone number')).toBeVisible();
  await plaidFrame.getByText('Continue without phone number').click();

  const searchInput = plaidFrame.locator('#search-input-input');
  await expect(searchInput).toBeVisible();
  await searchInput.fill("First Platypus Bank");

  const bankOption = plaidFrame.getByText('First Platypus Bank', { exact: true });
  await expect(bankOption).toBeVisible();
  await bankOption.click();

  await plaidFrame.locator('button[aria-label="First Platypus Bank"]').click();
  
  //"plaidBankName": "First Platypus Bank",
  //"plaidUsername": "user_custom",
  //"plaidPassword": "{"override_accounts":[{"starting_balance":23630,"type":"depository","subtype":"checking","identity":{"names":["John Smith"]}},{"starting_balance":25215,"type":"depository","subtype":"savings","identity":{"names":["John Smith"]}}]}",
 
  const usernameField = plaidFrame.locator('#aut-input-0-input');
  await expect(usernameField).toBeVisible();
  await usernameField.fill("user_custom")

  const passwordField = plaidFrame.locator('#aut-input-1-input');
  await expect(passwordField).toBeVisible();
  await passwordField.fill('{"override_accounts":[{"starting_balance":23630,"type":"depository","subtype":"checking","identity":{"names":["John Smith"]}}, {"starting_balance":25215,"type":"depository","subtype":"savings","identity":{"names":["John Smith"]}}]}')

  await expect(plaidFrame.getByText('Submit')).toBeVisible();
  await plaidFrame.getByText('Submit').click()

  // await plaidFrame.locator('div.UserSelectionPane-module__refreshedRow:has-text("Checking")')
  //   .locator('input[type="checkbox"]')
  //   .check();


  await plaidFrame.locator("//div[contains(text(),'Checking')]/ancestor::div[2]/preceding-sibling::div//input[@type='checkbox']").check();
  
  await expect(plaidFrame.getByText('Continue')).toBeVisible();
  await plaidFrame.getByText('Continue').click()

  //await expect(plaidFrame.getByText('Allow')).toBeVisible();
  //await plaidFrame.getByText('Allow').click()
  await plaidFrame.locator('button span.Thr-Button-Text', { hasText: 'Allow' }).click();

  //await expect(plaidFrame.getByText('Finish without saving')).toBeVisible();
  await plaidFrame.getByText('Finish without saving').click()

  await page.getByRole("button",{name :'Set Up Autopay'}).click()

  await page.getByRole("button",{name :'Continue to Loan Agreement'}).click()

  // First checkbox
await page.locator('div.self-start', {
  hasText: 'Consent to Electronic Communications'
}).locator('input[type="checkbox"]').check();


// Second checkbox
await page.locator('div.flex.items-center')
  .filter({ hasText: 'affix your electronic signature' })
  .locator('input[type="checkbox"]')
  .check();

await page.getByRole("button",{name : 'Sign Loan Agreement and Consent to Electronic Communications'}).click()

})


const phoneNumbers ="91335386,57130603,42344993,91972571,34767460,34767440,40459071,85752968,50447547,40495573,87226739,71629879,71939816,32351032,31345113,42420984,32180213,42435437,31324629,91937402,42445809,94926496,25662666,61256266,34120911,65066714,55974558,60732332,51826103,80437234,81344562,46324307,71920463,40529381,85941549,86223549,63137147,83122105,61543425,30474574,27920185,30184270,68121748,86225950,83232458,90140200,36079795,41232690,90895539,41935988,56254623,51826126,43453512,60282539,24827085,62661840,74729380,68225347,30145327,75430742,64666511,44589515,31830206,43054162,40529554,60856174,22428646,40132143,71448563,21481406,28181018,76322008,73724208,71469683,42458759,60930061,27278606,90339279,20928411,28176036,35238951,41221282,61448983,83031352,74023939,77222814,62653983,81738285,41063547,50563496,70158711,86029490,33127626,72437489,41332485,21391564,94928835,25626909,57462150,98420764,40529553,97942934,30228146,26738004,76523994,20259617,81578096,47827335,61631938,24857956,81897503,74046300"

function generateRandomPhoneNum():string{

  const numberArray=phoneNumbers.split(",")
  // Pick a random number from the array
  const randomIndex = Math.floor(Math.random() * numberArray.length)
  const randomNumber = numberArray[randomIndex]
  // Generate 2 random digits (00-99)
  const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, "0")

  // Append and return as string
  return randomNumber + randomDigits

}

function generateRandomEmail(): string {
  // Generate 4 random digits (0000-9999)
  const random4Digits = Math.floor(Math.random() * 10000).toString().padStart(4, "0")

  // Return the email string
  return `sreenath.gudia+qa${random4Digits}@lendingpoint.com`
}