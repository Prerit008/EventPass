import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/eventApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faMagnifyingGlass,
    faUsers,
    faTicket
} from "@fortawesome/free-solid-svg-icons";
import type { Event } from "../types/event.types";
export default function Events() {
    const [events, setEvents] =
        useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents =
            async () => {
                const data =
                    await getEvents();

                setEvents(
                    data.events
                );
            };

        fetchEvents();
    }, []);

    if (!events.length) {
        return (
            <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center text-white">
                Loading events...
            </div>
        );
    }
    const featuredEvent = events[0];

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white">
            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-700/20 blur-[180px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-8">
                {/* HERO */}
                <section className="relative overflow-hidden rounded-[32px] h-[550px] mb-16 border border-white/10">
                    <img
                        src={featuredEvent.banner}
                        alt={featuredEvent.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute top-6 right-6">
                        <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium">
                            Published
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                                {featuredEvent.title}
                            </h1>

                            <p className="text-zinc-300 text-lg mb-6">
                                {featuredEvent.description}
                            </p>

                            <div className="flex flex-wrap gap-5 text-zinc-300 mb-8">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <span>Aug 10 - Aug 11</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <span>{featuredEvent.venue}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-bold">
                                    ₹{featuredEvent.price}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link to={featuredEvent.slug} className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all duration-300 font-medium">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEARCH + FILTERS */}
                <section className="mb-12">
                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-5">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>

                            <select className="bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-zinc-300">
                                <option>All Events</option>
                            </select>

                            <select className="bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-zinc-300">
                                <option>This Month</option>
                            </select>

                            <select className="bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-zinc-300">
                                <option>Sort By</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* SECTION TITLE */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Upcoming Events</h2>
                        <p className="text-zinc-400 mt-2">
                            Discover experiences worth attending
                        </p>
                    </div>
                </div>

                {/* EVENTS GRID */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {events.map((event) => {
                        const percentage =
                            (event.registeredCount / event.capacity) * 100;

                        return (
                            <article
                                key={event._id}
                                className="group bg-[#151518] border border-white/10 rounded-[28px] overflow-hidden hover:border-violet-500/30 hover:shadow-[0_20px_60px_rgba(124,58,237,0.25)] transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* IMAGE */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={event.banner}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-xs">
                                            {event.status}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-zinc-400 mb-6 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="space-y-3 text-sm text-zinc-300 mb-6">
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            <span>{event.venue}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            <span>Aug 10 - Aug 11</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faUsers} />

                                            <span>
                                                {event.registeredCount}/{event.capacity} Registered
                                            </span>
                                        </div>
                                    </div>

                                    {/* PROGRESS */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs text-zinc-400 mb-2">
                                            <span>Capacity</span>
                                            <span>{Math.round(percentage)}%</span>
                                        </div>

                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-3xl font-bold">
                                                ₹{event.price}
                                            </span>
                                        </div>

                                        <Link to={event.slug} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all duration-300">
                                            <FontAwesomeIcon icon={faTicket} />
                                            Ticket
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {/* CTA */}
                <section className="mt-20">
                    <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 backdrop-blur-xl p-10 text-center">
                        <h3 className="text-4xl font-bold mb-4">
                            Ready for your next experience?
                        </h3>

                        <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                            Discover exclusive events, seamless QR ticketing and unforgettable
                            experiences.
                        </p>

                        <button className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all duration-300 font-medium">
                            Explore More Events
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}