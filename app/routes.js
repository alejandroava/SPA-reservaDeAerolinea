import { RegisterScene } from "./scenes/public/register";
import { LoginScene } from "./scenes/public/login/login.scene";

export const routes = {
    public: [
        { path: '/register', scene: RegisterScene },
        { path: '/login', scene: LoginScene },
    ]
}