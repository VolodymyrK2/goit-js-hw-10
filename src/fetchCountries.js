const BASE_URL = "https://restcountries.com/v3.1/name/";
const FILTERED_FIELDS = 'name,capital,population,flags,languages';
export function fetchCountries(name) {
    return fetch(BASE_URL+`${name}?fields=`+FILTERED_FIELDS)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}