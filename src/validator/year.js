import { CHAMPIONSHIP_FIRST_YEAR, THIS_YEAR } from "../constant/year.js";

export const isYearValid = year => year >= CHAMPIONSHIP_FIRST_YEAR && year <= THIS_YEAR

export const isYearInRange = (year, from, to) => year >= from && year <= to