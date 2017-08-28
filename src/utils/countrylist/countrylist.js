import CountryList from 'country-list'
export const COUNTRY_LIST = CountryList().getNames().map((val) => {
  return {label: val, value: val}
})
