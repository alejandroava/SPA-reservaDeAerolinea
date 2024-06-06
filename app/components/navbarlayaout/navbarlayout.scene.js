import { root } from "../../helpers/index.root";

export function NavbarLayaoutScene(pageContent,logic) {
    root;
    root.innerHTML = `
    <nav>
        <a>Reservas</a>
    </nav>
    ${pageContent}
    `
    logic()
}