import fetch from 'node-fetch'
import { COUNTRIES_API_BASE_URL } from '../constant/url.js'

export async function collectCountries() {
  const response = await fetch(`${COUNTRIES_API_BASE_URL}/all?fields=name,flags,cioc`)
  const data = await response.json()
  return data
    .filter( country => country.cioc?.length === 3)
    .map( country => ({ code: country.cioc, name: country.name.common, flag: country.flags[0] }))
}