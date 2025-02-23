import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SignupAsync } from "../features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthUser } from "../features/AuthSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(AuthUser);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    UserName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.UserName.trim() ||!data.email.trim() || !data.password.trim()) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await dispatch(SignupAsync(data)).unwrap();

      console.log("login success:", res);
      navigate("/logIn");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  }
console.log(data);
  return (
    <div   style={{ backgroundImage: "url('/backgroundpic.avif')" }} 
     className="p-10 bg-cover bg-center text-white flex h-screen flex-col justify-center items-center">
      <div className="bg-slate-700 rounded-lg p-10 w-96">
        <h1 className="text-3xl mb-3 font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="UserName" placeholder="User Name" value={data.UserName} onChange={handleChange} className="w-full px-4 text-black py-2 border rounded-lg" />
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} className="w-full px-4 text-black py-2 border rounded-lg" />
         <div className="flex relative items-center">

         <input 
  type={showPassword ? "text" : "password"} 
  name="password" 
  placeholder="Password" 
  value={data.password} 
  onChange={handleChange} 
  className="w-full px-4 py-2 text-black border rounded-lg" 
/>
          

          <div
              className="absolute right-2 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>

         </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <Link to="/login">
            <p className="text-sm font-semibold mt-2">Already have an account? <span className="underline">Login</span></p>
          </Link>
        </form>
      </div>
    </div>
  );
}
