import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"

export const Auth = ({ isModalOpen, closeModal, setIsAuthenticated }) => {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    if (!isModalOpen) return null;  // Avoid rendering unnecessary elements

    return (
        <div className="fixed inset-0 gap-5 backdrop-blur w-full bg-opacity-50 flex justify-center items-center">
            {isLogin ? (
                <Login isModalOpen={isModalOpen}
                    setIsLogin={setIsLogin}
                    closeModal={closeModal}
                    setIsAuthenticated={setIsAuthenticated}
                    navigate={navigate}
                />
            ) : (
                <Register closeModal={closeModal}
                    setIsLogin={setIsLogin}
                    navigate={navigate}
                />
            )}
        </div>
    );
};


const Login = ({ closeModal, setIsAuthenticated, setIsLogin, navigate }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await axios.post("http://localhost:5001/auth/login", { username, password });
            alert("Login successful");
            setIsAuthenticated(true);
            closeModal();
            setIsLogin(true);
            setCookies("access_token", responce.data.token);
            window.localStorage.setItem("userId", responce.data.userId)
            navigate('/')
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="max-w-md w-[50%] p-4 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl text-left text-black font-semibold">Login</h2>
                <div>
                    <label htmlFor='username' className="block text-sm text-left font-medium text-gray-700">Username:</label>
                    <input
                        type='text'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor='password' className="block text-sm text-left font-medium text-gray-700">Password:</label>
                    <input
                        type='password'
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex gap-5">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700">
                        Login
                    </button>
                    <button type="button" onClick={closeModal} className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700">
                        Close
                    </button>
                </div>
                <div className="mt-2">
                    <button type="button" onClick={() => setIsLogin(false)} className="text-blue-500 underline">
                        registered here
                    </button>
                </div>
            </form>
        </div>
    );
};


const Register = ({ closeModal, setIsLogin, navigate }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/auth/register", { username, password });
            alert("Registration successful! Please log in.");
            setIsLogin(true);
            navigate("/")
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="max-w-md w-[50%] p-4 bg-white shadow-lg rounded-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-left text-black font-semibold">Register</h2>
                <div>
                    <label htmlFor='username' className="block text-sm text-left font-medium text-gray-700">Username:</label>
                    <input
                        type='text'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor='password' className="block text-sm text-left font-medium text-gray-700">Password:</label>
                    <input
                        type='password'
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex gap-5">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700">
                        Register
                    </button>
                    <button type="button" onClick={closeModal} className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700">
                        Close
                    </button>
                </div>
                <div className="mt-2">
                    <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 underline">
                        Already registered? Login here
                    </button>
                </div>
            </form>
        </div>
    );
};