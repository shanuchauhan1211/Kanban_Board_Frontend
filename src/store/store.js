import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import boardReducer  from "../features/dashboard/DashboardSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    board:boardReducer,
    
  },
});

export default store;
