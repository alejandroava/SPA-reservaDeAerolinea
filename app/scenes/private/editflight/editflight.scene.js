import { NavigateTo } from "../../../Router"
import { FetchApi } from "../../../helpers/fetchapi"
import { RolValidate } from "../../../helpers/rolvalidate"
import styles from './editflight.styles.css'

export  function EditFlightScene() {
    let pageContent = ``
    let logic = () => { }
    const role = RolValidate()
    
    if (role === "Admin") {
        pageContent = `
            <div class='${styles.edit_container}'>
            <form id="editForm" class='${styles.form}'>
            <h2 class='${styles.edit_title}'>Ediar vuelo</h2>
                <label for="flightNumber">Numero de vuelo</label>
                <input type="text" id="flightNumber" name="flightNumber" placeholder="Ingrese numero de vuelo" readonly>
                <label for="origin">Origin de vuelo</label>
                <input type="text" id="origin" name="origin" placeholder="Ingrese el origin del vuelo" readonly>
                <label for="destination">Destino de vuelo</label>
                <input type='text' id='destination' readonly>
                <label for="departure">Fecha de salida del vuelo</label>
                <input type="date" id="departure" name="departure" placeholder="Ingrese fecha de salida del vuelo">
                <label for="arrival">Fecha de llegada del vuelo</label>
                <input type="date" id="arrival" name="arrival" placeholder="Ingrese fecha de llegada del vuelo">
                <label for="capacity">Capacidad del vuelo</label>
                <input type="number" id="capacity" name="capacity" placeholder="Ingrese Capacidad">
                <button type="submit" id="editButton" class='${styles.edit_button}'>Editar vuelo</button>
            </form>
            </div>
        `
        logic = async () => {
            const params = window.location.search
            const flightId = new URLSearchParams(params).get('flightId')
            console.log(flightId)

            const number = document.getElementById('flightNumber')
            const origin = document.getElementById('origin')
            const destination = document.getElementById('destination')
            const departure = document.getElementById('departure')
            const arrival = document.getElementById('arrival')
            const capacity = document.getElementById('capacity')
            const form = document.getElementById('editForm')

            const dataFlight = await FetchApi(`http://localhost:3000/flight/${flightId}`)
            console.log(dataFlight)
            number.value = dataFlight.number
            origin.value = dataFlight.origin
            destination.value= dataFlight.destination
            departure.value = dataFlight.departure
            arrival.value = dataFlight.arrival
            capacity.value = dataFlight.capacity
            console.log(departure)

            form.addEventListener('submit', async (e) => {
                e.preventDefault()
                await FetchApi(`http://localhost:3000/flight/${flightId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number: number.value,
                        origin: origin.value,
                        destination: destination.value,
                       departure: departure.value,
                        arrival: arrival.value,
                        capacity: capacity.value
                        

                    })

                })
                NavigateTo('/dashboard')

            })
          
        }
    } else {
        NavigateTo('/dashboard')
        return
    }
      return {
                pageContent,
                logic
            }
}