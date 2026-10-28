import { useState } from 'react';
import { Link } from 'react-router';
import authServices from '../Services/authServices';

const RegisterPage = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
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
            if (user.password !== user.confirm_password) {
                // MESSAGE D'ERREUR : affiché dans l'alerte Bootstrap sous le formulaire.
                setMessage({
                    type: "danger",
                    text: "Les mots de passe ne correspondent pas."
                });
                return;
            }

            const response = await authServices.register(user);
            console.log(response);
            // MESSAGE DE SUCCÈS : affiché après la réponse positive du serveur.
            setMessage({
                type: "success",
                text: "Inscription réussie ! Tu peux maintenant te connecter."
            });
        } catch (error) {
            console.error(error);
            // MESSAGE D'ERREUR SERVEUR : utilise le détail du back s'il est disponible.
            setMessage({
                type: "danger",
                text: error?.response?.data?.message || "L'inscription a échoué. Vérifie les informations et réessaie."
            });
        }
    };

    return (
        <main className="login-page d-flex align-items-center justify-content-center p-3">
            <section className="login-card card shadow-sm border-0 w-100">
                <div className="card-body p-4 p-md-5">
                    <h1 className="h2 text-center mb-4">Créer un compte</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="registerUsername" className="form-label">Username</label>
                            <input
                                type="text"
                                id="registerUsername"
                                name="username"
                                className="form-control"
                                placeholder="Ton nom d'utilisateur"
                                autoComplete="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="registerEmail" className="form-label">Adresse e-mail</label>
                            <input
                                type="email"
                                id="registerEmail"
                                name="email"
                                className="form-control"
                                placeholder="nom@exemple.fr"
                                autoComplete="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="registerPassword" className="form-label">Mot de passe</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="registerPassword"
                                    name="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    autoComplete="new-password"
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

                        <div className="mb-4">
                            <label htmlFor="registerConfirmPassword" className="form-label">Confirmer le mot de passe</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="registerConfirmPassword"
                                name="confirm_password"
                                className="form-control"
                                placeholder="Confirme ton mot de passe"
                                autoComplete="new-password"
                                value={user.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* AFFICHAGE DES MESSAGES : Bootstrap adapte la couleur selon message.type. */}
                        {message && (
                            <div className={`alert alert-${message.type}`} role="alert">
                                {message.text}
                            </div>
                        )}

                        <button className="btn btn-primary w-100" type="submit">
                            S'inscrire
                        </button>
                    </form>
                    <p className="text-center mb-0 mt-4">
                        Déjà inscrit ? <Link to="/login">Se connecter</Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;
