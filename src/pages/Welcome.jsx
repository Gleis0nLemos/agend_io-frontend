import Layout from "../layouts/MainLayout"

const Welcome = () => {
    return (
        <>
            <Layout>
                <div>

                <h1 className="text-2xl font-semibold text-center mt-10">Welcome to the Home Page</h1>
                <p className="text-center mt-5">This is the home page of the app</p>
                </div>
            </Layout>
        </>
    )
};

export default Welcome