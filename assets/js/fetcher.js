// Funzione che sostituisce il contenuto HTML di tutti gli elementi con una determinata classe
function replaceInnerHTMLByClass(className, innerHTML) {
   var elements = document.getElementsByClassName(className);
   for (var i = 0; i < elements.length; i++) {
     elements[i].innerHTML = innerHTML;
   }
 }

// Input
const jsonFile = '../../data/data.json';
const ansaElementNumber = 0;
const infrastruttureElementNumber = 1;
 
// Esegui una richiesta HTTP per ottenere il file JSON
fetch(jsonFile)
  .then(response => response.json())
  .then(data =>
      {
         // Utilizza la variabile 'data' come desideri
         console.log(data);

         // Popolo email gruppo come link
         replaceInnerHTMLByClass("group-email",`<a href="mailto:${data.email}">${data.email}</a>`);

         // Popolo il numero di telefono gruppo come link
         var elements = document.getElementsByClassName("group-phone");
         const phone_number_without_space = data.phone.replace(/\s/g, '');
         for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = `<a href="tel:+39${phone_number_without_space}">${data.phone}</a>`;
            }
         
         // Popola PEC ANSA con 
         replaceInnerHTMLByClass("pec-ansa",data.company[ansaElementNumber].pec);

         // Popola PIVA ANSA
         replaceInnerHTMLByClass("piva-ansa",data.company[ansaElementNumber].piva);

         // Popola PEC Infrastrutture
         replaceInnerHTMLByClass("pec-infrastrutture",data.company[infrastruttureElementNumber].pec);

         // Popola PIVA Infrastrutture
         replaceInnerHTMLByClass("piva-infrastrutture",data.company[infrastruttureElementNumber].piva);
      })
  .catch(error => {
    console.error('Errore durante il recupero del file JSON:', error);
  });