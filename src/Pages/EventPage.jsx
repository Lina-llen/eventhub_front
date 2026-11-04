import { useNavigate, useParams } from "react-router";
import eventServices from "../Services/eventServices";
import { useEffect, useState } from "react";
import participantServices from "../Services/participantServices";

const EventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [participationMessage, setParticipationMessage] = useState(null);

    const fetchEventById = async () => {
        try {
            const response = await eventServices.getById(id);
            console.log("Événement reçu :", response.data);
            setEvent(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEventById();
    }, [id]);


    const particip = async () => {
        setParticipationMessage(null);
        try {
            const response = await participantServices.insert(id);
            console.log("Participation réussie :", response.data);
            setParticipationMessage({
                type: "success",
                text: "Tu es bien inscrit à cet événement."
            });
            await fetchEventById();
        } catch (error) {
            console.error(error);
            if (error.response?.status === 409) {
                setParticipationMessage({
                    type: "warning",
                    text: "Tu es déjà inscrit à cet événement."
                });
            }
        }
    };

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
                <h1 className="h2 fw-bold mb-3">{event.ev_title}</h1>

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
                <div className="text-center mt-4">
                    {participationMessage && (
                        <div className={`alert alert-${participationMessage.type}`} role="alert">
                            {participationMessage.text}
                        </div>
                    )}
                    <button type="button" className="btn btn-primary px-4" onClick={particip}>Je participe</button>
                </div>
            </article>
        </main>
    );
};

export default EventPage;