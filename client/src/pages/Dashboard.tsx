import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    getMyTickets,
} from "../api/ticketApi";

const Dashboard = () => {
    const [tickets, setTickets] =
        useState<any[]>([]);

    useEffect(() => {
        const fetchTickets =
            async () => {
                try {
                    const data =
                        await getMyTickets();

                    setTickets(
                        data.tickets
                    );
                } catch (error) {
                    console.log(error);
                }
            };

        fetchTickets();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Tickets
            </h1>

            {tickets.length === 0 ? (
                <p>
                    No tickets found
                </p>
            ) : (
                tickets.map(
                    (ticket) => (
                        <div
                            key={ticket._id}
                            className="border rounded p-4 mb-4"
                        >
                            <h2 className="font-bold">
                                {
                                    ticket.eventId
                                        ?.title
                                }
                            </h2>

                            <p>
                                Ticket:
                                {
                                    ticket.ticketCode
                                }
                            </p>

                            <Link
                                to={`/ticket/${ticket._id}`}
                                className="text-blue-500"
                            >
                                View Ticket
                            </Link>
                        </div>
                    )
                )
            )}
        </div>
    );
};

export default Dashboard;