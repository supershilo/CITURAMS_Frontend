import AdminHomeFrame from "./AdminHomeFrame";

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="relative container mx-auto py-8 w-full px-6">
                <AdminHomeFrame />
                {children}
            </div>
        </>
    );
}