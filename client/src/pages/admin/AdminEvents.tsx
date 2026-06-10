import { useEffect, useState } from "react";
import {
    getAllEventsAdmin,
    deleteEvent,
    createEvent,
} from "../../api/adminEventApi";

const AdminEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        banner: "",
        venue: "",
        startDate: "",
        endDate: "",
        price: 0,
        capacity: 0,
    });

    const fetchEvents = async () => {
        try {
            const data = await getAllEventsAdmin();
            setEvents(data.events);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreateEvent = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            await createEvent(formData);
            setShowModal(false);

            setFormData({
                title: "",
                description: "",
                banner: "",
                venue: "",
                startDate: "",
                endDate: "",
                price: 0,
                capacity: 0,
            });

            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.type === "number"
                    ? Number(e.target.value)
                    : e.target.value,
        }));
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this event?")) return;

        try {
            await deleteEvent(id);
            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Event Management
                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                >
                    Create Event
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                    <form
                        onSubmit={handleCreateEvent}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6"
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            Create New Event
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Event Title"
                                className="border rounded-lg p-3"
                            />

                            <input
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                placeholder="Venue"
                                className="border rounded-lg p-3"
                            />

                            <input
                                name="banner"
                                value={formData.banner}
                                onChange={handleChange}
                                placeholder="Banner URL"
                                className="border rounded-lg p-3 md:col-span-2"
                            />

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Description"
                                className="border rounded-lg p-3 md:col-span-2"
                            />

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder="Capacity"
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Event List */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-5"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {event.title}
                        </h2>

                        <p className="text-gray-600 mb-2">
                            📍 {event.venue}
                        </p>

                        <p className="text-green-600 font-semibold mb-4">
                            ₹{event.price}
                        </p>

                        <button
                            onClick={() => handleDelete(event._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Delete Event
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEvents;