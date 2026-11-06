import { useEffect, useState } from 'react';
import eventServices from '../Services/eventServices';
import { useNavigate } from "react-router";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isCurrentRequest = true;

        eventServices.getAll()
            .then((response) => {
                if (isCurrentRequest) {
                    setEvents(response.data);
                }
            })
            .catch((error) => {
                if (isCurrentRequest) {
                    console.error(error);
                }
            });

        return () => {
            isCurrentRequest = false;
        };
    }, []);

    return (
        <main className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 pb-3 border-bottom">
                <h1 className="h2 fw-bold mb-0">Page des événements</h1>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/events/create")}
                >
                    <i className="bi bi-plus-lg me-2" aria-hidden="true" />
                    Créer un événement
                </button>
            </div>

            <ul className="list-unstyled d-flex flex-column gap-3">
                {events.map((event) => (
                    <li
                        key={event.ev_id}
                        className="card border-0 shadow-sm p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
                    >
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            <span className="fw-bold fs-5">{event.ev_title}</span>
                            <span className="text-secondary">{event.ev_location}</span>
                            <span className="badge bg-light text-dark border px-2 py-1">{event.us_username}</span>
                            <span className="text-muted small">
                                {new Date(event.ev_date).toLocaleDateString()}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-primary px-3"
                            onClick={() => navigate("/event/" + event.ev_id)}
                        >
                            Voir détails
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default EventsPage;
