import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate(); // Inicializa o hook useNavigate
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            // Recupera os dados do usuário e o token
            const userData = JSON.parse(localStorage.getItem("user")); 
            const token = localStorage.getItem("token");

            // Verifica se o ID existe
            if (!id) {
                setError("ID inválido.");
                setLoading(false);
                return;
            }

            // Verifica se o usuário e o token são válidos
            if (!userData || !token) {
                setError("Usuário ou token inválidos. Faça login novamente.");
                navigate("/"); // Redireciona para a página inicial
                return;
            }

            try {
                // Faz a requisição para o backend passando o token no cabeçalho
                const response = await fetch(`http://localhost:5000/api/companies`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Passa o token no cabeçalho
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar companhias.");
                }

                const data = await response.json();

                // Verifica se não retornou dados
                if (!data || data.length === 0) {
                    setError("Nenhuma companhia encontrada para o ID fornecido.");
                    return;
                }

                setCompanies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [id, navigate]); // Inclui id e navigate no array de dependências

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bem-vindo, usuário {id}!</h1>
            <h2 className="text-xl mb-2">Lista de Companhias:</h2>
            <ul className="list-disc pl-6">
                {companies.map((company) => (
                    <li key={company.id} className="mb-2">
                        {company.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
