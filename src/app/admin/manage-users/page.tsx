export default function ManageUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Manage Users</h1>
      <p className="text-gray-600 mb-6">From this page, you will be able to view, edit, and delete users.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        {/* Placeholder for the user table */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">User data table will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
