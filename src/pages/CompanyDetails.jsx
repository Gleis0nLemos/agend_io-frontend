import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/HomeLayout";
import Undefined from "../components/ui/imgnocopy.jpeg";
import Star from "../components/ui/star.svg";
import Informations from "../components/Informations";

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
    const [isOpen, setIsOpen] = useState(false);
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
        <Layout>
            <div className="w-[1200px] pt-23 mx-auto pb-23">
                <div className="relative w-full h-48">
                    <img
                        // src={company?.coverImage}
                        src={Undefined}
                        alt="Capa da companhia"
                        className="w-full h-full object-cover"
                    />

                    {/* Imagem de perfil sobre a capa */}
                    <div className="absolute left-6 bottom-[-70px]">
                        <img
                            // src={company?.profileImage}
                            src={Undefined}
                            alt="Perfil da companhia"
                            className="h-32 w-32 rounded-full shadow-lg"
                        />
                    </div>
                </div>

                {/* Nome da empresa */}
                <div className="pl-42 pt-3 mb-12">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl font-bold">{company?.name}</h1>
                            <div className="flex pt-1.5 text-sm gap-1">
                                <img src={Star} alt="" className="h-4 w-4" />
                                <p className="text-yellow-600 font-bold">4.5</p>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <span className="text-gray-500">|</span>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="font-bold text-indigo-500 cursor-pointer hover:text-indigo-700">
                                Mais informações
                            </button>
                        </div>
                        <Informations isOpen={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 bg-green-600 pb-1 rounded-full"></div>
                        <p className="text-sm font-medium text-green-500">Aberto</p>
                    </div>
                </div>

                <p className="mt-2 ml-2 mb-12 text-gray-500">{company?.description}! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique nemo repudiandae illo, at impedit voluptates quod tenetur voluptatibus nesciunt, eos officia, doloremque odio adipisci? Fugiat quos reiciendis enim nihil illum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti pariatur, fugiat tempora rem officia sequi ut quam enim assumenda aut vero optio at laboriosam aspernatur quo atque voluptatum! Sit, cupiditate!</p>

                <h2 className="text-lg mb-2 text-gray-600 pl-2 font-semibold">Serviços</h2>
                {services.length > 0 ? (
                    <ul className="list-none h-full grid grid-cols-2 gap-6">
                        {services?.map(service => (
                            <li key={service?.id} onClick={() => handleOpenModal(service)} className="flex gap-4 items-center cursor-pointer p-2 rounded-md shadow-sm border-gray-300 hover:bg-gray-100">
                                <div>
                                    <img src={Undefined} alt="Company" className="h-21 w-21 rounded-xl" />
                                </div>
                                <div>
                                    <p>{service?.name}, R$ {service.price}</p>
                                    <p></p>
                                </div>
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
        </Layout>
    );
};

export default CompanyDetails;