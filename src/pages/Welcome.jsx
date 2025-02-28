import AuthModal from "../components/AuthModal";
import Layout from "../layouts/MainLayout";
import { useState } from "react";

const Welcome = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [authType, setAuthType] = useState("login"); // Estado para definir qual tela abrir

    const openModal = (type) => {
        setAuthType(type);
        setModalOpen(true);
    };

    return (
        <Layout>
            <div className="flex justify-end pr-10 gap-4 py-12">
                <h1>Welcome to Agend.io!</h1>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Bem-vindo ao nosso site!</h1>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
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

                    <AuthModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        initialType={authType} // Passando o tipo correto
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Welcome;
