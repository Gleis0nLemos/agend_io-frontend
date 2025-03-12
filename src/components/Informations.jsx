import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const About = () => <div>Informações sobre a empresa.</div>;
const Hours = () => <div>Horários de funcionamento.</div>;
const Payments = () => <div>Métodos de pagamento aceitos.</div>;

const Informations = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // Pequeno delay para iniciar a animação
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300); // Tempo da animação
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-end pt-23 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose} // Fechar ao clicar no fundo
    >
      <div
        className={`bg-white w-[450px] h-full p-4 shadow-lg transform transition-transform duration-300 ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar dentro da modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Informações</h2>
          <button className="p-2 rounded hover:bg-gray-200" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "about" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("about")}
          >
            Sobre
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "hours" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("hours")}
          >
            Horários
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "payments" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Pagamentos
          </button>
        </div>
        <div>
          {activeTab === "about" && <About />}
          {activeTab === "hours" && <Hours />}
          {activeTab === "payments" && <Payments />}
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
