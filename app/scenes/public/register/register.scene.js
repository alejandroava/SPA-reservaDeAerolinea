import { NavigateTo, Router } from '../../../Router'
import { root } from './../../../helpers/index.root'
import styles from './register.styles.css'
import { FetchApi } from '../../../helpers/fetchapi'
import { EmailValidator } from '../../../helpers/emailvalidator'
export function RegisterScene() {
    root
    
    const registerForm = `
    <div class='${styles.register_container}'>
        <form action="" class='${styles.register_form}' id='registerForm'>
            <h2 class='${styles.register_title}'>Registro</h2>
            <label for="name" class='${styles.register_label}'>Nombre</label>
            <input type="text" placeholder="Escribe tu nombre" id="name" class='${styles.register_input}'>
            <label for="email" class='${styles.register_label}'>Correo electronico</label>
            <input type="email" placeholder="correo@ejemplo.com" id="email" class='${styles.register_input}'>
            <label for="date" class='${styles.register_label}'>Fecha de nacimiento</label>
            <input type="date" placeholder="Fecha de nacimiento" id="date" class='${styles.register_input}'>
            <label for="password" class='${styles.register_label}'>Ingrese contraseña</label>
            <input type="password" placeholder="Contraseña" id="password" class='${styles.register_input}'>
            <button class='${styles.register_button}' type='submit'>Registrarse</button>
            <p class='${styles.register_p}'>¿Ya esta registrado?<span class='${styles.register_login}' id='registerLogin'>Inciar sesion</span></p>
        </form>
    </div>
    `
    root.innerHTML = registerForm
    document.getElementById('registerLogin').addEventListener('click', () => {
        NavigateTo('/login')
    })
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const date = document.getElementById('date').value
        const password = document.getElementById('password').value

        if (!name) {
            alert('Debes escribir tu nombre')
            document.getElementById('name').focus()
            return
        }
        
        if (!email) {
            alert('Debes escribir tu email')
            document.getElementById('email').focus()
            return
        }
        if (!EmailValidator(email)) {
            alert('Ingresa un email valido')
            document.getElementById('email').focus()
            return
        } else {
            console.log('email correcto')
        }
        
        if(!date) {
            alert('Debes ingresar una fecha')
            document.getElementById('date').focus()
            return
        }
        
        if (!password) {
            alert('Debes escribir una contraseña')
            document.getElementById('password').focus()
            return
        }
        
        const userCretaed = await FetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                date,
                password,
                roleId: 2
            })
            
        })
        if (userCretaed) {
            alert('Registro con exito')
            NavigateTo('/login')
        }
        
    })
}