import { NavigateTo } from "../../../Router"
import { FetchApi } from "../../../helpers/fetchapi"
import { RolValidate } from "../../../helpers/rolvalidate"
import styles from './createflight.styles.css'

export function CreateFlightScene() {
    const role = RolValidate()
    
    let pageContent = ''
    let logic = () => { }
    if (role === "Admin") {
        pageContent = `
        <div class='${styles.create_container}'>
            <div class='${styles.create_info}'>
                <h1>Creacion de vuelos</h1>
                <p>Aqui puede cargar todos los vuelos que se mostraran para reservar</p>
            </div>
                <form id="createForm" class='${styles.create_form}'>
                    <h2 class='${styles.create_title}'>Crear un vuelo</h2>
                    <div>
                        <label for="flightNumber" class='${styles.create_label}'>Numero de vuelo</label>
                        <input type="number" class='${styles.create_input}' id="flightNumber" name="flightNumber" placeholder="Ingrese numero de vuelo">
                    </div>
                    <div>    
                        <label for="origin" class='${styles.create_label}'>Origin de vuelo</label>
                        <input type="text" class='${styles.create_input}'  id="origin" name="origin" placeholder="Ingrese el origin del vuelo">
                        <label for="destination" class='${styles.create_label}'>Destino de vuelo</label>
                        <input type="text" class='${styles.create_input}'  id="destination" name="destination" placeholder="Ingrese destino de vuelo">
                    </div>
                    <div>
                        <label for="departure" class='${styles.create_label}'>Fecha de salida del vuelo</label>
                        <input type="date" class='${styles.create_input}'  id="departure" name="departure" placeholder="Ingrese fecha de salida del vuelo">
                        <label for="arrival" class='${styles.create_label}'>Fecha de llegada del vuelo</label>
                        <input type="date" class='${styles.create_input}'  id="arrival" name="arrival" placeholder="Ingrese fecha de llegada del vuelo">
                    </div>
                        <label for="capacity" class='${styles.create_label}'>Capacidad de pasajeros</label>
                        <input type="number" class='${styles.create_capacity}'  id="capacity" name="capacity" placeholder="Ingrese la capacidad del vuelo">
                    <div>
                        <button type="submit" class='${styles.create_button}' id="createButton">Crear vuelo</button>
                    </div>
                </form>
            </div>
        `;
        logic = () => {
            document.getElementById('createForm').addEventListener('submit', async (e) => {
                e.preventDefault()
                const number = document.getElementById('flightNumber').value
                const origin = document.getElementById('origin').value
                const destination = document.getElementById('destination').value
                const departure = document.getElementById('departure').value
                const arrival = document.getElementById('arrival').value
                const capacity = document.getElementById('capacity').value

                if (!number) {
                    alert('Ingrese el numero de vuelo')
                    document.getElementById('flightNumber').focus()
                    return
                }
                if (!origin) {
                    alert('Ingrese el origin del vuelo')
                    document.getElementById('origin').focus()
                    return
                }
                if (!destination) {
                    alert('Ingrese el destino del vuelo')
                    document.getElementById('destination').focus()
                    return
                }
                if (!departure) {
                    alert('Ingrese la fecha de salida del vuelo')
                    document.getElementById('departure').focus()
                    return
                }
                if (!arrival) {
                    alert('Ingrese la fecha de llegada del vuelo')
                    document.getElementById('arrival').focus
                    return
                }
                if (!capacity) {
                    alert('Ingrese la capacidad del vuelo')
                    document.getElementById('capacity').focus
                    return
                }
                
                const createFlight = await FetchApi('http://localhost:3000/flight', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number,
                        origin,
                        destination,
                        departure,
                        arrival,
                        capacity
                    })
                })
                if (createFlight) {
                    alert('Vuelo creado con exito')
                    NavigateTo('/dashboard')
                }
                
            })
                
        }
            
    } else {
        NavigateTo('/dashboard')
       return
        // pageContent = '<h1>Unauthorized</h1>';
        // logic = () => {
        //     console.error('Invalid role');
        // };
    }
    return {
            pageContent,
            logic
            }
}