import { NavigateTo } from "../../../Router";
import { EmailValidator } from "../../../helpers/emailvalidator";
import { FetchApi } from "../../../helpers/fetchapi";
import { root } from "../../../helpers/index.root"
import styles from './login.styles.css'
export function LoginScene() {
    root;
    const loginForm = `
         <div class='${styles.login_container}'>
        <form action="" class='${styles.login_form}' id='loginForm'>
            <h2 class='${styles.login_title}'>Login</h2>
            <label for="rolUser" class='${styles.login_label}'>Seleccione un usuario:</label>
            <select class='${styles.login_option_user}' id='rolUser'>
                <option disabled>options</option>
                <option>User</option>
                <option>Admin</option>
            </select>
            <label for="email" class='${styles.login_label}'>Correo electronico</label>
            <input type="email" placeholder="correo@ejemplo.com" id="email" class='${styles.login_input}'>
            <label for="password" class='${styles.login_label}'>Ingrese contraseña</label>
            <input type="password" placeholder="Contraseña" id="password" class='${styles.login_input}'>
            <button class='${styles.login_button}' type='submit'>Entrar</button>
            <p class='${styles.login_p}'>¿Aun no esta registrado?<span class='${styles.login_login}' id='loginRegister'>Registrarse</span></p>
        </form>
    </div>
    `
    root.innerHTML = loginForm
    document.getElementById('loginRegister').addEventListener('click',()=> {
        NavigateTo('/register')
    })
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        let rolUser = document.getElementById('rolUser').value
        console.log(rolUser)

        if (!email) {
            alert('Ingrese su correo electronico')
            document.getElementById('email').focus()
            return
        }
        if (!EmailValidator(email)) {
            alert('Ingrese un correo electronico valido')
            return
        }
        if (!password) {
            alert('Ingrese su contraseña')
            document.getElementById('password').focus()
            return
        }

        // if (!rolUser) {
        //     alert('Seleccione una opción')
        //     document.getElementById('rolUser').focus()
        //     return
        // }
        if (rolUser === 'Admin') {
            rolUser = 1
            const users = await FetchApi('http://localhost:3000/users')
            console.log(users)
            const validateUser = users.find(user => user.email === email && user.password === password && user.roleId === 1)
            if (validateUser) {
                const token = Math.random().toString(36).substring(2)
                localStorage.setItem('token', token)
                localStorage.setItem('role', rolUser)
                NavigateTo('/dashboard')
                return
            } else {
                alert('Credenciales incorrectas')
            }
        }
        
        if (rolUser === 'User') {
            rolUser = '2'
            const users = await FetchApi('http://localhost:3000/users')
            const validateUser = users.find(user => user.email === email && user.password === password && user.roleId === 2)
            if (validateUser) {
                
                const token = Math.random().toString(36).substring(2)
                localStorage.setItem('token', token)
                localStorage.setItem('role', rolUser)
                NavigateTo('/dashboard')
            }else {
                alert('Credenciales incorrectas')
            }
        }

    })
}
