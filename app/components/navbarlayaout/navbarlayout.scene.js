import { NavigateTo } from "../../Router";
import { root } from "../../helpers/index.root";
import styles from './navbarlayout.styles.css'

export function NavbarLayaoutScene(pageContent,logic) {
    root;
    root.innerHTML = `
    <nav class='${styles.navbar}'>
        <ul class='${styles.navbar_list}'>
            <div class='${styles.navbar_home}'>
                <li>SPA <span class='${styles.logo}'>Aero</span>linea<li>
                <li><a class='${styles.home}' id='home'>Home</a></li>
            </div>
            <li><a id='logout' class='${styles.logout}'>Logout</a></li>
        </ul>    
        
    </nav>
    ${pageContent}
    `
    logic()
    const home = document.getElementById('home').addEventListener('click', () => {
        NavigateTo('/dashboard')
    })
    const logout = document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('role')
        NavigateTo('/login')
    })
}