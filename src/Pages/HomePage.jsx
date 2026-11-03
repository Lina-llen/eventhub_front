import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid px-0">
            {/* Header avec EventHub à gauche et Connexion / Inscription en haut à droite */}
            <header className="d-flex justify-content-between align-items-center pb-4 mb-5 border-bottom">
                <h1 className="h3 fw-bold mb-0">EventHub</h1>
                <div className="d-flex gap-3">
                    <button
                        type="button"
                        className="btn btn-outline-primary px-3"
                        onClick={() => navigate('/login')}
                    >
                        Connexion
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary px-3"
                        onClick={() => navigate('/register')}
                    >
                        Inscription
                    </button>
                </div>
            </header>

            {/* Zone centrale aérée avec uniquement le bouton pour consulter les événements */}
            <main className="d-flex justify-content-center align-items-center py-5 my-5">
                <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 py-3 shadow-sm"
                    onClick={() => navigate('/events')}
                >
                    Consulter mes événements
                </button>
            </main>
        </div>
    );
};

export default HomePage;
