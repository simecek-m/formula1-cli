import fetch from 'node-fetch'
import cheerio from "cheerio"
import logger from "../logger/index.js"
import { RESULTS_URL } from '../constant/url.js'
import { CHAMPIONSHIP_FIRST_YEAR, THIS_YEAR } from '../constant/year.js'
import { uniqWith, isEqual } from 'lodash-es'

const getUrlByYear = year => {
  return `${RESULTS_URL}/${year}/drivers.html`
}

export async function scrapeDriversFromYear(year = THIS_YEAR) {
  logger.info(`Scraping drivers from ${year}`)
  const drivers = []
  const url = getUrlByYear(year)
  try {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    $(".resultsarchive-table tbody tr").each((_, row) => {
      const name = $(row).find("td:nth-child(3)")
      const firstname = $(name).find("span:first").text().trim()
      const lastname = $(name).find("span:nth-child(2)").text().trim()
      const nationality = $(row).find("td:nth-child(4)").text().trim()
      drivers.push({lastname, firstname, nationality })
    })
  } catch (error) {
    logger.error(`Error while scraping drivers from year: ${year}`)
  } finally {
    return drivers
  }
}

export async function scrapeDriversFromRange(from = CHAMPIONSHIP_FIRST_YEAR, to = THIS_YEAR) {
  let drivers = [];
  for(let year = from; year <= to; year++) {
    const yearDrivers = await scrapeDriversFromYear(year)
    drivers = [...drivers, ...yearDrivers]
  }
  return uniqWith(drivers, (el1, el2) => isEqual(el1, el2))
}
