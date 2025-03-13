import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

import AboutCompany from "./AboutCompany";
import HoursCompany from "./HoursCompany";
import PaymentsCompany from "./PaymentsCompany";

const Informations = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("about");
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setActiveTab("about"); // Sempre inicia na aba "Sobre"
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 50); // Tempo maior para garantir aplicação da animação
        } else {
            setIsAnimating(false);
            const timeout = setTimeout(() => setIsVisible(false), 500); // Tempo da animação (500ms)
            return () => clearTimeout(timeout); // Limpa o timeout se o estado mudar rápido
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 flex justify-end pt-23 transition-opacity duration-500 ${isAnimating ? "opacity-100" : "opacity-0"
                }`}
            onClick={onClose} // Fechar ao clicar no fundo
        >
            <div
                className={`bg-white w-[450px] h-full p-4 shadow-lg transform transition-transform duration-500 ${isAnimating ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar dentro da modal
            >
                <div className="flex justify-end items-center mb-4">
                    <button className="p-2 rounded hover:text-indigo-800 cursor-pointer" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        className={`px-4 mb-4 ${activeTab === "about"
                                ? "border-indigo-500 border-b-4 text-indigo-700 font-semibold"
                                : "border-b-4 border-white hover:border-b-4 hover:border-gray-300"
                            }`}
                        onClick={() => setActiveTab("about")}
                    >
                        Sobre
                    </button>
                    <button
                        className={`px-4 mb-4 ${activeTab === "hours"
                                ? "border-indigo-500 border-b-4 text-indigo-700 font-semibold"
                                : "border-b-4 border-white hover:border-b-4 hover:border-gray-300"
                            }`}
                        onClick={() => setActiveTab("hours")}
                    >
                        Horários
                    </button>
                    <button
                        className={`px-4 mb-4 ${activeTab === "payments"
                                ? "border-indigo-500 border-b-4 text-indigo-700 font-semibold"
                                : "border-b-4 border-white hover:border-b-4 hover:border-gray-300"
                            }`}
                        onClick={() => setActiveTab("payments")}
                    >
                        Pagamento
                    </button>
                </div>
                <div>
                    {activeTab === "about" && <AboutCompany />}
                    {activeTab === "hours" && <HoursCompany />}
                    {activeTab === "payments" && <PaymentsCompany />}
                </div>
            </div>
        </div>
    );
};

Informations.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Informations;
