import {test,expect} from "@playwright/test"

test('descr',async ({page})=>{
  await page.goto("https://int-customerportal.lendingpoint.com/apply/",
    { waitUntil: "load" })

  
  await page.locator('[name="firstName"]').fill('John');
  //await page.getByRole("textbox",{name :'lastName'}).fill("John")
  await page.locator('[name="lastName"]').fill('smith');
  //await page.getByRole("textbox",{name :'lastName'}).fill("Smith")
  await page.locator('[name="desiredLoanAmount"]').fill('3000');
  //await page.getByRole("textbox",{name :'desiredLoanAmount'}).fill('3000')

  //await page.getByRole("textbox",{name :'lastName', exact: true}).fill("John")
  
  

  //await page.getByRole("button",{name :'Loan Purpose'}).click()
  await page.getByRole('combobox').click()
  await page.getByRole("option",{name :'Home improvement'}).click()
  //await page.locator('[type="button"]').click();

  //await page.locator('div').filter({ hasText: 'Home improvement' }).first()
  await page.getByRole("button",{name :'Continue to Contact Information'}).click()


  await page.locator('[name="phone"]').fill(generateRandomPhoneNum())
  await page.locator('[name="email"]').fill(generateRandomEmail())
  await page.getByRole("button",{name:"Continue to Verification"}).click()

  const otp = '123456';

  for (let i = 0; i < otp.length; i++) {
    
    await page.getByLabel(`Please enter OTP character ${i + 1}`).fill(otp.charAt(i));
  }

  await page.locator('.loading-spinner').waitFor({ state: 'hidden' });

  await expect(page.locator('[name="address"]'))
  .toBeVisible({ timeout: 30000 });

  await page.locator('[name="address"]').fill("222333 Peachtree Place")
  await page.locator('[name="city"]').fill("Atlanta")

  await page.getByRole('combobox').click()
  await page.getByRole("option",{name :'GA'}).click()

  await page.locator('[name="zipCode"]').fill("30318")

  await page.getByRole("button",{name:"Continue to Your Income"}).click()
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