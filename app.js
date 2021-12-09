import chalk from "chalk";
import inquirer from "inquirer";
import COMMANDS from "./src/commands/index.js";
import countriesCommandFlow from "./src/flow/countries.js";

async function run() {
  const command = await inquirer.prompt([
    {
      type: 'list',
      name: 'data',
      message: 'What data you want to collect?',
      choices: [
        {
          name: 'countries',
          value: COMMANDS.countries,
        },
        {
          name: 'drivers',
          value: COMMANDS.drivers,
        },
        {
          name: 'teams',
          value: COMMANDS.teams,
        },
        new inquirer.Separator(),
        {
          name: 'just everything 😈',
          value: COMMANDS.everything,
        }
      ],
    }
  ])
  switch(command.data) {
    case COMMANDS.countries:
      await countriesCommandFlow()
      break
    default:
      console.log(chalk.red("Unknown command"))
  }
}

run()