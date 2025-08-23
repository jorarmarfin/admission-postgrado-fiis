import {Login} from "@/components";
import {PublicRoute} from "@/components/auths/public-route";

export default function LoginPage() {
    return (
        <PublicRoute>
            <Login/>
        </PublicRoute>
    );
}
