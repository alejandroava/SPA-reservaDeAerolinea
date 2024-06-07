import { NavbarLayaoutScene } from "./components/navbarlayaout/navbarlayout.scene"
import { routes } from "./routes"
export function Router() {
    const path = window.location.pathname

    if (path === '/login' || path === '/register') {
        if (localStorage.getItem('token')) {
            NavigateTo('/dashboard')
            return
        }
    }
    
    const publicRoute = routes.public.find(route => route.path === path)
    const privateRoute = routes.private.find(route => route.path === path)
    
    if (publicRoute) {
        publicRoute.scene()
        return
    }
    if (privateRoute) {
        if(localStorage.getItem('token')){
            const { pageContent, logic } = privateRoute.scene()
            NavbarLayaoutScene(pageContent, logic)
            return
        }
    }
    NavigateTo('/not-found')

}

export function NavigateTo (path) {
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}