import {
    useEffect,
    useState
} from "react";

import {
    getMyTickets
}
    from "../api/ticketApi";

const Dashboard = () => {
    const [
        tickets,
        setTickets
    ] = useState([]);

    useEffect(() => {
        const fetchTickets =
            async () => {
                const data =
                    await getMyTickets();

                setTickets(
                    data.tickets
                );
            };

        fetchTickets();
    }, []);

    return (
        <div>
            <h1>
                My Tickets
            </h1>

            {tickets.map(
                (ticket: any) => (
                    <div
                        key={ticket._id}
                    >
                        <h3>
                            {
                                ticket.eventId
                                    .title
                            }
                        </h3>

                        <p>
                            {
                                ticket.ticketCode
                            }
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default Dashboard;