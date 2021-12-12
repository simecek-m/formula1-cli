import inquirer from "inquirer"
import { PERIOD_COMMANDS } from "../constant/commands.js"
import { CHAMPIONSHIP_FIRST_YEAR, THIS_YEAR } from "../constant/year.js"
import { isYearValid, isYearInRange } from "../validator/year.js"

export async function pickYear() {
  const { year } = await inquirer.prompt([
    {
      type: 'input',
      name: 'year',
      message: `Pick a year (${CHAMPIONSHIP_FIRST_YEAR} - ${THIS_YEAR})`,
      validate: year => {
        if(!isYearValid(year)) {
          return "Come on, you really think I'm not validating your input? 😂" 
        } else {
        }
          return true 
        }
  }
  ])
  return year
}

export async function pickYearRange() {
  const { year: from } = await inquirer.prompt([
    {
      type: 'input',
      name: 'year',
      message: `Pick a year (${CHAMPIONSHIP_FIRST_YEAR} - ${THIS_YEAR})`,
      validate: year => {
        if(!isYearValid(year)) {
          return "Come on, you really think I'm not validating your input? 😂" 
        } else {
          return true 
        }
      }
    }
  ])

  const { year: to } = await inquirer.prompt([
    {
      type: 'input',
      name: 'year',
      message: `Pick a year (${from} - ${THIS_YEAR})`,
      validate: year => {
        if(!isYearInRange(year, from, THIS_YEAR)) {
          return "Come on, you really think I'm not validating your input? 😂" 
        } else {
          return true 
        }
      }
    }
  ])
  return { from, to }
}

export async function pickPeriod() {
  const { period } = await inquirer.prompt([
    {
      type: 'list',
      name: 'period',
      message: 'Pick time period',
      choices: [
        {
          name: 'one year',
          value: PERIOD_COMMANDS.year
        },
        {
          name: 'range',
          value: PERIOD_COMMANDS.range
        },
        {
          name: 'just everything 😈',
          value: PERIOD_COMMANDS.everything
        }
      ],
    }
  ])
  return period
}