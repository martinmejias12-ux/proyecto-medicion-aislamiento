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


        /**Para capturar datos de la pagina de HTML */
        const botonCalcular = document.getElementById('calcular');
        const tipoEquipo = document.getElementById('tipo-equipo');

        
        /**
         * Lineas de programa para ejecutar cuando se presiona el botón de Calcular 
         */
        botonCalcular.addEventListener('click', ()=>{

            
            /**
             * Dependiendo del tipo de equipo que se seleccione se determinara el tipo de temperatura 
             * de referencia a tomar en cuenta.
             * 
             */
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


            /**
             * Lineas del programa para capturar el valor de temperatura de la carcasa del motor
             * Adicionalmente se coloca una señal de alerta para indicar que ese campo no debe 
             * estar vacío.
             * También con el valor de la temperatura se determino el factor de corrección por temperatura
             */
            const datoTemperatura = document.getElementById('temperatura');
            let valorTemperatura = parseFloat(datoTemperatura.value)
            console.log(valorTemperatura);

            let factorCorreccionTemperatura = 0;

            if (Number.isNaN(valorTemperatura)) {

                alert('El campo de "Temperatura de la carcasa del motor" no debe estar vacío');
                
                //console.log('debe tener un numero');
                
            }else{

                factorCorreccionTemperatura = 0.5 ** ((temperaturaReferencia-valorTemperatura)/10)

                factorCorreccionTemperatura = Math.round(factorCorreccionTemperatura*100)/100

                console.log(factorCorreccionTemperatura);


            }


            const datoMedicionAislamiento30seg= document.getElementById('valor30seg');
            let valorMedicionAislamiento30seg = parseFloat(datoMedicionAislamiento30seg.value);

            const datoMedicionAislamiento1min= document.getElementById('valor1min');
            let valorMedicionAislamiento1min = parseFloat(datoMedicionAislamiento1min.value);

            const datoMedicionAislamiento10min= document.getElementById('valor10min');
            let valorMedicionAislamiento10min = parseFloat(datoMedicionAislamiento10min.value);

            
            console.log(valorMedicionAislamiento30seg);
            console.log(valorMedicionAislamiento1min);
            console.log(valorMedicionAislamiento10min);

            
        
            /**
             * Para el calculo del valor de aislamiento
             */

            let valorCorregidoLectura1min = 0;
            if (Number.isNaN(valorMedicionAislamiento1min)) {

                alert('El campo de la lectura medida al 1 min esta vacío');
                
                
                
            }else{

                valorCorregidoLectura1min = factorCorreccionTemperatura * valorMedicionAislamiento1min;

                valorCorregidoLectura1min = Math.round(valorCorregidoLectura1min*100)/100

                console.log(valorCorregidoLectura1min);


            }


            /**
             * Para el calculo del indice de absorción dieléctrica (DA)
             */

            let valorIndiceAbsorcionDielectrica = 0;
            if (Number.isNaN(valorMedicionAislamiento30seg)) {

                alert('El campo de la lectura medida a los 30 seg esta vacío');
                
                
                
            }else{

                valorIndiceAbsorcionDielectrica =  valorMedicionAislamiento1min/valorMedicionAislamiento30seg;

                valorIndiceAbsorcionDielectrica = Math.round(valorIndiceAbsorcionDielectrica*100)/100

                console.log(valorIndiceAbsorcionDielectrica);


            }


            /**
             * Para el calculo del indice de polarización (IP)
             */

            let valorIndicePolarizacion = 0;
            if (Number.isNaN(valorMedicionAislamiento10min)) {

                alert('El campo de la lectura medida a los 10 min esta vacío');
                
                
                
            }else{

                valorIndicePolarizacion =  valorMedicionAislamiento10min/valorMedicionAislamiento1min;

                valorIndicePolarizacion = Math.round(valorIndicePolarizacion*100)/100

                console.log(valorIndicePolarizacion);


            }




        });



        

        /**
         * Programa para borrar los datos del localStorage y de la pantalla
         */
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
