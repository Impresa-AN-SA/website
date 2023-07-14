function replaceInnerHTMLByClass(className, innerHTML) {
   var elements = document.getElementsByClassName(className);
   for (var i = 0; i < elements.length; i++) {
     elements[i].innerHTML = innerHTML;
   }
 }
 
// Esegui una richiesta HTTP per ottenere il file JSON
fetch('../../data/data.json')
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
         replaceInnerHTMLByClass("pec-ansa",data.company[0].pec);

         // Popola PIVA ANSA
         replaceInnerHTMLByClass("piva-ansa",data.company[0].piva);
      })
  .catch(error => {
    console.error('Errore durante il recupero del file JSON:', error);
  });



