import { useEffect, useState } from 'react';
import eventServices from '../Services/eventServices';
import { useNavigate } from "react-router";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const events = await eventServices.getAll();
            setEvents(events.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <main className="container py-5">
            <h1 className="h2 fw-bold mb-4 pb-3 border-bottom">Page des événements</h1>

            <ul className="list-unstyled d-flex flex-column gap-3">
                {events.map((event) => (
                    <li
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
