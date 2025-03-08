import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import ArrowForward from "../components/ui/arrow_forward.svg";


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
        <header className="">
            <div className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md py-5 px-12 z-50 w-[40rem] max-w-[95%] rounded-xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-extrabold text-indigo-600">agend.io</h1>
                    <div className="flex gap-8 pt-1 text-slate-500 font-medium">
                        <div className="hover:text-slate-700 cursor-pointer">Recursos</div>
                        <div className="hover:text-slate-700 cursor-pointer">Para empresas</div>
                        <div className="hover:text-slate-700 cursor-pointer">FAQ</div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="bg-indigo-600 text-white flex font-semibold pl-8 itens-center gap-1 pr-5 py-2 rounded-lg hover:bg-indigo-700 hover:cursor-pointer"
                            onClick={() => openModal("login")}
                        >
                            <p className="font-bold">Login</p> <img src={ArrowForward} alt="" className="w-4 pt-1" />
                        </button>
                        {/* <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => openModal("register")}
                        >
                            Cadastrar-se
                        </button> */}
                    </div>

                </div>
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
