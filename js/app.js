// Constantes.
const currency1_one = document.getElementById('currency-one');
const currency2_two = document.getElementById('currency-two');
const amount1_one = document.getElementById('amount-one');
const amount2_two = document.getElementById('amount-two');

const rate1 = document.getElementById('rate');
const swap = document.getElementById('swap');

// Funcion Fetch del tipo de cambio y modifica el DOM
const  calculate = () => {
  const currency_one = currency1_one.value;
  const currency_two = currency2_two.value;
   
  // Api con un JSON donde se guardan las monedas.
   fetch(`https://v6.exchangerate-api.com/v6/4fe08acae97afd8c8ff37b7e/latest/${currency_one}`)
   .then((res) => res.json())
   .then((data) => {

     const rate = data.conversion_rates[currency_two];
     rate1.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

     amount2_two.value = (amount1_one.value * rate).toFixed(2);

   });
}

// Event listeners
currency1_one.addEventListener('change', calculate);
currency2_two.addEventListener('change', calculate);
amount1_one.addEventListener('input', calculate);
amount2_two.addEventListener('input', calculate);

// Evento donde se intercambian de lugar las monedas.
swap.addEventListener('click', () => {
    const temp = currency1_one.value;
    currency1_one.value = currency2_two.value;
    currency2_two.value = temp;
    calculate();
});


calculate();


// Local Storage y SweetAlert

function storage(){
swal("Choose an Option.", {
  buttons: {
    cancel: "Cancel",
    set: {
      text: "Save on Storage",
      value: "setstorage",
    },
    get: {
      text: "Get from Storage",
      value: "getstorage",
    },
  },
})
.then((value) => {
  let rateStorage = JSON.stringify(`Box1: ${amount1_one.value} , Box2: ${amount2_two.value}`)
  switch (value) {
 
    // Almacenar datos en el storage.
    case "setstorage": localStorage.setItem( 'rate' , rateStorage);
      swal("Succefully Saved!");
      break;
     
    // Obtener datos del storage mediante un console.log.
    case "getstorage": localStorage.getItem('rate');
      swal(rateStorage);
      break;
 
    default:
      break;
  }
});
}