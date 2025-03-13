import Icon from "./ui/iconnone.svg"

const PaymentsCompany = () => {
    return (
        <div className="px-8">
            <h2 className="font-semibold mb-4 text-gray-600">Pagamento pelo site</h2>

            {/* Débito */}
            <div className="mb-4">
                <h3 className="font-medium text-gray-500">Débito</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Elo" className="h-5 mr-2" />
                        Elo
                    </span>
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Mastercard Débito" className="h-5 mr-2" />
                        Mastercard Débito
                    </span>
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Visa Débito" className="h-5 mr-2" />
                        Visa Débito
                    </span>
                </div>
            </div>

            {/* Crédito */}
            <div className="mb-4">
                <h3 className="font-medium text-gray-500">Crédito</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Mastercard" className="h-5 mr-2" />
                        Mastercard
                    </span>
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Amex" className="h-5 mr-2" />
                        Amex
                    </span>
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Hipercard" className="h-5 mr-2" />
                        Hipercard
                    </span>
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Visa" className="h-5 mr-2" />
                        Visa
                    </span>
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="Elo" className="h-5 mr-2" />
                        Elo
                    </span>
                </div>
            </div>

            {/* PIX */}
            <div className="mb-4">
                <h3 className="font-medium text-gray-500">PIX</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-2 bg-gray-100 rounded-lg flex items-center">
                        <img src={Icon} alt="PIX" className="h-5 mr-2" />
                        PIX
                    </span>
                </div>
            </div>

            {/* Observação */}
            <p className="text-sm text-gray-500 mt-6">
                O agend.io é gratuito para os usuários e todos os <br /> preços apresentados são definidos<br /> pela própria loja.
            </p>
        </div>
    );
};

export default PaymentsCompany;
