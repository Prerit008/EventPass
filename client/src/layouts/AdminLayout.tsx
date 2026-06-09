import {
    Link,
    Outlet,
} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">

            <aside className="w-64 bg-gray-900 text-white p-4">

                <h2 className="text-xl font-bold mb-6">
                    EventPass
                </h2>

                <div className="space-y-4">

                    <Link to="/admin">
                        Dashboard
                    </Link>

                    <br />

                    <Link to="/admin/events">
                        Events
                    </Link>

                    <br />

                    <Link to="/admin/scanner">
                        Scanner
                    </Link>

                </div>

            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;