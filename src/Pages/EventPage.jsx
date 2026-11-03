import { useEffect } from 'react';
import eventServices from '../Services/eventServices';

const EventPage = () => {

    const fetchEvents = async () => {

        try {
            const events = await eventServices.getAll();
            console.log(events)
        } catch (error) {
            console.error(error);
        }
    }  

    useEffect(() => {
        fetchEvents();
    },[])


    return <>
        <h1>Page des événements</h1>

    </>;
}
 
export default EventPage;