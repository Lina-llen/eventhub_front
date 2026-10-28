import { useState } from 'react';
import { Link } from 'react-router';
import authServices from '../Services/authServices';

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    // MESSAGES : un seul état regroupe le type Bootstrap et le texte de l'alerte.
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await authServices.login(user);
            const token = typeof response.data === 'string'
                ? response.data
                : response.data?.token;

            if (token) {
                console.log('Token:', token);
                // MESSAGE DE SUCCÈS : affiché après une connexion réussie.
                setMessage({
                    type: "success",
                    text: "Connexion réussie."
                });
            } else {
                console.error('Aucun token trouvé dans la réponse de connexion :', response.data);
                // MESSAGE SANS TOKEN : indique que le back n'a pas renvoyé le token attendu.
                setMessage({
                    type: "warning",
                    text: "Connexion effectuée, mais aucun token n'a été reçu."
                });
            }
        } catch (error) {
            console.error(error);
            // MESSAGE D'ERREUR SERVEUR : affiche le message du back s'il est disponible.
            setMessage({
                type: "danger",
                text: error?.response?.data?.message || "La connexion a échoué. Vérifie tes identifiants."
            });
        }
    };

    return (
        <main className="login-page d-flex align-items-center justify-content-center p-3">
            <section className="login-card card shadow-sm border-0 w-100">
                <div className="card-body p-4 p-md-5">
                    <h1 className="h2 text-center mb-4">Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="loginEmail" className="form-label">Adresse e-mail</label>
                            <input
                                type="email"
                                id="loginEmail"
                                name="email"
                                className="form-control"
                                placeholder="nom@exemple.fr"
                                autoComplete="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="loginPassword" className="form-label">Mot de passe</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="loginPassword"
                                    name="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    autoComplete="current-password"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        {/* AFFICHAGE DES MESSAGES : Bootstrap adapte la couleur selon message.type. */}
                        {message && (
                            <div className={`alert alert-${message.type}`} role="alert">
                                {message.text}
                            </div>
                        )}

                        <button className="btn btn-primary w-100" type="submit">
                            Se connecter
                        </button>
                    </form>
                    <p className="text-center mb-0 mt-4">
                        Pas encore inscrit ? <Link to="/register">S'inscrire</Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;