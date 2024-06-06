import { NavbarLayaoutScene } from "./components/navbarlayaout/navbarlayout.scene"
import { routes } from "./routes"
export function Router() {
    alert('desde router')
    const path = window.location.pathname
    
    const publicRoute = routes.public.find(route => route.path === path)
    const privateRoute = routes.private.find(route => route.path === path)
    
    if (publicRoute) {
        publicRoute.scene()
        return
    }
    if (privateRoute) {
        if(localStorage.getItem('token')){
            const { pageContent, logic } = privateRoute.scene()
            NavbarLayaoutScene(pageContent,logic)
        }
    }

}

export function NavigateTo (path) {
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}