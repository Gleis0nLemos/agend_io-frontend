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
      const response = await fetch("http://localhost:5000/api/users", {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrar-se</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Cadastro realizado com sucesso!</p>}
      
      <input
        type="text"
        placeholder="Nome"
        className="w-full p-2 border rounded mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full p-2 border rounded mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        className="w-full p-2 border rounded mb-2"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Telefone"
        className="w-full p-2 border rounded mb-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button
        className="w-full bg-green-500 text-white py-2 rounded"
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
