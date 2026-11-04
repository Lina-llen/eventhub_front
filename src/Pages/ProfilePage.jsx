import {useEffect, useState} from "react";
import userServices from "../Services/userServices";

const ProfilePage = () => {
    const [user,setUser] = useState({});
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [changePassword, setChangePassword] = useState({
        old_password : "",
        new_password : "",
        confirm_password : "",
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setChangePassword({...changePassword, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await userServices.resetPassword(changePassword);
            console.log(response);
        }catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await userServices.getMe();
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMe();
    }, []);

const comments = user.comments || [];
const participations = user.participations || [];
const events = user.events || [];

return (
    <main className="container py-4 py-md-5">
        <header className="mb-4">
            <p className="text-primary fw-semibold mb-1">Mon espace</p>
            <h1 className="h2 fw-bold mb-1">Mon profil</h1>
            <p className="text-secondary mb-0">Retrouvez vos informations et votre activité.</p>
        </header>

        <section className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
                <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                        style={{ width: "4rem", height: "4rem" }}
                        aria-hidden="true"
                    >
                        <i className="bi bi-person fs-2"></i>
                    </div>
                    <div>
                        <h2 className="h4 fw-bold mb-1">{user.us_username}</h2>
                        <p className="text-secondary mb-0">{user.us_email}</p>
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-4">
                    <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2">
                        {comments.length} commentaire{comments.length === 1 ? "" : "s"}
                    </span>
                    <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                        {participations.length} participation{participations.length === 1 ? "" : "s"}
                    </span>
                    <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary px-3 py-2">
                        {events.length} événement{events.length === 1 ? "" : "s"} créé{events.length === 1 ? "" : "s"}
                    </span>
                </div>
            </div>
        </section>

        <div className="row g-4">
            <div className="col-12 col-lg-6">
                <section className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                            <h2 className="h5 fw-bold mb-0">Mes commentaires</h2>
                            <span className="badge rounded-pill bg-primary">{comments.length}</span>
                        </div>
                        {comments.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {comments.map((comment) => (
                                    <li key={comment.co_id} className="list-group-item px-0">
                                        {comment.co_comment}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-secondary mb-0">Vous n'avez pas encore rédigé de commentaire.</p>
                        )}
                    </div>
                </section>
            </div>

            <div className="col-12 col-lg-6">
                <section className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                            <h2 className="h5 fw-bold mb-0">Mes participations</h2>
                            <span className="badge rounded-pill bg-success">{participations.length}</span>
                        </div>
                        {participations.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {participations.map((event) => (
                                    <li key={`${event.pa_user}-${event.pa_event}`} className="list-group-item px-0">
                                        {event.ev_title}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-secondary mb-0">Vous ne participez à aucun événement pour le moment.</p>
                        )}
                    </div>
                </section>
            </div>

            <div className="col-12">
                <section className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                            <h2 className="h5 fw-bold mb-0">Mes événements créés</h2>
                            <span className="badge rounded-pill bg-secondary">{events.length}</span>
                        </div>
                        {events.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {events.map((event) => (
                                    <li key={event.ev_id} className="list-group-item px-0">
                                        {event.ev_title}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-secondary mb-0">Vous n'avez pas encore créé d'événement.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>

        <section className="card border-0 shadow-sm mt-4">
            <div className="card-body p-4">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                    <div>
                        <h2 className="h5 fw-bold mb-1">Sécurité</h2>
                        <p className="text-secondary mb-0">Modifiez le mot de passe de votre compte.</p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        aria-expanded={showPasswordForm}
                        aria-controls="change-password-form"
                    >
                        {showPasswordForm ? "Annuler" : "Modifier mon mot de passe"}
                    </button>
                </div>

                {showPasswordForm && (
                    <form id="change-password-form" className="mt-4 pt-4 border-top" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="old_password" className="form-label">Ancien mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                name="old_password"
                                id="old_password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={changePassword.old_password}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new_password" className="form-label">Nouveau mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                name="new_password"
                                id="new_password"
                                autoComplete="new-password"
                                onChange={handleChange}
                                value={changePassword.new_password}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm_password" className="form-label">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                id="confirm_password"
                                autoComplete="new-password"
                                onChange={handleChange}
                                value={changePassword.confirm_password}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Changer le mot de passe
                        </button>
                    </form>
                )}
            </div>
        </section>
    </main>
);
};

export default ProfilePage;