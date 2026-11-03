import { Link, NavLink } from 'react-router';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3 px-4 mb-4 rounded-3">
            <div className="container-fluid">
                {/* Logo / Nom du site */}
                <Link to="/" className="navbar-brand fw-bold text-primary fs-4 mb-0">
                    EventHub
                </Link>

                {/* Liens de navigation vers events, connexion et inscription */}
                <div className="d-flex align-items-center gap-3">
                    <NavLink
                        to="/events"
                        className={({ isActive }) =>
                            `nav-link px-3 py-1 rounded-2 ${isActive ? 'fw-bold text-primary bg-primary bg-opacity-10' : 'text-secondary'}`
                        }
                    >
                        Événements
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `btn btn-outline-primary btn-sm px-3 ${isActive ? 'active' : ''}`
                        }
                    >
                        Connexion
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `btn btn-primary btn-sm px-3 ${isActive ? 'active' : ''}`
                        }
                    >
                        Inscription
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

