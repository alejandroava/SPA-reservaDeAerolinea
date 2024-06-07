import { NavigateTo } from "../../../Router";
import { FetchApi } from "../../../helpers/fetchapi";
import { RolValidate } from "../../../helpers/rolvalidate";
import styles from './dashboard.styles.css'

export function DashboardScene() {
    const role = RolValidate()
    console.log('mirole', role)
    let pageContent = ''
    let logic = () => {}

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
                                <button type="button" class='edit_button' data-id="${flight.id}">Editar</button>
                                <button id='deleteFlight' class='delete_buttons' type="button" data-id="${flight.id}">Eliminar</button>
                            </div>
                        </article>
                    </div>
                `;
            });
            const editButtons = document.querySelectorAll('.edit_button').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const flightId = e.target.getAttribute('data-id')
                    NavigateTo(`/dashboard/flight/edit?${flightId}`)
                })
            })
            const deleteButtons = document.querySelectorAll('.delete_buttons').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const flightId = e.target.getAttribute('data-id')
                    await FetchApi(`http://localhost:3000/flight/${flightId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                })

            });
        }
    } else if (role === "User") {
            pageContent = `
            <h1>Vuelos actuales</h1>
            <div class='${styles.container}' id='flightsContainer'></div>
        `;
            logic = async () => {
            
                const cards = document.getElementById('flightsContainer');
                const dataFlight = await FetchApi('http://localhost:3000/flight');
                dataFlight.forEach(flight => {
                    cards.innerHTML += `    
                    <div class='${styles.cards_container}'>
                        <article class='${styles.card}'>
                            <h2 class='${styles.card_title}'>Informacion del vuelo</h2>
                            <p>Numero de vuelo: <span id="flightNumber">${flight.number}</span></p>
                            <p>Origen: <span id="origin">${flight.origin}</span></p>
                            <p>Destino: <span id="destination">${flight.destination}</span></p>
                            <p>Fecha de salida: <span id="departure">${flight.departure}</span></p>
                            <p>Fecha de llegada: <span id="arrival">${flight.arrival}</span></p>
                            <p>Capcidad: <span id="capacity">${flight.capacity}</span></p>
                            <div class='${styles.reservation_button}'>
                                <button id='reservationButton' class='reservationButtons' type="button" data-id="${flight.id}">Reservar</button>
                            </div>
                        </article>
                    </div>
                `;
                });
                const reservationButtons = document.querySelectorAll('.reservationButtons').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const confirmReservation = confirm('¿Esta seguro de hacer la reservar?')
                        if (!confirmReservation) {
                            return;
                        }
                        const flightId = e.target.getAttribute('data-id')
                        console.log('este es flight', flightId)
                        const users = await FetchApi('http://localhost:3000/users')
                        const emailUser = localStorage.getItem('email')
                        console.log(emailUser)
                        const user = users.find(user => user.email === emailUser)

                        if (user) {
                            const userId = user.id
                            console.log('soy userid', userId)
                            const now = new Date();
                            const bookingDate = now.toLocaleString()
                
                            await FetchApi('http://localhost:3000/booking', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    flightId,
                                    userId,
                                    bookingDate,

                                })
                            })
                        } else {
                            alert('usuario no encontrado')
                        }
               
                    })
                });
            }
        } else {
            pageContent = '<h1>No esta autorizado</h1>';
            logic = () => {
                console.error('role invalido');
            };

        
        }
        return {
            pageContent,
            logic
        };
}

