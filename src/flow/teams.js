import { Listr } from 'listr2'
import { writeToCsvFile } from '../data/file.js'
import { scrapeTeamsFromRange, scrapeTeamsFromYear } from '../web-scraper/team.js'

export const collectAllTeamsTasks = [
{
    title: 'Scraping teams from formula1.com',
    task: async ctx => ctx.data = await scrapeTeamsFromRange()
  },
  {
    title: 'Writing to file',
    task: async ctx => await writeToCsvFile("teams", ctx.data)
  }
]

export const collectTeamsFromRangeTasks = (from, to) => [
  {
    title: 'Scraping teams from formula1.com',
    task: async ctx => ctx.data = await scrapeTeamsFromRange(from, to)
  },
  {
    title: 'Writing to file',
    task: async ctx => await writeToCsvFile("teams", ctx.data)
  }
]

export const collectTeamsFromYearTasks = year => [
  {
    title: 'Scraping teams from formula1.com',
    task: async ctx => ctx.data = await scrapeTeamsFromYear(year)
  },
  {
    title: 'Writing to file',
    task: async ctx => await writeToCsvFile("teams", ctx.data)
  }
]

export async function collectAllTeamsFlow() {
  const list = new Listr(collectAllTeamsTasks) 
  await list.run()
}

export async function collectTeamsFromRangeFlow(from, to) {
  const list = new Listr(collectTeamsFromRangeTasks(from, to)) 
  await list.run()
}

export async function collectTeamsFromYearFlow(year) {
  const list = new Listr(collectTeamsFromYearTasks(year))
  await list.run()
}