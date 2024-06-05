import { Router } from '../../../Router'
import { root } from './../../../helpers/index.root'
import styles from './register.styles.css'
export function RegisterScene() {
    root
    
    const registerForm = `
    <div class='${styles.register_container}'>
        <form action="" class='${styles.register_form}'>
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
            <p class='${styles.register_p}'>¿Ya esta registrado?<span class='${styles.register_login}'>Inciar sesion</span></p>
        </form>
    </div>
    `
    root.innerHTML =  registerForm
}