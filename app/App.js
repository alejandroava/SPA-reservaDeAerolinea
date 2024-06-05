import { Router } from "./Router"
import {root} from './helpers/index.root.js'
export function App() {
     if (!root) {
        throw new Error ('Error con la pagina')
    }
    Router()
}