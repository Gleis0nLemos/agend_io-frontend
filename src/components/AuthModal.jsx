import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Login from "./Login";
import Register from "./Register";
import PropTypes from "prop-types";

function AuthModal({ isOpen, onClose, initialType = "login", onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(initialType === "login");

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialType === "login");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Garante que o scroll volte ao fechar
    };
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white py-8 px-6 rounded-lg shadow-lg w-80 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 pr-2 pt-2 right-2 text-gray-400 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {isLogin ? (
          <Login onLoginSuccess={onLoginSuccess} />
        ) : (
          <Register setAuthMode={() => setIsLogin(true)} />
        )}

        <hr className='border-t mx-4 border-gray-300 md:mt-4' />

        <p className="text-sm mt-2 text-center">
          {isLogin ? "Não tem conta? " : "Já tem uma conta? "}
          <button
            className="text-indigo-600 underline hover:text-indigo-800 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Registrar-se" : "Fazer login"}
          </button>
        </p>
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialType: PropTypes.oneOf(["login", "register"]),
  onLoginSuccess: PropTypes.func.isRequired,
};

export default AuthModal;
