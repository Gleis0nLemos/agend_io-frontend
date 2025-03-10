import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/HomeLayout";

const Home = () => {
    //const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // initialize the navigate function
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            // Retrieve user data and token
            const userData = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            console.log("Dados do usuário:", userData); // Adicione este log
            console.log("Token:", token); // Adicione este log

            // // Check if the ID is valid
            // if (!id) {
            //     setError("ID inválido.");
            //     setLoading(false);
            //     return;
            // }


            // Check if user data or token is missing
            if (!userData || !token) {
                setError("Usuário ou token inválidos. Faça login novamente.");
                navigate("/welcome"); // Redirect to welcome page
                return;
            }

            setUser(userData); // Set the user state

            // // Check if the ID in the URL matches the user ID
            // if (userData.id !== id) {
            //     setError("Usuário ou Token inválidos. Faça login novamente.");
            //     navigate("/welcome"); // Redirect to welcome page
            // }

            try {
                // Do a GET request to the API
                const response = await fetch(`http://localhost:5000/api/companies`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include the token in the headers
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar companhias.");
                }

                const data = await response.json();

                // Check if the data is empty
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
    }, [navigate]); // Add navigate to the dependencies array

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <Layout>

            <div className="mt-36 w-[1200px] mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">
                            Bem-vindo, {user?.name}!
                        </h1>
                        <img src="https://avatar.iran.liara.run/public" alt="" className="h-12 w-12" />
                    </div>
                </div>
                <h2 className="text-xl mb-2">Lista de Companhias:</h2>
                <ul className="list-disc pl-6">
                    {companies.map((company) => (
                        <li
                            key={company.id}
                            className="mb-2 list-none cursor-pointer hover:bg-gray-200 p-2 rounded"
                            onClick={() => navigate(`/companies/${company._id}`)} // Redireciona para detalhes
                        >
                            <div className="flex items-center gap-2">
                                <img src="https://avatar.iran.liara.run/public" alt="Company" className="h-12 w-12 rounded-full" />
                                {company.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default Home;
