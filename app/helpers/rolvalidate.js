import { FetchApi } from "./fetchapi";

export function RolValidate() {
    const userRole = localStorage.getItem("role")
    if (userRole === "1") {
        return "Admin"
    }
        return "User"
}
