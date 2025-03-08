const Footer = () => {
    return (
        <footer className="flex justify-center text-center p-6">
            <div className="w-[1200px]">

                <div className="flex justify-between items-start pr-24 pb-8">
                    <div className="text-left w-[380px]">
                        <h2 className="text-2xl font-bold text-indigo-600 pb-2">agend.io</h2>
                        <p className="text-gray-500 text-base mt-1">Nunca perca um compromisso! Agende seus horários de forma rápida e intuitiva, receba lembretes e mantenha sua agenda sempre atualizada.
                        </p>
                    </div>

                    <div className="flex gap-48">

                        <div className="text-gray-500">
                            <h3 className="text-gray-800">Redes Sociais</h3>
                            <div className="flex flex-col text-left gap-2 mt-4 text-sm">
                                <a href="#" className="hover:text-gray-800 flex items-center gap-3 transition">
                                    <i className="fab fa-facebook text-xl w-6 flex-shrink-0"></i> <span>Facebook</span>
                                </a>
                                <a href="#" className="hover:text-gray-800 flex items-center gap-3 transition">
                                    <i className="fab fa-instagram text-xl w-6 flex-shrink-0"></i> <span>Instagram</span>
                                </a>
                                <a href="#" className="hover:text-gray-800 flex items-center gap-3 transition">
                                    <i className="fab fa-x-twitter text-xl w-6 flex-shrink-0"></i> <span>Twitter</span>
                                </a>
                                <a href="#" className="hover:text-gray-800 flex items-center gap-3 transition">
                                    <i className="fab fa-whatsapp text-xl w-6 flex-shrink-0"></i> <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>



                        <div className="text-gray-500">
                            <h3 className="text-gray-800 text-left">Legal</h3>
                            <div className="flex flex-col text-left gap-2 mt-4 text-sm">
                                <a href="#" className="hover:text-slate-700 cursor-pointer">
                                    Termos de uso
                                </a>
                                <a href="#" className="hover:text-slate-700 cursor-pointer">
                                    Política de privacidade
                                </a>
                                <p className="text-slate-600 font-medium pt-2 text-xs">
                                    Versão 1.0.0
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='border-t border-gray-300 md:mt-4' />

                <p className="text-gray-400 text-left mt-4 text-sm">© agend.io | 2025. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
