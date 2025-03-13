import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Função para obter o ID do usuário autenticado
// Função para obter o ID do usuário autenticado
const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.userId || decoded.id; // Ajuste conforme o nome do campo no token
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
};

const AppointmentModal = ({ service, onClose }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        price: service.price,
        name: service.name,
        additionalInfo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Usuário não autenticado. Faça login novamente.");
            navigate("/welcome");
            return;
        }

        const userId = getUserId(); // Obtém o ID do usuário autenticado
        console.log("User ID:", userId);
        console.log("Selected Service ID:", service._id);

        const appointmentData = {
            userId: userId,
            companyId: service.companyId,
            serviceId: service._id,
            date: new Date(`${formData.date}T${formData.time}`),
            status: "confirmed",
            notes: formData.additionalInfo
        };

        console.log("Data do agendamento", appointmentData); // Para depurar o que está sendo enviado

        try {
            const response = await fetch("http://localhost:5000/api/appointments", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao agendar o serviço:", errorData);
                throw new Error(errorData.message || "Erro ao agendar o serviço.");
            }

            // Sucesso ao agendar o serviço
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    // if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Agendar Serviço</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Data</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Horário</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Preço</label>
                        <input
                            type="text"
                            name="price"
                            value={`R$ ${formData.price}`}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Informações adicionais</label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded-md text-white">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-500 rounded-md text-white">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AppointmentModal.propTypes = {
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AppointmentModal;