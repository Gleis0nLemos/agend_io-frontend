import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/HomeLayout";
import Undefined from "../components/ui/imgnocopy.jpeg";
import Star from "../components/ui/star.svg";
import Informations from "../components/Informations";
import AppointmentModal from "../components/AppointmentModal";

const CompanyDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <Layout>
            <div className="w-[1200px] pt-23 mx-auto pb-23">
                <div className="relative w-full h-48">
                    <img
                        src={Undefined}
                        alt="Capa da companhia"
                        className="w-full h-full object-cover"
                    />

                    {/* Imagem de perfil sobre a capa */}
                    <div className="absolute left-6 bottom-[-70px]">
                        <img
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
                            <li key={service?.id} onClick={() => { setSelectedService(service); setIsModalOpen(true); }} className="flex gap-4 items-center cursor-pointer p-2 rounded-md shadow-sm border-gray-300 hover:bg-gray-100">
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

                {isModalOpen && <AppointmentModal onClose={() => setIsModalOpen(false)} service={selectedService} />}
            </div>
        </Layout>
    );
};

export default CompanyDetails;