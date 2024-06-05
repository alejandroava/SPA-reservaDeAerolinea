import { routes } from "./routes"
export function Router() {
    alert('desde router')
    const path = window.location.pathname
    
    const publicRoute = routes.public.find(route => route.path === path)
    
    if (publicRoute) {
        publicRoute.scene()
        return
    }

}

export function NavigateTo (path) {
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}