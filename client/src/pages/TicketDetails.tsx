
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTicketById } from "../api/ticketApi"

export default function TicketDetails() {

    const { slug } = useParams();
    const [ticket, setTicket] = useState<any>(null);

    useEffect(() => {
        const fetchTicket =
            async () => {
                const data =
                    await getTicketById(
                        slug!
                    );
                setTicket(data.ticket);
            };

        fetchTicket();
    }, [slug]);
    if (!ticket) {
        return <div>Loading...</div>;
    }
    return (
        <div className="min-h-screen bg-slate-950">

            {/* HERO */}
            <section className="relative h-[420px] overflow-hidden">
                <img
                    src={ticket.eventId.banner}
                    alt={ticket.eventId.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />

                <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-end pb-12">
                    <div className="max-w-3xl">

                        <div className="flex flex-wrap gap-3 mb-5">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm">
                                Payment Successful
                            </span>

                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm">
                                Ticket Confirmed
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            {ticket.eventId.title}
                        </h1>

                        <p className="text-slate-300 mt-4 text-lg">
                            {ticket.eventId.description}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-8 text-slate-200">
                            <div>
                                <p className="text-sm text-slate-400">Venue</p>
                                <p className="font-medium">{ticket.eventId.venue}</p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">Start Date</p>
                                <p className="font-medium">
                                    {new Date(ticket.eventId.startDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">Ticket Price</p>
                                <p className="font-medium text-emerald-400">
                                    ₹{ticket.eventId.price}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Ticket Card */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold text-white">
                                    Ticket Details
                                </h2>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${ticket.checkedIn
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                >
                                    {ticket.checkedIn ? "Checked In" : "Pending Check-in"}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">

                                <div>
                                    <p className="text-slate-400 text-sm">Ticket Code</p>
                                    <p className="text-white text-lg font-semibold mt-2">
                                        {ticket.ticketCode}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">Booking Date</p>
                                    <p className="text-white mt-2">
                                        {new Date(ticket.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">Event ID</p>
                                    <p className="text-white break-all mt-2">
                                        {ticket.eventId._id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">Ticket ID</p>
                                    <p className="text-white break-all mt-2">
                                        {ticket._id}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Payment */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

                            <h2 className="text-xl font-semibold text-white mb-6">
                                Payment Information
                            </h2>

                            <div className="grid md:grid-cols-3 gap-6">

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Amount Paid
                                    </p>
                                    <p className="text-3xl font-bold text-emerald-400 mt-2">
                                        ₹{ticket.eventId.price}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Payment ID
                                    </p>
                                    <p className="text-white mt-2 break-all">
                                        {ticket.paymentId}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Status
                                    </p>
                                    <p className="text-emerald-400 font-semibold mt-2">
                                        Successful
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* QR PANEL */}
                    <div>

                        <div className="sticky top-8 rounded-3xl bg-white p-8 shadow-2xl">

                            <div className="text-center">

                                <h2 className="text-xl font-bold text-slate-900">
                                    Event Pass
                                </h2>

                                <p className="text-slate-500 text-sm mt-2">
                                    Scan for entry
                                </p>

                                <div className="mt-8 flex justify-center">
                                    <img
                                        src={ticket.qrData}
                                        alt="QR Code"
                                        className="w-72 h-72"
                                    />
                                </div>

                                <div className="mt-8 border-t pt-6">

                                    <p className="text-xs uppercase tracking-widest text-slate-500">
                                        Ticket Code
                                    </p>

                                    <p className="font-bold text-lg mt-2">
                                        {ticket.ticketCode}
                                    </p>

                                </div>

                                <button
                                    className="w-full mt-8 py-3 rounded-2xl bg-slate-950 text-white font-medium hover:bg-slate-800 transition"
                                >
                                    Download Ticket
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}