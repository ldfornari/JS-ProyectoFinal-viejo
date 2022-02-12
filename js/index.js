// Borrar localStorage
document.getElementById("clear").onclick = clear_me;
function clear_me() {
    localStorage.clear();
}

class Client {   // Creo la Clase Client
    constructor(number, name, lastName, age, brand, model, yearManu) {
        this.number = number;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.brand = brand;
        this.model = model;
        this.yearManu = yearManu;
    }
    antiquity() {
        const actualDate = new Date(); // Obtengo el año actual
        const actualYear = parseInt(actualDate.getFullYear());
        return (actualYear - this.yearManu);
    }
    ageDisc() {
        if (this.age > 39 && this.age < 56) {
            return 5;
        }
        else if (this.age > 55 && this.age < 66) {
            return 3;
        }
        else {
            return 0;
        }
    }
    brandDisc() {
        switch (this.brand.toLowerCase()) {
            case "ford": return 6;
            case "renault": return 7;
            case "fiat": return 5;
            case "chevrolet": return 4;
            default: return 0;
        }
    }
    brandModel() {
        return (this.brand + " " + this.model);
    }
}

let clients = []; // Creo al Array clients

//Declaro la url del archivo JSON local
const URLBrands = "brands.json";


let filter = [];

// creo el array para el select desde el archivo brands.JSON

$(document).ready(function () {
    $.getJSON(URLBrands, function (resp, status) {
        let myData = resp;
        $("#selectBrand").append(`<label for='inputBrand' class='form-label'>Marca del Vehículo *</label> `)
        $("#selectBrand").append(`<select name="select" class='form-control' id='inputBrand' required><option value=''>Seleccione una marca...</option>`)
        for (const data of myData) {
          $("#inputBrand").append(`<option value="${data.name}">${data.name}</option>`)
        }
        

        $("#selectBrand").append(`</select>`)
        localStorage.setItem('filter', 'Ford'); //Guardo el resultado en el local storage
        console.log(filter)
    });
  });


  const URLModels = "models.json";
  
// creo el array para el select desde el archivo models.JSON


  $(document).ready(function () {
    $.getJSON(URLModels, function (resp1, status) {
        
        console.log(resp1)

        let filter = localStorage.getItem('filter'); // si el storage esta cargado recupero los datos
    

        let myData1 = resp1;

        $("#selectModel").append(`<label for='inputModel' class='form-label'>Model *</label> `)
        $("#selectModel").append(`<select name="select" class='form-control' id='inputModel' required><option value=''>Seleccione el modelo...</option>`)
        for (const data1 of myData1) {
          $("#inputModel").append(`<option value="${data1.name}">${data1.name}</option>`)
        }
        $("#selectModel").append(`</select>`)
    });
  });
  
  
//Creo el formulario de carga de datos con el DOM dentro del div


$(document).ready(function () {
    setTimeout(function () {
        $("#containerForm").fadeIn(500);
    }, 500);
});

$("#containerForm").html(`<div id="divForm" class="sizeForm"><form class='row g-3' id='form'>
   <div class='col-md-5'>
   <label for='inputName' class='form-label'>Nombre *</label>
   <input type='text' class='form-control' id='inputName' required></div>
   <div class='col-md-5'>
   <label for='inputLastName' class='form-label'>Apellido *</label>
   <input type='text' class='form-control' id='inputLastName' required></div>
   <div class='col-md-2'>
   <label for='numbers' class='form-label'>Edad *</label>
   <input type='nuembers' class='form-control' id='inputAge' required></div>
   <div class='col-md-5' id="selectBrand"></div> 
   <div class='col-md-5' id='selectModel'></div>
   <div class='col-md-2'>
   <label for='numbers' class='form-label'>Año*</label>
   <input type='munbers' class='form-control' id='inputYearManu' required></div>
   <div class='d-grid gap-1 col-6 mx-auto'>
   <button class='btn btn-primary' type='submit'>Cotizar ahora</button></div>
   </form></div>`);

if (localStorage.getItem("clientsStorage") != null) {

    let result = localStorage.getItem('result'); // si el storage esta cargado recupero los datos
   
    $('#divForm').html(result);

}
else {
    $(document).ready(function () {
        $("#form").submit(function quote() {
            setTimeout(function () {
                $("#containerForm").fadeOut(500);
            }, 500);

                let client = new Client(1, document.getElementById("inputName").value, document.getElementById("inputLastName").value, document.getElementById("inputAge").value, document.getElementById("inputBrand").value, document.getElementById("inputModel").value, document.getElementById("inputYearManu").value);
                clients.push(client);

                localStorage.setItem('clientsStorage', JSON.stringify(clients)); // guardo los datos del cliente en el localSotrage

                clients = JSON.parse(localStorage.getItem('clientsStorage'));

                function price() { // Calculo el precio
                    switch (client.brandModel) {
                        case "Ford Fiesta": return Math.round((1500000 / 3500 * 30) + (client.antiquity() * 10));
                        case "Ford Focus": return Math.round((2000000 / 3500 * 20) + (client.antiquity() * 10));
                        case "Renault Duster": return Math.round((2000000 / 3500 * 20) + (client.antiquity() * 10));
                        case "Renault Captur": return Math.round((2500000 / 3500 * 20) + (client.antiquity() * 10));
                        case "Fiat Toro": return Math.round((3500000 / 3500 * 20) + (client.antiquity() * 10));
                        case "Fiat Cronos": return Math.round((2000000 / 3500 * 20) + (client.antiquity() * 10));
                        case "Chevrolet Spin": return Math.round((2500000 / 3500 * 20) + (client.antiquity() * 10));
                        case "Chevrolet Cruze": return Math.round((3500000 / 3500 * 20) + (client.antiquity() * 10));
                        default: return Math.round((2000000 / 3500 * 20) + (client.antiquity() * 10));
                    }
                }
                function finalPrice() {    // precio final con descuentos
                    return Math.round(price() - ((price() * (client.ageDisc() + client.brandDisc())) / 100));

                }

                function show() { // Muestro los valores de acuerdo con las bonificaciones
                    if (client.brandDisc() > 0 && client.ageDisc() > 0) {
                        $('#customerResponse').html(result = "Estimado " + client.name + " " + client.lastName + " para su vehículo " + client.brandModel() + " del año " + client.yearManu + " tiene un descuento del " + client.brandDisc() + " % sobre el precio de lista $" + price() + '\n' + "Además por tener " + client.age + " años de edad, posee una bonificación extra del " + client.ageDisc() + "%" + '\n' + "Obteniendo un descuento TOTAL de " + (client.ageDisc() + client.brandDisc()) + " % ¡¡Felicidades!!" + '\n' + '\n' + "El valor de la cuota mensual es de $ " + finalPrice());
                    } // descuento marca y edad

                    else if (client.brandDisc() > 0) {
                        $('#customerResponse').html(result = "Estimado " + client.name + " " + client.lastName + " para su vehículo " + client.brandModel() + " del año " + client.yearManu + " tiene un descuento del " + client.brandDisc() + "% sobre el precio de lista $" + price() + " ¡¡Felicidades!!" + '\n' + '\n' + "El valor de la cuota mensual es de $ " + finalPrice());
                    } //descuento por marca

                    else if (client.ageDisc() > 0) {
                        $('#customerResponse').html(result = "Estimado " + client.name + " " + client.lastName + " por tener " + client.age + " años de edad, posees un descuento del " + client.ageDisc() + "% para su vehículo " + client.brandModel() + " del año " + client.yearManu + " sobre el precio de lista $" + price() + " ¡¡Felicidades!!" + '\n' + '\n' + "El valor de la cuota mensual es de $ " + finalPrice());
                    } // descuento por edad

                    else {
                        $('#customerResponse').html(result = "Estimado " + client.name + " " + client.lastName + " su vehículo " + client.brandModel() + " del año " + client.yearManu + " por el momento NO tiene descuento disponible, el valor de la cuota mensual es de $ " + finalPrice());
                    } // sin descuento

                    localStorage.setItem('result', result); //Guardo el resultado en el local storage

                
                }

                show();

            }
        );
    });
}