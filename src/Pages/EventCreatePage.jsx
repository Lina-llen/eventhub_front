import { useState } from "react";
import { useNavigate } from "react-router";
import eventServices from "../Services/eventServices";

const EventCreatePage = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: "",
        description: "",
        date: "",
        location: ""
    });
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((currentEvent) => ({
            ...currentEvent,
            [name]: value
        }));
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsSubmitting(true);

        try {
            await eventServices.insert({
                ...event,
                date: event.date.replace("T", " ") + ":00"
            });
            setMessage({
                type: "success",
                text: "L'événement a bien été créé."
            });
            setEvent({
                title: "",
                description: "",
                date: "",
                location: ""
            });
        } catch (error) {
            console.error(error);
            setMessage({
                type: "danger",
                text: error.response?.data?.message ||
                    error.response?.data?.error ||
                    "La création de l'événement a échoué. Réessaie."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container py-5">
            <button
                type="button"
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate("/events")}
            >
                ← Retour aux événements
            </button>

            <section className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                    <h1 className="h2 fw-bold mb-4">Créer un événement</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titre</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={event.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows="5"
                                value={event.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date et heure</label>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                className="form-control"
                                value={event.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="form-label">Lieu</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                value={event.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {message && (
                            <div className={`alert alert-${message.type}`} role="alert">
                                {message.text}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? "Création..." : "Créer l'événement"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default EventCreatePage;
