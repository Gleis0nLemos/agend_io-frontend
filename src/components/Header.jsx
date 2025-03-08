import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [authType, setAuthType] = useState("login");
    const navigate = useNavigate();

    const openModal = (type) => {
        setAuthType(type);
        setModalOpen(true);
    };

    const handleLoginSuccess = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setModalOpen(false);
        navigate(`/home`);
    };

    return (
        <header className="bg-gray-800 p-5 flex justify-between items-center">
            <h1 className="text-lg font-bold text-gray-600">Agend.io</h1>
            <div className="flex gap-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => openModal("login")}
                >
                    Login
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => openModal("register")}
                >
                    Cadastrar-se
                </button>
            </div>

            <AuthModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialType={authType}
                onLoginSuccess={handleLoginSuccess}
            />
        </header>
    );
};

export default Header;
