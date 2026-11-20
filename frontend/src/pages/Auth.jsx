import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import "../App.css";

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = isLogin
                ? await loginUser({
                    email: formData.email,
                    password: formData.password
                })
                : await registerUser(formData);

            onLogin(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>ApplyTrack<span>.</span></h1>
                <p className="auth-subtitle">
                    {isLogin
                        ? "Welcome back! Login to your account."
                        : "Create an account to get started."}
                </p>

                <div className="auth-tabs">
                    <button
                        className={isLogin ? "auth-tab active" : "auth-tab"}
                        onClick={() => {
                            setIsLogin(true);
                            setError("");
                        }}
                    >
                        Login
                    </button>

                    <button
                        className={!isLogin ? "auth-tab active" : "auth-tab"}
                        onClick={() => {
                            setIsLogin(false);
                            setError("");
                        }}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="auth-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Login"
                                : "Create Account"}
                    </button>
                </form>

                <p className="auth-switch">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                    >
                        {isLogin ? " Register" : " Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;