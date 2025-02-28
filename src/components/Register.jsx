import { useState } from "react";  

function Register() {  
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password 
  const [phone, setPhone] = useState("");  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (password !== confirmPassword) {  
      alert("As senhas não coincidem!"); // Simple validation  
      return;  
    }  
    console.log("Register:", { name, email, password, phone });  
  };  

  return (  
    <form onSubmit={handleSubmit}>  
      <h2 className="text-xl font-bold mb-4">Registrar-se</h2>  
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
      <button className="w-full bg-green-500 text-white py-2 rounded">  
        Cadastrar  
      </button>  
    </form>  
  );  
}  

export default Register;  