//Ejecutar códgio de JS cuando el dom este cargado
document.addEventListener("DOMContentLoaded", function(){

    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    //Seleccionamos los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#enviar-mail");
    const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]');
    const btnReset = document.querySelector('#enviar-mail button[type="reset"]');
    const spinner= document.querySelector("#spinner");
    
    //Agregamos la funcion de validar a los inputs
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);
    formulario.addEventListener("submit", enviarEmail);

    btnReset.addEventListener("click", function(e){
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add("flex")
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex")
            spinner.classList.add("hidden");
            resetFormulario();

            //Alerta de envio
            const alertaExito = document.createElement("P");

            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            alertaExito.textContent= "Mensaje enviado con exito";
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }
    
    function validar(e){
        //Validacion de campos
        if(e.target.value.trim() === ""){                          //Traversing para agregar alerta
            mostrarError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = ""; //Actualizar el objeto si borramos algo, si falla la validacion
            comprobarEmail();
            return; //Si es true, no ejecuta más nada
        }

        //Validacion de correo
        //Si es igual a email y la validacion falla
        if(e.target.id === "email" && !validarEmail(e.target.value)){
            email[e.target.name] = ""; //Actualizar el objeto si borramos algo
            comprobarEmail();
            return mostrarError("El email no es valido", e.target.parentElement);
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el objeto email
        comprobarEmail();
    }

    function mostrarError(mensaje, referencia){
        //Evitar repetición de alerta
        limpiarAlerta(referencia);

        const error = document.createElement("P");
        error.textContent = mensaje
        error.classList.add("bg-red-600", "text-white", "p-2", "mt-2", "text-center", "alerta", "rounded");
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        //referencia busca dentro del div
        const alerta = referencia.querySelector(".alerta");
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        //RE busca patrones de correo
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    //Toma todos los valores del objeto y los asigna a un arreglo
    function comprobarEmail(){
        //Retorna true si al menos uno esta vacio
        // console.log(email);
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50")
            btnSubmit.classList.add("cursor-not-allowed")
            btnSubmit.disabled = true;
        } else{
            btnSubmit.classList.remove("opacity-50")
            btnSubmit.classList.remove("cursor-not-allowed")
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario(){
        //Reiniciar formulario
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();
    }


})