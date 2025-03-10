import { Search } from "lucide-react";
import Logout from "../components/ui/logout.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/welcome");
  }

  return (
    <header>
      <div className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md py-5 px-12 w-[1200px] z-50 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex gap-12">
            <h1 className="text-xl font-extrabold text-indigo-600">agend.io</h1>
            <div className="flex gap-5 pt-1 text-slate-500 font-medium">
              <div className="text-indigo-600 hover:text-slate-700 cursor-pointer">Início</div>
              <div className="hover:text-slate-700 cursor-pointer">Barbearias</div>
              <div className="hover:text-slate-700 cursor-pointer">Salões de beleza</div>
              <div className="hover:text-slate-700 cursor-pointer">Clínicas</div>
              <div className="hover:text-slate-700 cursor-pointer">Nutricionistas</div>
              <div className="hover:text-slate-700 cursor-pointer">Personal Trainer</div>
            </div>
          </div>

          {/* Campo de pesquisa */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-64 px-4 py-2 bg-gray-100 rounded-lg pr-10 border-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>

          <div>
            <button 
              onClick={handleLogout}
              className="bg-indigo-600 text-white flex font-semibold items-center gap-1 px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
              >
              <img src={Logout} alt="Logout" className="w-4 pt-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
