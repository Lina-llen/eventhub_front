import { useParams } from "react-router";
import eventServices from "../Services/eventServices";

const EventPage = () => {
    const { id } = useParams();

    const fetchEventById = async () => {
        try {
            const response = await eventServices.getById(id);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEventById();
}, [id])

return <>
    <h1>Page de détails des événements</h1>
    <h2> {id} </h2>
</>;
}

export default EventPage;