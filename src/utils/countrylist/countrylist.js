/**
* Retrieves a list of countrys using the npm package country-list https://www.npmjs.com/package/country-list
*/
import CountryList from 'country-list'
export const COUNTRY_LIST = CountryList().getNames().map((val) => {
  return {label: val, value: val}
})
