import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/logo_vivo.png" alt="..." width="30" className="me-2" /> Best Offer 
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-dark" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/Info">Info</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export function Footer() {
    return (
        <div className="text-center p-4 border-top">
                <img src="/logo_vivo.png" alt="..." width="30" className="me-2" /> Best Offer 
        </div>
    )
}