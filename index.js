import { scrapeDriversFromYearRange } from "./src/page/driver.js"

async function loadData() {
  const result = await scrapeDriversFromYearRange(1990, 1992)
  console.table(result)
}

loadData()
