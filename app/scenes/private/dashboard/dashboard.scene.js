import { NavigateTo } from "../../../Router";
import { FetchApi } from "../../../helpers/fetchapi";
import { RolValidate } from "../../../helpers/rolvalidate";
import styles from './dashboard.styles.css'

export function DashboardScene() {
    const role = RolValidate()
    console.log('mirole',role)
    let pageContent=''
    let logic = () =>{}

   if (role === "Admin") {
        pageContent = `
            <h1 class='${styles.dashboard_title}'>Vuelos actuales</h1>
            <div id='flightsContainer'></div>
            <button type='button' id='buttonCreate' class='${styles.dashboard_button}'>Crear vuelo</button
        `;
       logic = async () => {
           document.getElementById('buttonCreate').addEventListener('click', () => {
                NavigateTo('/dashboard/flight/create')
            })
            const cards = document.getElementById('flightsContainer');
            const dataFlight = await FetchApi('http://localhost:3000/flight');
            dataFlight.forEach(flight => {
                cards.innerHTML += `    
                    <div class='${styles.dashboard_container_cards}'>
                        <article class='${styles.dashboard_card_container}'>
                            <h2 class='${styles.dashboard_card_title}'>Informacion del vuelo</h2>
                            <p>Numero de vuelo: <span id="flight-number">${flight.number}</span></p>
                            <p>Origen: <span id="origin">${flight.origin}</span></p>
                            <p>Destino: <span id="destination">${flight.destination}</span></p>
                            <p>Fecha de salida: <span id="departure">${flight.departure}</span></p>
                            <p>Fecha de llegada: <span id="arrival">${flight.arrival}</span></p>
                            <p>Capcidad: <span id="capacity">${flight.capacity}</span></p>
                            <div>
                                <button type="button" data-id="${flight.id}">Editar</button>
                                <button type="button" data-id="${flight.id}">Eliminar</button>
                            </div>
                        </article>
                    </div>
                `;
            });
        };
    } else if (role === "User") {
        pageContent = `
            <h1>Vuelos actuales</h1>
            <div id='flightsContainer'></div>
        `;
        logic = async () => {
            const cards = document.getElementById('flightsContainer');
            const dataFlight = await FetchApi('http://localhost:3000/flight');
            dataFlight.forEach(flight => {
                cards.innerHTML += `    
                    <div>
                        <article>
                            <h2>Informacion del vuelo</h2>
                            <p>Numero de vuelo: <span id="flight-number">${flight.number}</span></p>
                            <p>Origen: <span id="origin">${flight.origin}</span></p>
                            <p>Destino: <span id="destination">${flight.destination}</span></p>
                            <p>Fecha de salida: <span id="departure">${flight.departure}</span></p>
                            <p>Fecha de llegada: <span id="arrival">${flight.arrival}</span></p>
                            <p>Capcidad: <span id="capacity">${flight.capacity}</span></p>
                            <div>
                                <button type="button" data-id="${flight.id}">Reservar</button>
                            </div>
                        </article>
                    </div>
                `;
            });
        };
    } else {
        // In case role is undefined or invalid
        pageContent = '<h1>Unauthorized</h1>';
        logic = () => {
            console.error('Invalid role');
        };
    }

    return {
        pageContent,
        logic
    };
}
