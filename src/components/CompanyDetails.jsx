import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Controle do modal
    const [selectedService, setSelectedService] = useState(null); // Serviço selecionado
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        price: "",
        name: "",
        additionalInfo: ""
    });

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Usuário não autenticado. Faça login novamente.");
                navigate("/welcome");
                return;
            }

            try {
                // GET request the company to the API
                const response = await fetch(`http://localhost:5000/api/companies/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar detalhes da companhia.");
                }

                const data = await response.json();
                setCompany(data);

                // GET request the services to the API
                const servicesResponse = await fetch(`http://localhost:5000/api/company-services`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!servicesResponse.ok) throw new Error("Erro ao buscar serviços da empresa.");
                const servicesData = await servicesResponse.json();

                // Filter just services from the specific company
                const companyServices = servicesData.filter(service => {
                    return service.companyId._id === id;
                });
                setServices(companyServices);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id, navigate]);

    // Função para abrir o modal com os dados do serviço
    const handleOpenModal = (service) => {
        setSelectedService(service);
        setFormData({
            date: "",
            time: "",
            price: service.price,
            name: service.name,
            additionalInfo: ""
        });
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Função para lidar com a alteração dos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função para submeter o formulário
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
        console.log("Selected Service ID:", selectedService._id);

        const appointmentData = {
            userId: userId,
            companyId: id,
            serviceId: selectedService._id,
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
            handleCloseModal();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <div className="relative w-full h-48">
                <img
                    src={company?.coverImage}
                    alt="Capa da companhia"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex items-center gap-4 mt-4">
                <img
                    src={company?.profileImage}
                    alt="Perfil da companhia"
                    className="h-20 w-20 rounded-full"
                />
                <h1 className="text-2xl font-bold">{company?.name}</h1>
            </div>

            <p className="mt-2">{company?.description}</p>

            <h2 className="text-xl mt-4">Serviços:</h2>
            {services.length > 0 ? (
                <ul className="list-disc pl-6">
                    {services?.map(service => (
                        <li key={service?.id} onClick={() => handleOpenModal(service)} className="cursor-pointer hover:text-blue-500">
                            {service?.name}, R$ {service.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhum serviço disponível para esta empresa.</p>
            )}

            {/* Modal */}
            {showModal && (
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
                                <label className="block text-sm font-medium text-gray-700">Hora</label>
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
                                <label className="block text-sm font-medium text-gray-700">Informações Adicionais</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="4"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="mr-4 bg-gray-500 text-white p-2 rounded-md">Fechar</button>
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Agendar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDetails;