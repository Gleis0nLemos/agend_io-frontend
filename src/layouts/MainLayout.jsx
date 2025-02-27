import Header from "../components/Header";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <div className="mx-5 md:mx-0">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;