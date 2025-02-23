import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="text-center p-10 flex flex-col bg-slate-400 justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/backgroundpic.avif')" }} 
    >
      <div className="bg-slate-700  p-10 rounded-lg">
        <h1 className="text-4xl font-bold text-white">Welcome to Kanban Board</h1>
        <p className="text-lg mt-4 text-gray-200">Manage your tasks visually and stay productive.</p>
        <div className="mt-6 space-x-4">
          <Link to="/login" className="duartion-300 bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-md">Login</Link>
          <Link to="/signup" className="duartion-300 bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-md">Signup</Link>
        </div>
      </div>
    </div>
  );
}
