import axios from "axios";
import { showMessage } from "../../utils/ShowToast";


export const createBoardApi = async (userId, title) => {
    try {
        console.log(userId,title);
      const res = await axios.post(`http://localhost:8080/board/createBoard/${userId}`, {
        title,  
      });
  
      if (res.status === 201) { 
        showMessage("success", res.data.message || "Board Created Successfully");
        return res.data;
      } else {
        throw new Error(res.data.message || "Unexpected error");
      }
    } catch (error) {
        console.log(error);
      const errMsg = error.response?.data?.message || "Failed to create board";
      showMessage("error", errMsg);
      throw new Error(errMsg);
    }
  };
  

export const deleteBoardApi = async (boardId) => {
  try {
    const res = await axios.delete(`http://localhost:8080/board/deleteBoard/${boardId}`); 

    if (res.status === 200) {
      showMessage("success", res.data.message || "Board deleted Successfully");
      return res.data;
    } else {
      throw new Error(res.data.message || "Unexpected  error");
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to delete board";
    showMessage("error", errMsg);
    throw new Error(errMsg);
  }
};


export const getAllUserBoardApi = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/board/getBoard/${userId}`); 
  
      if (res.status === 200) {
        showMessage("success", res.data.message );
        return res.data;
      } else {
        throw new Error(res.data.message || "Unexpected  error");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to load board";
      showMessage("error", errMsg);
      throw new Error(errMsg);
    }
  };
  


  
export const createListApi = async (boardId, title) => {
    try {
        console.log(boardId,title);
      const res = await axios.post(`http://localhost:8080/list/createList/${boardId}`, {
        title,  
      });
  
      if (res.status === 201) { 
        showMessage("success", res.data.message || "List Created Successfully");
        return res.data;
      } else {
        throw new Error(res.data.message || "Unexpected error");
      }
    } catch (error) {
        console.log(error);
      const errMsg = error.response?.data?.message || "Failed to create List";
      showMessage("error", errMsg);
      throw new Error(errMsg);
    }
  };
  