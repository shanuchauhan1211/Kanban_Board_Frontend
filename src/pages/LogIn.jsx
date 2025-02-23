import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logInAsync} from "../features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthUser } from "../features/AuthSlice";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(AuthUser);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    emailOrname: "",
    password: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.emailOrname.trim() || !data.password.trim()) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await dispatch(logInAsync(data)).unwrap();
      console.log("login success:", res);
      toast.success(res.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("login failed:", error);
    }
  }

  return (
    <div   style={{ backgroundImage: "url('/backgroundpic.avif')" }} 
     className="p-10 bg-cover  bg-center text-white flex h-screen flex-col justify-center items-center">
      <div className="bg-slate-700 rounded-lg p-10 w-96">
        <h1 className="text-3xl mb-3 font-bold">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="emailOrname" placeholder="Email Or Name" value={data.emailOrname} onChange={handleChange} className="w-full px-4 text-black py-2 border rounded-lg" />
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
            {loading ? "Loading..." : "Log In"}
          </button>
          <Link to="/signUp">
            <p className="text-sm font-semibold mt-2">Not registered yet ? <span className="underline">SignUp</span></p>
          </Link>
        </form>
      </div>
    </div>
  );
}
