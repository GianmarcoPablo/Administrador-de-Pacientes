const mascotaInput = document.querySelector("#mascota")
const propietarioInput = document.querySelector("#propietario")
const telefonoInput = document.querySelector("#telefono")
const fechaInput = document.querySelector("#fecha")
const horaInput = document.querySelector("#hora")
const sintomasInput = document.querySelector("#sintomas")
const formulario = document.querySelector("#nueva-cita")
const contenedorCitas = document.querySelector("#citas")

eventListeners()
function eventListeners(){
    mascotaInput.addEventListener("input",datosCita)
    propietarioInput.addEventListener("input",datosCita)
    telefonoInput.addEventListener("input",datosCita)
    fechaInput.addEventListener("input",datosCita)
    horaInput.addEventListener("input",datosCita)
    sintomasInput.addEventListener("input",datosCita)
    formulario.addEventListener("submit",nuevaCita);
}

const citaObj = {
    mascota:"",
    propietario: "",
    telefono: "",
    fecha:"",
    hora:"",
    sintomas:""
}

class Citas{
    constructor(){
        this.citas = []
    }
    agregarCita(cita){
        this.citas =[...this.citas,cita]
        console.log(this.citas)
    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement("div")
        divMensaje.classList.add("text-center","alert","d-block","col-12")
        if(tipo === "error"){
            divMensaje.classList.add("alert-danger")
        }else{
            divMensaje.classList.add("alert-success")
        }
        divMensaje.textContent = mensaje
        document.querySelector("#contenido").insertBefore(divMensaje,document.querySelector(".agregar-cita"))

        setTimeout(() => {
            divMensaje.remove()
        }, 5000);
    }
    imprimirCitas(citas){ //
        this.limpiarHTML()
        citas.forEach(cita=>{
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita
            const divCita = document.createElement("div")
            divCita.classList.add("cita","p-3")
            divCita.dataset.id = id;
            
            const mascotaParrafo = document.createElement("h2")
            mascotaParrafo.classList.add("card-title","font-weight-bolder");
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement("p")
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `

            const telefonoParrafo = document.createElement("p")
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `

            const fechaParrafo = document.createElement("p")
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">fecha:</span> ${fecha}
            `

            const horaParrafo = document.createElement("p")
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">hora:</span> ${hora}
            `

            const sintomasParrafo = document.createElement("p")
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">sintomas:</span> ${sintomas}
            `

            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
        
            contenedorCitas.appendChild(divCita)
        })
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI()
const administrarCitas = new Citas()



function datosCita(e){
    citaObj[e.target.name] = e.target.value
}

function nuevaCita(e){
    e.preventDefault()
    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj

    if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === ""|| sintomas === ""){
        ui.imprimirAlerta("Todos los campos son obligatorios","error")
        return
    }
    citaObj.id = Date.now();
    administrarCitas.agregarCita({...citaObj})
    reiniciarObj()
    formulario.reset()
    const {citas} = administrarCitas
    ui.imprimirCitas(citas)  
}

function reiniciarObj(){
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}
