import { useState } from "react";
import PropTypes from "prop-types";

function Register({ setAuthMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData = {
      name,
      email,
      password,
      phone,
      role: "client" // Set client as default role without user input
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar usuário.");
      }

      setSuccess(true);
      alert("Usuário cadastrado com sucesso!");

      // Change to login mode
      setAuthMode();

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-1">
      <h2 className="text-xl font-bold mb-4 pt-2 pb-2">
        Registrar-se no <span className="font-extrabold text-indigo-600">agend.io</span>
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Cadastro realizado com sucesso!</p>}

      <label htmlFor="name" className="block text-sm font-medium text-gray-500">
        Nome
      </label>
      <input
        type="text"
        placeholder="Nome completo"
        className="w-full p-2 border rounded-lg mb-4 mt-1 border-gray-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email" className="block text-sm font-medium text-gray-500">
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

      <label htmlFor="password" className="block text-sm font-medium text-gray-500">
        Senha
      </label>
      <input
        type="password"
        placeholder="Digite sua senha"
        className="w-full p-2 border rounded-lg mb-4 mt-1 border-gray-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-500">
        Confirmar Senha
      </label>
      <input
        type="password"
        placeholder="Confirme sua senha"
        className="w-full p-2 border rounded-lg mb-4 mt-1 border-gray-400"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <label htmlFor="phone" className="block text-sm font-medium text-gray-500">
        Telefone
      </label>
      <input
        type="tel"
        placeholder="Número de telefone"
        className="w-full p-2 border rounded-lg mb-6 mt-1 border-gray-400"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button
        className="bg-indigo-600 text-white w-full py-3 font-semibold items-center rounded-lg hover:bg-indigo-700 hover:cursor-pointer"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>

  );
}

Register.propTypes = {
  setAuthMode: PropTypes.func.isRequired,
};

export default Register;
