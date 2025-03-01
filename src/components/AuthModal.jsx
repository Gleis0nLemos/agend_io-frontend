import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Login from "./Login";
import Register from "./Register";
import PropTypes from "prop-types";

function AuthModal({ isOpen, onClose, initialType = "login", onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(initialType === "login");

  useEffect(() => {
    setIsLogin(initialType === "login");
  }, [initialType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {isLogin ? (
          <Login onLoginSuccess={onLoginSuccess} />
        ) : (
          <Register setAuthMode={() => setIsLogin(true)} />
        )}

        <p className="text-sm mt-2 text-center">
          {isLogin ? "Não tem conta? " : "Já tem uma conta? "}
          <button
            className="text-blue-500 underline"
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
