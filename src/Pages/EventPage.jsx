import { useNavigate, useParams } from "react-router";
import eventServices from "../Services/eventServices";
import { useEffect, useState } from "react";
import participantServices from "../Services/participantServices";
import userServices from "../Services/userServices";
import commentsServices from "../Services/commentsServices";

const isUserParticipating = (participants, user) => Boolean(
    user?.us_id &&
    participants?.some(
        (participant) =>
            String(participant.us_id ?? participant.pa_user) === String(user.us_id)
    )
);

const EventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [loadedEventId, setLoadedEventId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isParticipating, setIsParticipating] = useState(false);
    const [participationMessage, setParticipationMessage] = useState(null);
    const [isParticipationPending, setIsParticipationPending] = useState(false);
    const [comment, setComment] = useState("");
    const [commentMessage, setCommentMessage] = useState(null);
    const [isCommentPending, setIsCommentPending] = useState(false);

    const fetchEventById = async (user = currentUser) => {
        try {
            const response = await eventServices.getById(id);
            console.log("Événement reçu :", response.data);
            setEvent(response.data);
            setLoadedEventId(id);
            setIsParticipating(isUserParticipating(response.data.participants, user));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let isCurrentRequest = true;

        userServices.getMe()
            .then((response) => {
                if (!isCurrentRequest) {
                    return;
                }

                const user = response.data;
                setCurrentUser(user);
                return eventServices.getById(id).then((eventResponse) => {
                    if (isCurrentRequest) {
                        console.log("Événement reçu :", eventResponse.data);
                        setEvent(eventResponse.data);
                        setLoadedEventId(id);
                        setIsParticipating(
                            isUserParticipating(eventResponse.data.participants, user)
                        );
                    }
                });
            })
            .catch((error) => {
                if (isCurrentRequest) {
                    console.error(error);
                    setParticipationMessage({
                        type: "danger",
                        text: "Impossible de vérifier ton inscription. Réessaie plus tard."
                    });
                }
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [id]);

    const handleParticip = async () => {
        setParticipationMessage(null);
        setIsParticipationPending(true);
        try {
            await participantServices.insert(id);
            setIsParticipating(true);
            setParticipationMessage({
                type: "success",
                text: "Tu es bien inscrit à cet événement."
            });
            await fetchEventById();
        } catch (error) {
            console.error(error);
            if (error.response?.status === 409) {
                await fetchEventById();
                setIsParticipating(true);
            } else {
                setParticipationMessage({
                    type: "danger",
                    text: error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message ||
                        "L'inscription a échoué. Réessaie."
                });
            }
        } finally {
            setIsParticipationPending(false);
        }
    };

    const handleUnparticip = async () => {
        setParticipationMessage(null);
        setIsParticipationPending(true);
        try {
            await participantServices.deleteP(currentUser.us_id, id);
            setIsParticipating(false);
            setParticipationMessage({
                type: "success",
                text: "Tu es bien désinscrit de cet événement."
            });
            await fetchEventById();
        } catch (error) {
            console.error(error);
            setParticipationMessage({
                type: "danger",
                text: error.response?.data?.message ||
                    error.response?.data?.error ||
                    error.message ||
                    "La désinscription a échoué. Réessaie."
            });
        } finally {
            setIsParticipationPending(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentMessage(null);

        if (!comment.trim()) {
            setCommentMessage({
                type: "warning",
                text: "Le commentaire ne peut pas être vide."
            });
            return;
        }

        setIsCommentPending(true);
        try {
            await commentsServices.insert({
                comment: comment.trim(),
                event: id
            });
            setComment("");
            setCommentMessage({
                type: "success",
                text: "Ton commentaire a bien été ajouté."
            });
            await fetchEventById();
        } catch (error) {
            console.error(error);
            setCommentMessage({
                type: "danger",
                text: error.response?.data?.message ||
                    error.response?.data?.error ||
                    "L'ajout du commentaire a échoué. Réessaie."
            });
        } finally {
            setIsCommentPending(false);
        }
    }
    return (
        <main className="container py-5">
            <button 
                type="button"
                className="btn btn-outline-secondary mb-4 px-3"
                onClick={() => navigate("/events")}
            >
                ← Retour aux événements
            </button>

            <article className="card border-0 shadow-sm p-4 p-md-5">
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <h1 className="h2 fw-bold mb-0">{event.ev_title}</h1>
                    <div className="text-end">
                        {isParticipating ? (
                            <button
                                type="button"
                                className="btn btn-outline-danger px-4"
                                onClick={handleUnparticip}
                                disabled={isParticipationPending || loadedEventId !== id}
                            >
                                {isParticipationPending ? "Mise à jour..." : "Se désinscrire"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary px-4"
                                onClick={handleParticip}
                                disabled={isParticipationPending || !currentUser || loadedEventId !== id}
                            >
                                {isParticipationPending ? "Mise à jour..." : "Je participe"}
                            </button>
                        )}
                        {participationMessage && (
                            <div
                                className={`alert alert-${participationMessage.type} d-flex align-items-center gap-2 text-start rounded-3 shadow-sm mt-2 mb-0`}
                                role="alert"
                            >
                                <i
                                    className={`bi ${
                                        participationMessage.type === "success"
                                            ? "bi-check-circle-fill"
                                            : "bi-exclamation-triangle-fill"
                                    }`}
                                    aria-hidden="true"
                                />
                                {participationMessage.text}
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-3 text-muted mb-4 pb-3 border-bottom">
                    <span>
                        {event.ev_date ? new Date(event.ev_date).toLocaleDateString() : ''}
                    </span>
                    <span>•</span>
                    <span className="text-secondary">
                        {event.ev_location}
                    </span>
                    {event.us_username && (
                        <>
                            <span>•</span>
                            <span className="badge bg-light text-dark border px-2 py-1">
                                {event.us_username}
                            </span>
                        </>
                    )}
                </div>

                <div className="lead text-secondary">
                    <p className="mb-0">{event.ev_description}</p>
                </div>

                {/* Section Participants */}
                {event.participants && (
                    <div className="mt-5 pt-4 border-top">
                        <h2 className="h5 fw-bold mb-3">Participants</h2>
                        {event.participants.length > 0 ? (
                            <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                                {event.participants.map((participant, index) => (
                                    <li 
                                        key={participant.us_id || index}
                                        className="badge bg-light text-dark border px-3 py-2 fs-6 fw-normal"
                                    >
                                        {participant.us_username}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted small mb-0">Aucun participant pour le moment.</p>
                        )}
                    </div>
                )}

                {/* Section Commentaires */}
                {event.comments && (
                    <div className="mt-5 pt-4 border-top">
                        <h2 className="h5 fw-bold mb-3">Commentaires</h2>
                        {event.comments.length > 0 ? (
                            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                                {event.comments.map((comment, index) => (
                                    <li 
                                        key={comment.co_id || index}
                                        className="bg-light rounded-3 p-3 border"
                                    >
                                        {comment.us_username && (
                                            <div className="fw-semibold small text-dark mb-1">
                                                {comment.us_username}
                                            </div>
                                        )}
                                        <p className="mb-0 text-secondary">{comment.co_comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted small mb-0">Aucun commentaire pour le moment.</p>
                        )}
                    </div>
                )}

                <form className="mt-5 pt-4 border-top" onSubmit={handleSubmit}>
                    <label htmlFor="comment" className="form-label fw-bold">
                        Ajouter un commentaire
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        className="form-control mb-3"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Écris ton commentaire..."
                        required
                    />
                    {commentMessage && (
                        <div
                            className={`alert alert-${commentMessage.type} d-flex align-items-center gap-2 rounded-3 shadow-sm`}
                            role="alert"
                            aria-live="polite"
                        >
                            <i
                                className={`bi ${
                                    commentMessage.type === "success"
                                        ? "bi-check-circle-fill"
                                        : commentMessage.type === "warning"
                                            ? "bi-exclamation-circle-fill"
                                            : "bi-exclamation-triangle-fill"
                                }`}
                                aria-hidden="true"
                            />
                            <span>{commentMessage.text}</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isCommentPending}
                    >
                        {isCommentPending ? "Envoi..." : "Envoyer le commentaire"}
                    </button>
                </form>
            </article>
        </main>
    );
};

export default EventPage;