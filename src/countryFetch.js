import Notiflix from 'notiflix';
export const BASIC_URL = 'https://restcountries.com/v3.1/name/';
export const MY_FILTERS = '?fields=name,capital,population,flags,languages';

export function countryFetch(coutryName) {
   if (coutryName.length > 0) {
      return fetch(`${BASIC_URL}${coutryName}${MY_FILTERS}`).then(responce => {
         if (!responce.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
         }
         return responce.json();
      });
   }

   // .catch(err => console.log(err));
}

// export function countryFetch(countryName) {
//    return fetch(`${BASIC_URL}${countryName}${MY_FILTERS}`)
//       .then(data => {
//          return data.json();
//       })
//       .catch(err => console.log(err));
// }

// function countryFetch() {
//    //    return fetch(`${BASIC_URL}${countryName}${MY_FILTERS}`)
//    //       .then(data => {
//    //          return data.json();
//    //       })
//    //       .catch(err => console.log(err));
//    console.log(5);
// }
