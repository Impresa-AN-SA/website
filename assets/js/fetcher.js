// Funzione che sostituisce il contenuto HTML di tutti gli elementi con una determinata classe
function replaceInnerHTMLByClass(className, innerHTML) 
  {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++)
      {
        elements[i].innerHTML = innerHTML;
      }
  }

// Funzione specifica per i numeri di telefono
function populatePhoneNumberByClass(className, number_with_space)
  {
    var elements = document.getElementsByClassName(className);
    var number_without_space = number_with_space.replace(/\s/g, '');
    for (var i = 0; i < elements.length; i++) 
      {
        elements[i].innerHTML = `<a href="tel:+39${number_without_space}">${number_with_space}</a>`;
      }
  }

// Funzione che aggiunge un href a tutti gli elementi con una determinata classe
function addHrefByClass(className, href)
  {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++)
      {
        elements[i].href = href;
      }
  }

// Inputs
const jsonFile = '../../data/data.json';
const ansaElementNumber = 0;
const infrastruttureElementNumber = 1;
const linkedinElementNumber = 0;
const mapsElementNumber = 1;
 
// Usa il file json per popolare i dati
fetch(jsonFile)
  .then(response => response.json())
  .then(data =>
    {
      // Popolo indirizzo
      replaceInnerHTMLByClass("group-office-address", `${data.company[infrastruttureElementNumber].address}, ${data.company[infrastruttureElementNumber].cap}<br>${data.company[infrastruttureElementNumber].city} (${data.company[infrastruttureElementNumber].province})`);

      // Popolo email gruppo come link
      replaceInnerHTMLByClass("group-email", `<a href="mailto:${data.email}">${data.email}</a>`);

      // Usa la funzione pupolatePhoneNumberByClass per popolare i numeri di telefono
      populatePhoneNumberByClass("group-phone", data.phone);
      populatePhoneNumberByClass("mobile-infrastrutture", data.company[infrastruttureElementNumber]['mobile-phone']);
      populatePhoneNumberByClass("mobile-ansa", data.company[ansaElementNumber]['mobile-phone']);

      // Popola PEC ANSA 
      replaceInnerHTMLByClass("pec-ansa", data.company[ansaElementNumber].pec);

      // Popola PEC Infrastrutture
      replaceInnerHTMLByClass("pec-infrastrutture", data.company[infrastruttureElementNumber].pec);

      // Popola PIVA ANSA
      replaceInnerHTMLByClass("piva-ansa", data.company[ansaElementNumber].piva);

      // Popola PIVA Infrastrutture
      replaceInnerHTMLByClass("piva-infrastrutture", data.company[infrastruttureElementNumber].piva);

      // Social: aggiungo href a tutti gli elementi con classe "group-github"
      addHrefByClass("group-github", `https://github.com/${data.github_organization}`);
      addHrefByClass("li-ansa", data.company[ansaElementNumber].social[linkedinElementNumber].url);
      addHrefByClass("li-infrastrutture", data.company[infrastruttureElementNumber].social[linkedinElementNumber].url);
      addHrefByClass("maps-ansa", data.company[ansaElementNumber].social[mapsElementNumber].url);
      addHrefByClass("maps-infrastrutture", data.company[infrastruttureElementNumber].social[mapsElementNumber].url);
    })
  .catch(error => {
    console.error('Errore durante il recupero del file JSON:', error);
  });