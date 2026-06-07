import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventBySlug } from "../api/eventApi";
import type { Event } from "../types/event.types";
import loadRazorpay from "../utils/loadRazorpay";
import { createOrder, verifyPayment } from "../api/paymentApi";

const EventDetails = () => {

    const { slug } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvent =
            async () => {
                const data =
                    await getEventBySlug(
                        slug!
                    );
                setEvent(data.event);
            };

        fetchEvent();
    }, [slug]);
    if (!event) {
        return <div>Loading...</div>;
    }

    const availableSeats = event.capacity - event.registeredCount;
    if (availableSeats <= 0) {
        alert("Event is sold out");
        return;
    }
    const handleBuyTicket = async () => {
        if (!event) return;
        const loaded = await loadRazorpay();
        if (!loaded) {
            alert("Failed to load Razorpay");
            return;
        }
        const orderData =
            await createOrder(
                event._id
            );
        const order = orderData.order;


        const options = {
            key:
                import.meta.env
                    .VITE_RAZORPAY_KEY,

            amount:
                order.amount,

            currency:
                order.currency,

            order_id:
                order.id,

            name:
                "EventPass",

            description:
                event.title,

            handler:
                async function (
                    response: any
                ) {
                    const result =
                        await verifyPayment(
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,

                                eventId:
                                    event._id,
                            }
                        );

                    console.log(result);
                },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (<>
        <section className="bg-slate-50 min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Banner */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <img
                        src={event.banner}
                        alt={event.title}
                        className="w-full h-[250px] md:h-[450px] object-cover"
                    />
                </div>

                {/* Content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                    {/* Left Side */}
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                            {event.title}
                        </h1>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-white p-4 shadow-sm border">
                                <p className="text-sm text-slate-500">📍 Venue</p>
                                <p className="font-semibold text-slate-900">
                                    {event.venue}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 shadow-sm border">
                                <p className="text-sm text-slate-500">📅 Date</p>
                                <p className="font-semibold text-slate-900">
                                    {new Date(event.startDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-slate-500">
                                    to {new Date(event.endDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 shadow-sm border">
                                <p className="text-sm text-slate-500">👥 Capacity</p>
                                <p className="font-semibold text-slate-900">
                                    {event.registeredCount} / {event.capacity}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 shadow-sm border">
                                <p className="text-sm text-slate-500">💰 Ticket Price</p>
                                <p className="font-semibold text-slate-900">
                                    {event.price > 0 ? `₹${event.price}` : "Free"}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8 rounded-xl bg-white border shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                About This Event
                            </h2>

                            <p className="text-slate-600 leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <aside className="lg:sticky lg:top-6 h-fit">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="text-center">
                                <p className="text-sm text-slate-500">
                                    Ticket Price
                                </p>

                                <h3 className="text-4xl font-bold text-slate-900 mt-2">
                                    {event.price > 0 ? `₹${event.price}` : "FREE"}
                                </h3>
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between text-sm text-slate-600 mb-2">
                                    <span>Seats Available</span>
                                    <span>{availableSeats}</span>
                                </div>

                                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                                    <div
                                        className="h-full bg-slate-900"
                                        style={{
                                            width: `${(event.registeredCount / event.capacity) * 100
                                                }%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full mt-6 rounded-lg bg-slate-900 px-4 py-3 text-white font-medium hover:bg-slate-800 transition"
                                onClick={handleBuyTicket}
                            >
                                Buy Ticket
                            </button>

                            <p className="mt-3 text-center text-xs text-slate-500">
                                Secure checkout • Instant confirmation
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section></>
    );
};

export default EventDetails;