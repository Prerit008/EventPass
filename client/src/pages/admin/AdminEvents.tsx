import {
    useEffect,
    useState,
} from "react";

import {
    getAllEventsAdmin, deleteEvent
}
    from "../../api/adminEventApi";


const AdminEvents = () => {

    const [
        events,
        setEvents
    ] = useState<any[]>([]);

    const fetchEvents =
        async () => {
            const data = await getAllEventsAdmin();
            setEvents(data.events);
        };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete =
        async (
            id: string
        ) => {

            const confirmDelete =
                window.confirm(
                    "Delete event?"
                );

            if (
                !confirmDelete
            )
                return;

            await deleteEvent(
                id
            );

            fetchEvents();
        };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6"> Events </h1>
            {events.map(
                (event) => (

                    <div
                        key={event._id}
                        className="
   border
   p-4
   rounded
   mb-4
   "
                    >

                        <h2
                            className="
    text-xl
    font-bold
    "
                        >
                            {event.title}
                        </h2>

                        <p>
                            {event.venue}
                        </p>

                        <p>
                            ₹{event.price}
                        </p>

                        <button
                            onClick={() =>
                                handleDelete(
                                    event._id
                                )
                            }
                        >
                            Delete
                        </button>                    </div>

                )

            )}


        </div>
    );
};

export default AdminEvents;