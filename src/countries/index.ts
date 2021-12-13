import fetch, { Response } from 'node-fetch'
import { COUNTRIES_API_BASE_URL } from '../constant/url.js'

interface Country {
  field: string,
  cioc: string,
  name: {
    common: string
  },
  flags: Array<string>
}

export async function collectCountries() {
  const response: Response = await fetch(`${COUNTRIES_API_BASE_URL}/all?fields=name,flags,cioc`)
  const data: Array<Country> = (await response.json() as Array<Country>)
  return data
    .filter( country => country.cioc?.length === 3)
    .map( country => ({ code: country.cioc, name: country.name.common, flag: country.flags[0] }))
}
