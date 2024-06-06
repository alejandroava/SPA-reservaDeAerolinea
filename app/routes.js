import { RegisterScene } from "./scenes/public/register";
import { LoginScene } from "./scenes/public/login/login.scene";
import { DashboardScene } from "./scenes/private/dashboard/dashboard.scene";
import { CreateFlightScene } from "./scenes/private/createflight/createflight.scene";

export const routes = {
    public: [
        { path: '/register', scene: RegisterScene },
        { path: '/login', scene: LoginScene },
    ],
    private: [
        { path: '/dashboard', scene: DashboardScene },
        {path: '/dashboard/flight/create', scene: CreateFlightScene}
    ]
}