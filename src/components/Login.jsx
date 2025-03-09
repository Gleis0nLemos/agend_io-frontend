import { useState } from "react";
import PropTypes from "prop-types";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login.");
      }

      // Salva token no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Salva os dados do usuário

      // Chama função de sucesso e redireciona
      onLoginSuccess(data.user);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-1">
      <h2 className="text-xl font-bold mb-4 pt-2 pb-2">Entrar no <span className="font-extrabold text-indigo-600">agend.io</span></h2>
      {error && <p className="text-red-500">{error}</p>}

      <label 
        htmlFor="email"
        className="block text-sm font-medium text-gray-500"
        >
          Email
      </label>
      <input
        type="email"
        placeholder="ex: usuario@email.com"
        className="w-full p-2 border rounded-lg mb-4 mt-1 border-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label 
        htmlFor="senha"
        className="block text-sm font-medium text-gray-500"
        >
          Senha
      </label>
      <input
        type="password"
        placeholder="digite sua senha"
        className="w-full p-2 border rounded-lg mb-6 mt-1 border-gray-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        // className="w-full bg-blue-500 text-white py-2 rounded"
        className="bg-indigo-600 text-white w-full py-3 font-semibold itens-center rounded-lg hover:bg-indigo-700 hover:cursor-pointer"

        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
