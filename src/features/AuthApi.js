import axios from "axios";
import { showMessage } from "../utils/ShowToast";

export const SignupApi = async (details) => {
  try {
    const res = await axios.post(`https://kanban-board-backend-1.onrender.com/auth/register`, details);

    if (res.status === 201) { // Change 200 → 201 (correct for user creation)
      showMessage("success", res.data.message || "Signup Successful");
      return res.data;
    } else {
      throw new Error(res.data.message || "Unexpected signup error");
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to Signup";
    showMessage("error", errMsg);
    throw new Error(errMsg);
  }
};

export const logInApi = async (data) => {
  try {
    const res = await axios.post(`https://kanban-board-backend-1.onrender.com/auth/login`, data); 

    if (res.status === 200) {
      showMessage("success", res.data.message || "Sign in Successful");
      return res.data;
    } else {
      throw new Error(res.data.message || "Unexpected login error");
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to Sign in";
    showMessage("error", errMsg);
    throw new Error(errMsg);
  }
};
