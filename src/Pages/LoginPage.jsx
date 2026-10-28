import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router';
import authServices from '../Services/authServices';


const LoginPage = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        setErrorMessage("");
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await authServices.login(user);
            console.log(response);
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message || "La connexion a échoué. Vérifie tes identifiants."
            );
        }
    }

    return (
        <main className="login-page d-flex align-items-center justify-content-center p-3">
            <section className="login-card card shadow-sm border-0 w-100">
                <div className="card-body p-4 p-md-5">
                    <h1 className="h2 text-center mb-4">Connexion</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Adresse e-mail</Form.Label>
                            <Form.Control
                                type="email"
                                name="username"
                                placeholder="nom@exemple.fr"
                                autoComplete="email"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Mot de passe"
                                    autoComplete="current-password"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        <Button className="w-100" variant="primary" type="submit">
                            Se connecter
                        </Button>
                    </Form>
                    <p className="text-center mb-0 mt-4">
                        Pas encore inscrit ? <Link to="/register">S'inscrire</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
 
export default LoginPage;