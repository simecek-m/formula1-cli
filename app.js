import chalk from "chalk";
import inquirer from "inquirer";
import { DATA_COMMANDS, PERIOD_COMMANDS } from "./src/commands.js";
import collectCountriesFlow from "./src/flow/countries.js";
import { collectAllDriversFlow, collectDriversFromRangeFlow, collectDriversFromYearFlow } from "./src/flow/drivers.js";
import collectEveryThingFlow from "./src/flow/everything.js";
import { collectAllTeamsFlow, collectTeamsFromRangeFlow, collectTeamsFromYearFlow } from "./src/flow/teams.js";
import { pickPeriod, pickYear, pickYearRange } from "./src/helper/input.js";

async function run() {
  const { data } = await inquirer.prompt([
    {
      type: 'list',
      name: 'data',
      message: 'What data you want to collect?',
      choices: [
        {
          name: 'countries',
          value: DATA_COMMANDS.countries
        },
        {
          name: 'drivers',
          value: DATA_COMMANDS.drivers
        },
        {
          name: 'teams',
          value: DATA_COMMANDS.teams
        },
        new inquirer.Separator(),
        {
          name: 'just everything 😈',
          value: DATA_COMMANDS.everything
        }
      ],
    }
  ])
  switch(data) {
    case DATA_COMMANDS.countries:
      await collectCountriesFlow()
      break
    case DATA_COMMANDS.drivers:
    case DATA_COMMANDS.teams:
      const period = await pickPeriod()
      selectFlow(data, period)
      break
    case DATA_COMMANDS.everything:
      await collectEveryThingFlow()
      break
    default:
      console.log(chalk.red("Unknown command"))
  }
}

run()

async function selectFlow(data, period) {
  const { collectYearFlow, collectRangeFlow, collectAllFlow } = getFlow(data)
  switch(period) {
    case PERIOD_COMMANDS.oneYear:
      const year = await pickYear()
      await collectYearFlow(year)
      break
    case PERIOD_COMMANDS.range:
      const { from, to } = await pickYearRange()
      await collectRangeFlow(from, to)
      break
    default:
      await collectAllFlow()
  }
}

function getFlow(data) {
  switch(data) {
    case DATA_COMMANDS.drivers:
      return { 
        collectYearFlow: collectDriversFromYearFlow,
        collectRangeFlow: collectDriversFromRangeFlow, 
        collectAllFlow: collectAllDriversFlow
      }
    case DATA_COMMANDS.teams:
      return { 
        collectYearFlow: collectTeamsFromYearFlow,
        collectRangeFlow: collectTeamsFromRangeFlow, 
        collectAllFlow: collectAllTeamsFlow
      }
  }
}