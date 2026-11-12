import { useState } from 'react'
import { Link } from 'react-router'
import authServices from '../Services/authServices'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage(null)
        setIsPending(true)

        try {
            const response = await authServices.forgotPassword(email)
            setMessage({
                type: "success",
                text: response.data.message
            })
        } catch (error) {
            console.error(error)
            setMessage({
                type: "danger",
                text: error.response?.data?.error || "L'envoi de l'e-mail a échoué. Réessaie plus tard."
            })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <main className="login-page d-flex align-items-center justify-content-center p-3">
            <section className="login-card card shadow-sm border-0 w-100">
                <div className="card-body p-4 p-md-5">
                    <h1 className="h2 text-center mb-3">Mot de passe oublié</h1>
                    <p className="text-secondary text-center mb-4">
                        Saisis l'adresse e-mail associée à ton compte pour recevoir un lien de réinitialisation.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="forgotEmail" className="form-label">Adresse e-mail</label>
                            <input
                                type="email"
                                id="forgotEmail"
                                className="form-control"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {message && (
                            <div className={`alert alert-${message.type}`} role="alert">
                                {message.text}
                            </div>
                        )}
                        <button className="btn btn-primary w-100" type="submit" disabled={isPending}>
                            {isPending ? "Envoi en cours..." : "Envoyer le lien"}
                        </button>
                    </form>
                    <p className="text-center mb-0 mt-4">
                        <Link to="/login">Retour à la connexion</Link>
                    </p>
                </div>
            </section>
        </main>
    )
}

export default ForgotPasswordPage
