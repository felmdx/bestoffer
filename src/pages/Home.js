import { useState, useEffect } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [dispositivo, setDispositivo] = useState("");
    const [plano, setPlano] = useState("");
    const [marca, setMarca] = useState("");
    const [segmento, setSegmento] = useState("");
    const [escopo, setEscopo] = useState("");
    const [parcelas, setParcelas] = useState("");
    const [dispositivos, setDispositivos] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [segmentos, setSegmentos] = useState([]);
    const [escopos, setEscopos] = useState([]);
    const [parcelasOptions, setParcelasOptions] = useState(["24x", "36x"]);

    function getProducts() {
        fetch("http://localhost:5000/products")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);

                setDispositivos([...new Set(data.map(product => product.Dispositivo))]);
                setPlanos([...new Set(data.map(product => product.Plano))]);
                setMarcas([...new Set(data.map(product => product.Marca))]);
                setSegmentos([...new Set(data.map(product => product.Segmento))]);
                setEscopos([...new Set(data.flatMap(product => product.Escopo.split("; ")))]);
            })
            .catch(error => {
                alert("Não foi possível encontrar os dados :(");
            });
    }

    useEffect(getProducts, []);

    const handleSearch = () => {
        const filtered = products.filter(product =>
            (dispositivo === "" || product.Dispositivo === dispositivo) &&
            (plano === "" || product.Plano === plano) &&
            (marca === "" || product.Marca === marca) &&
            (segmento === "" || product.Segmento === segmento) &&
            (escopo === "" || product.Escopo.includes(escopo)) &&
            (parcelas === "" || product[`Preço Até 9 un.(${parcelas})`])
        );
        setFilteredProducts(filtered);
    };

    const handleResetFilters = () => {
        setDispositivo("");
        setPlano("");
        setMarca("");
        setSegmento("");
        setEscopo("");
        setParcelas("");
        setFilteredProducts(products);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Vivo Best Offer App</h2>

            <div className="row mb-3 justify-content-center">
                <div className="col-md-8 p-4 bg-white shadow">
                    <form className="d-flex flex-column align-items-center" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                        <div className="mb-3 w-100">
                            <select className="form-select mb-2" style={{ backgroundColor: '#f0f0f0' }} value={dispositivo} onChange={(e) => setDispositivo(e.target.value)}>
                                <option value="">Selecione um dispositivo</option>
                                {dispositivos.map((device, index) => (
                                    <option key={index} value={device}>{device}</option>
                                ))}
                            </select>
                            <select className="form-select mb-2" style={{ backgroundColor: '#f0f0f0' }} value={plano} onChange={(e) => setPlano(e.target.value)}>
                                <option value="">Selecione um plano</option>
                                {planos.map((plan, index) => (
                                    <option key={index} value={plan}>{plan}</option>
                                ))}
                            </select>
                            <select className="form-select mb-2" style={{ backgroundColor: '#f0f0f0' }} value={marca} onChange={(e) => setMarca(e.target.value)}>
                                <option value="">Selecione uma marca</option>
                                {marcas.map((brand, index) => (
                                    <option key={index} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <select className="form-select mb-2" style={{ backgroundColor: '#f0f0f0' }} value={segmento} onChange={(e) => setSegmento(e.target.value)}>
                                <option value="">Selecione um segmento</option>
                                {segmentos.map((seg, index) => (
                                    <option key={index} value={seg}>{seg}</option>
                                ))}
                            </select>
                            <div className="mb-3 w-100">
                                <select className="form-select mb-2" style={{ backgroundColor: '#f0f0f0' }} value={escopo} onChange={(e) => setEscopo(e.target.value)}>
                                    <option value="">Selecione um escopo</option>
                                    {escopos.map((scope, index) => (
                                        <option key={index} value={scope}>{scope}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 w-100">
                                <select className="form-select mb-2" style={{ backgroundColor: '#d0d0d0' }} value={parcelas} onChange={(e) => setParcelas(e.target.value)}>
                                    <option value="">Selecione parcelas</option>
                                    {parcelasOptions.map((parcel, index) => (
                                        <option key={index} value={parcel}>{parcel}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-primary me-2" style={{ color: 'white', backgroundColor: 'purple', border: 'white' }} type="submit">Buscar</button>
                            <button type="button" className="btn btn-outline-primary me-2" style={{ color: 'white', backgroundColor: 'purple', border: 'white' }} onClick={() => { getProducts(); handleResetFilters(); }}>Recarregar Produtos</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                {
                    filteredProducts.map((product, index) => (
                        <div className="col-md-4 mb-4 d-flex justify-content-center" key={index}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={"http://localhost:5000/images/" + product.imageFilename} className="card-img-top" alt={product.Modelo} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.Dispositivo} - {product.Modelo}</h5>
                                    <p className="card-text">
                                        <strong>Dispositivo:</strong> {product.Dispositivo} <br />
                                        <strong>Plano:</strong> {product.Plano} <br />
                                        <strong>Marca:</strong> {product.Marca} <br />
                                        <strong>Segmento:</strong> {product.Segmento} <br />
                                        <strong>Escopo:</strong> {product.Escopo} <br />
                                        <strong>Preço Até 9 un. ({parcelas}):</strong> {product[`Preço Até 9 un.(${parcelas})`] || 'Atualize a parcela'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
