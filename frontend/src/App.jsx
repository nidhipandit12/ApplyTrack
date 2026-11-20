import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function App() {
    const [authData, setAuthData] = useState(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        return token && user
            ? { token, user: JSON.parse(user) }
            : null;
    });

    const handleLogin = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuthData(data);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthData(null);
    };

    if (!authData) {
        return <Auth onLogin={handleLogin} />;
    }

    return (
        <>
            <Dashboard
    user={authData.user}
    onLogout={handleLogout}
/>
        </>
    );
}

export default App;

