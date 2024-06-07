import { root } from "../../../helpers/index.root";
import styles from './NotFound.styles.css'

export function NotFound() {
    root;
    root.innerHTML = `
    
    <div class='${styles.container}'>
        <div class='${styles.not_found}'>
            <h1>Errro 404</h1>
            <p>Lo sentimos la Pagina no fue encontrada</p>
        </div>
    </div>    

    `
}