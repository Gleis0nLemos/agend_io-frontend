const AboutCompany = () => (
    <div className="px-8">
        <p className="mb-4 text-sm text-gray-500">
            A nossa empresa, é especializada em fornecer soluções inovadoras e produtos de qualidade para nossos clientes. Com uma vasta gama de produtos e serviços, buscamos sempre a excelência no atendimento e na experiência de compra.
        </p>

        <h3 className="font-semibold mt-8 mb-2 text-gray-500">Endereço</h3>
        <p className="mb-4 text-sm text-gray-500">
            Rua das Flores, 123, Sala 45<br />
            Centro, Cidade Exemplo - 12345-678
        </p>

        <h3 className="font-semibold mt-8 mb-2 text-gray-500">Outras Informações</h3>
        <ul className="list-none mb-4 text-sm text-gray-500">
            <li>Atendimento ao cliente: (11) 98765-4321</li>
            <li>Email: contato@digitalstore.com.br</li>
            <li>Horário de funcionamento: Seg a Sex, 9h às 18h</li>
            <li>Visite nosso site: <a href="https://www.teste.com.br" className="text-blue-500">www.teste.com.br</a></li>
        </ul>

        <p className="text-sm text-center text-gray-400">
            O agend.io é gratuito para os usuários e todos os <br /> preços apresentados são definidos<br /> pela própria loja.
        </p>
    </div>

);

export default AboutCompany;
