import Layout from "../layouts/MainLayout";

const Welcome = () => {
    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-3xl font-bold">Welcome to Agend.io!</h1>
            </div>
        </Layout>
    );
};

export default Welcome;
