import fetch from 'node-fetch'
import cheerio from "cheerio"
import logger from "../logger/index.js"
import { RESULTS_URL } from '../constant/url.js'

const getUrlByYear = year => {
  return `${RESULTS_URL}/${year}/drivers.html`
}

export async function scrapeDriversFromOneYear(year) {
  logger.info(`Scrapping drivers from ${year}`)
  const drivers = []
  const url = getUrlByYear(year)
  try {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    $(".resultsarchive-table tbody tr").each((_, row) => {
      const name = $(row).find("td:nth-child(3)")
      const firstname = $(name).find("span:first").text()
      const lastname = $(name).find("span:nth-child(2)").text()
      const nickname = $(name).find("span:nth-child(3)").text()
      drivers.push({firstname, lastname, nickname})
    })
  } catch (error) {
    logger.error(`Error while srapping drivers from year: ${year}`)
  } finally {
    return drivers
  }
}

export async function scrapeDriversFromYearRange(from, to) {
  let drivers = [];
  for(let year = from; year <= to; year++) {
    const yearDrivers = await scrapeDriversFromOneYear(year)
    drivers = [...drivers, ...yearDrivers]
  }
  return drivers
}
