import Navbar from "../../Components/Navbar/Navbar";

const AdminDashboard = () => {
  

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Navbar */}
      <Navbar />
      

      {/* Main Content */}
      <main className="flex-grow w-full p-4">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        {/* Additional content can go here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
