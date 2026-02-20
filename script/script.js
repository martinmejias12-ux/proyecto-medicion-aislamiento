(function () {   

    document.addEventListener('DOMContentLoaded', () => {

        // Traerá todos los datos clave,valor de la pagina calculo_aislamiento
        const todosLosCampos = document.querySelectorAll('#calculo-aislamiento input, #calculo-aislamiento select');


        // llevamos todos los datos obtenidos a un array
        const listaCampos = Array.from(todosLosCampos);        
        
        
        // imprimimos loa cantidad de datos para validar si los esta trayendo
        console.log("Campos detectados para navegar:", listaCampos.length);


        /**
         * función para cargar los datos del localStorage
         */
        const cargarDatos = () => {
            listaCampos.forEach((campo) => {
                // Buscamos si hay un valor guardado usando el 'id' del campo como llave
                const valorGuardado = localStorage.getItem(campo.id);
                if (valorGuardado !== null) {
                    campo.value = valorGuardado;
                }
            });
            console.log("Datos recuperados del LocalStorage.");
        };

        // Ejecutamos la carga de datos al abrir la página
        cargarDatos();


        /**
         * Aquí es donde vamos a iterar cada elemento de la lista de datos para guardarlos en el 
         * localStorage 
         * Y para navegar por cada elemento cuando estoy ingresando los datos
         */
        listaCampos.forEach((elemento, indice) => {

            // A. GUARDADO AUTOMÁTICO: Cada vez que el usuario escribe o cambia algo
            elemento.addEventListener('input', () => {
                // Guardamos el valor actual usando el ID como referencia única
                localStorage.setItem(elemento.id, elemento.value);
            });

            

            elemento.addEventListener('keydown', function(evento) {

                // Verificamos si es la tecla Enter
                if (evento.key === 'Enter') {
                    
                    // Evitamos que el Enter haga un salto de línea o envíe el formulario
                    evento.preventDefault();

                    // Calculamos el siguiente índice
                    let siguienteIndice = indice + 1;

                    // par cuando llegamos al final de la lista volvemos al principio
                    if (siguienteIndice >= listaCampos.length) {
                        siguienteIndice = 0;
                    }

                    // Obtenemos el próximo elemento
                    const proximoElemento = listaCampos[siguienteIndice];

                    // Aplicamos el foco
                    if (proximoElemento instanceof HTMLElement) {
                        proximoElemento.focus();
                    }
                }



                



                

                
            });
        });



        const botonCalcular = document.getElementById('calcular');
        const tipoEquipo = document.getElementById('tipo-equipo');

        
        
        botonCalcular.addEventListener('click', ()=>{

            let temperaturaReferencia;

            switch (tipoEquipo.value) {
                case "MOTOR":

                    temperaturaReferencia = 40;
                    
                    break;

                case "TRANSFORMADOR":

                    temperaturaReferencia = 20;
                    
                    break;
                    
            
                default:
                    break;
            }

            console.log(temperaturaReferencia);           


            const datoTemperatura = document.getElementById('temperatura');
            let valorTemperatura = parseFloat(datoTemperatura.value)
            console.log(valorTemperatura);

            if (valorTemperatura.value === "" || Number.isNaN(valorTemperatura)) {

                alert('El campo de "Temperatura de la carcasa del motor" no debe estar vacío');
                
                //console.log('debe tener un numero');
                
            }else{

                let factorCorreccionTemperatura = 0.5 ** ((temperaturaReferencia-valorTemperatura)/10)

                factorCorreccionTemperatura = Math.round(factorCorreccionTemperatura*1000)/1000

                console.log(factorCorreccionTemperatura);


            }

            



        });



        


        const borrarDatos =document.getElementById('reset');
    
        borrarDatos.addEventListener('click', ()=>{

            listaCampos.forEach(elemento =>{

                localStorage.removeItem(elemento.id);
            });

            listaCampos.forEach(elemento => {

                elemento.value = "";
                
            });

        

        
        });






    






    


    });




})(); // La función se ejecuta inmediatamente
