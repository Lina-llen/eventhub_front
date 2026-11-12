import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import authServices from '../Services/authServices'

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams()
    const resetToken = searchParams.get("token")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage(null)

        if (password !== confirmPassword) {
            setMessage({ type: "danger", text: "Les mots de passe ne correspondent pas." })
            return
        }

        setIsPending(true)
        try {
            const response = await authServices.resetPassword(resetToken, password)
            setMessage({ type: "success", text: response.data.message })
        } catch (error) {
            console.error(error)
            setMessage({
                type: "danger",
                text: error.response?.data?.error || "La réinitialisation a échoué. Demande un nouveau lien."
            })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <main className="login-page d-flex align-items-center justify-content-center p-3">
            <section className="login-card card shadow-sm border-0 w-100">
                <div className="card-body p-4 p-md-5">
                    <h1 className="h2 text-center mb-4">Nouveau mot de passe</h1>
                    {!resetToken ? (
                        <div className="alert alert-danger" role="alert">
                            Le lien de réinitialisation est invalide ou incomplet.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="resetPassword" className="form-label">Nouveau mot de passe</label>
                                <input
                                    type="password"
                                    id="resetPassword"
                                    className="form-control"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmResetPassword" className="form-label">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    id="confirmResetPassword"
                                    className="form-control"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {message && (
                                <div className={`alert alert-${message.type}`} role="alert">
                                    {message.text}
                                </div>
                            )}
                            <button className="btn btn-primary w-100" type="submit" disabled={isPending}>
                                {isPending ? "Modification en cours..." : "Modifier le mot de passe"}
                            </button>
                        </form>
                    )}
                    <p className="text-center mb-0 mt-4">
                        <Link to="/login">Retour à la connexion</Link>
                    </p>
                </div>
            </section>
        </main>
    )
}

export default ResetPasswordPage
