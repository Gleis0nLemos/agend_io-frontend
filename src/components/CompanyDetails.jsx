import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
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
        <div className="p-6">
            <div className="relative w-full h-48">
                <img
                    src={company.coverImage}
                    alt="Capa da companhia"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex items-center gap-4 mt-4">
                <img
                    src={company.profileImage}
                    alt="Perfil da companhia"
                    className="h-20 w-20 rounded-full"
                />
                <h1 className="text-2xl font-bold">{company.name}</h1>
            </div>
            {company ? (
                <>
                    <h2 className="text-xl mt-4">Serviços:</h2>
                    <ul className="list-disc pl-6">
                        {company.services?.map((service, index) => (
                            <li key={index}>{service}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Carregando detalhes da empresa...</p>
            )}
            {/* <h2 className="text-xl mt-4">Serviços:</h2>
            <ul className="list-disc pl-6">
                {company?.services?.map((service, index) => (
                    <li key={index}>{service}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default CompanyDetails;
