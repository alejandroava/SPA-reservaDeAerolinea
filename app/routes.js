import { RegisterScene } from "./scenes/public/register";
import { LoginScene } from "./scenes/public/login/login.scene";
import { DashboardScene } from "./scenes/private/dashboard/dashboard.scene";
import { CreateFlightScene } from "./scenes/private/createflight/createflight.scene";
import { NotFound } from "./scenes/public/not-found/notFound.scene";
import { EditFlightScene } from "./scenes/private/editflight/editflight.scene";

export const routes = {
    public: [
        { path: '/register', scene: RegisterScene },
        { path: '/login', scene: LoginScene },
        {path: '/not-found', scene: NotFound}
    ],
    private: [
        { path: '/dashboard', scene: DashboardScene },
        { path: '/dashboard/flight/create', scene: CreateFlightScene },
        { path: '/dashboard/flight/edit', scene: EditFlightScene}
    ]
}