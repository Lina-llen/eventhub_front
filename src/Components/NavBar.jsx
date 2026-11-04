import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import AuthContext from '../Contexts/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { isConnected, setIsConnected } = useContext(AuthContext);

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setIsConnected(false);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3 px-4 mb-4 rounded-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold text-primary fs-4 mb-0">
                    EventHub
                </Link>

                <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3">
                    {isConnected === true ? (
                        <>
                            <NavLink
                                to="/events"
                                className={({ isActive }) =>
                                    `nav-link px-3 py-1 rounded-2 ${isActive ? 'fw-bold text-primary bg-primary bg-opacity-10' : 'text-secondary'}`
                                }
                            >
                                Événements
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `btn btn-outline-primary btn-sm rounded-circle d-inline-flex align-items-center justify-content-center ${isActive ? 'active' : ''}`
                                }
                                style={{ width: '2.25rem', height: '2.25rem' }}
                                aria-label="Mon profil"
                                title="Mon profil"
                            >
                                <i className="bi bi-person fs-5" aria-hidden="true" />
                            </NavLink>
                            <button type="button" className="btn btn-primary btn-sm px-3" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : isConnected === false ? (
                        <>
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
                        </>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
