import { NavigateTo } from "../../../Router"
import { FetchApi } from "../../../helpers/fetchapi"
import { RolValidate } from "../../../helpers/rolvalidate"

export function EditFlightScene() {
    let pageContent = ``
    let logic = () => { }
    const role = RolValidate()
    
    if (role === "Admin") {
        pageContent = `
            <div>
            <form id="editForm">
                <label for="departure">Fecha de salida del vuelo</label>
                <input type="date" id="departure" name="departure" placeholder="Ingrese fecha de salida del vuelo">
                <label for="arrival">Fecha de llegada del vuelo</label>
                <input type="date" id="arrival" name="arrival" placeholder="Ingrese fecha de llegada del vuelo">
                <label for="capacity">Capacidad del vuelo</label>
                <input type="number" id="capacity" name="capacity" placeholder="Ingrese Capacidad">
                <button type="submit" id="editButton">Editar vuelo</button>
            </form>
            </div>
        `
        logic = async () => {
            const params = window.location.search
            const flightId = new URLSearchParams(params).get('flightId')
            const departure = document.getElementById('departure')
            const arrival = document.getElementById('arrival')
            const capacity = document.getElementById('capacity')
            const form = document.getElementById('editForm')

            const dataFlight = await FetchApi(`http://localhost:3000/flight/${flightId}`)
            console.log(dataFlight)
            departure.value = dataFlight.departure
            arrival.value = dataFlight.arrival
            capacity.value = dataFlight.capacity

            form.addEventListener('submit', async (e) => {
                e.preventDefault()
                await FetchApi(`http://localhost:3000/flight/${flightId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        departure: departure.value,
                        arrival: arrival.value,
                        capacity: capacity.value

                    })

                })

            })
          
        }
    } else {
        NavigateTo('/dashboard')
    }
      return {
                pageContent,
                logic
            }
}