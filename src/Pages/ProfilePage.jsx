import {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/monarch/theme.css";
import "@fullcalendar/react/themes/monarch/palettes/purple.css";
import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import frLocale from "@fullcalendar/react/locales/fr";
import { useNavigate } from "react-router";
import userServices from "../Services/userServices";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    const [showProfileActions, setShowProfileActions] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profile, setProfile] = useState({ username: "", email: "" });
    const [profileField, setProfileField] = useState("username");
    const [profileMessage, setProfileMessage] = useState(null);
    const [isProfilePending, setIsProfilePending] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [changePassword, setChangePassword] = useState({
        old_password : "",
        new_password : "",
        confirm_password : "",
    });
    const [passwordMessage, setPasswordMessage] = useState(null);

    const handleProfileChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
        setProfileMessage(null);
    }

    const openProfileModal = (field) => {
        setProfile({
            username: user.us_username || "",
            email: user.us_email || ""
        });
        setProfileField(field);
        setProfileMessage(null);
        setShowProfileModal(true);
    }

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileMessage(null);
        setIsProfilePending(true);

        try {
            const updatedValue = profile[profileField].trim();
            await userServices.updateMe({[profileField]: updatedValue});
            const userField = profileField === "username" ? "us_username" : "us_email";
            setUser({...user, [userField]: updatedValue});
            setShowProfileModal(false);
        } catch (error) {
            console.error(error);
            setProfileMessage({
                type: "danger",
                text: error.response?.data?.message || error.response?.data?.error || "La modification du profil a échoué."
            });
        } finally {
            setIsProfilePending(false);
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setChangePassword({...changePassword, [name] : value});
        setPasswordMessage(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordMessage(null);
        if (changePassword.new_password !== changePassword.confirm_password) {
            setPasswordMessage({
                type: "danger",
                text: "Les mots de passe ne correspondent pas."
            });
            return;
        }

        try {
            const response = await userServices.resetPassword(changePassword);
            console.log(response);
            setPasswordMessage({
                type: "success",
                text: "Votre mot de passe a bien été modifié."
            });
            setChangePassword({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });
        } catch (error) {
            console.error(error);
            setPasswordMessage({
                type: "danger",
                text: error.response?.data?.error || "Le changement de mot de passe a échoué. Vérifie ton ancien mot de passe."
            });
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
const calendarEvents = participations
    .filter((event) => event.ev_date)
    .map((event) => ({
        id: String(event.pa_event),
        title: event.ev_title,
        start: String(event.ev_date).slice(0, 10),
        allDay: true,
        extendedProps: {
            location: event.ev_location,
            description: event.ev_description
        }
    }));

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
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowProfileActions(!showProfileActions)}
                        aria-expanded={showProfileActions}
                        aria-controls="profile-actions"
                    >
                        {showProfileActions ? "Fermer les options" : "Modifier mon profil"}
                    </button>
                </div>

                {showProfileActions && (
                    <div id="profile-actions" className="d-flex flex-wrap gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => openProfileModal("username")}
                        >
                            Modifier mon pseudo
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => openProfileModal("email")}
                        >
                            Modifier mon e-mail
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => {
                                setPasswordMessage(null);
                                setShowPasswordModal(true);
                            }}
                        >
                            Modifier mon mot de passe
                        </button>
                    </div>
                )}

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

        <section className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                    <div>
                        <h2 className="h5 fw-bold mb-1">Mon calendrier</h2>
                        <p className="text-secondary mb-0">
                            Retrouvez les événements auxquels vous êtes inscrit.
                        </p>
                    </div>
                    <span className="badge rounded-pill bg-success">{calendarEvents.length}</span>
                </div>
                {calendarEvents.length > 0 ? (
                    <FullCalendar
                        plugins={[themePlugin, dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locale={frLocale}
                        events={calendarEvents}
                        eventClick={({ event }) => navigate(`/event/${event.id}`)}
                        height="auto"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: ""
                        }}
                        dayMaxEvents
                    />
                ) : (
                    <p className="text-secondary mb-0">
                        Vous n'êtes inscrit à aucun événement avec une date pour le moment.
                    </p>
                )}
            </div>
        </section>

        <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {profileField === "username" ? "Modifier mon pseudo" : "Modifier mon e-mail"}
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleProfileSubmit}>
                <Modal.Body>
                    {profileMessage && (
                        <div className={`alert alert-${profileMessage.type}`} role="alert">
                            {profileMessage.text}
                        </div>
                    )}
                    <div>
                        <label htmlFor={`profile${profileField}`} className="form-label">
                            {profileField === "username" ? "Nouveau pseudo" : "Nouvelle adresse e-mail"}
                        </label>
                        <input
                            type={profileField === "email" ? "email" : "text"}
                            id={`profile${profileField}`}
                            name={profileField}
                            className="form-control"
                            autoComplete={profileField}
                            value={profile[profileField]}
                            onChange={handleProfileChange}
                            required
                            disabled={isProfilePending}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowProfileModal(false)}
                        disabled={isProfilePending}
                    >
                        Annuler
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isProfilePending}>
                        {isProfilePending ? "Enregistrement..." : "Enregistrer"}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>

        <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modifier mon mot de passe</Modal.Title>
            </Modal.Header>
            <form id="change-password-form" onSubmit={handleSubmit}>
                <Modal.Body>
                    {passwordMessage && (
                        <div className={`alert alert-${passwordMessage.type}`} role="alert">
                            {passwordMessage.text}
                        </div>
                    )}
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
                            required
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm_password" className="form-label">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            id="confirm_password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            value={changePassword.confirm_password}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowPasswordModal(false)}
                    >
                        Annuler
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Changer le mot de passe
                    </button>
                </Modal.Footer>
            </form>
        </Modal>

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

    </main>
);
};

export default ProfilePage;