import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBoardApi,deleteBoardApi, getAllUserBoardApi,createListApi, deleteListApi,getListByBoardApi, createTaskApi, updateTaskApi } from "./DashboardApi";


const initialState = {
  loading: false,
  boards: [],
  error: null,
  lists: {} ,
  tasks:{}
};


export const createBoardAsync = createAsyncThunk(
  "board/createBoard",
  async ({ userId, title }, { rejectWithValue }) => {
    try {
      const response = await createBoardApi( userId, title); 
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoardAsync = createAsyncThunk(
    "board/deleteBoard",
    async (boardId, { rejectWithValue }) => {
      try {
        const response = await deleteBoardApi(boardId); 
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const getAllBoardAsync = createAsyncThunk(
    "board/getBoard",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await getAllUserBoardApi(userId); 
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const createListAsync = createAsyncThunk(
    "list/createList",
    async ({ boardId, title }, { rejectWithValue }) => {
      try {
        const response = await createListApi( boardId, title); 
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteListAsync = createAsyncThunk(
    "list/deleteList",
    async ({listId,boardId}, { rejectWithValue }) => {
      
      try {
        const response = await deleteListApi(listId,boardId); 
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const createTaskAsync = createAsyncThunk(
    "task/createTask",
    async ({ listId, title }, { rejectWithValue }) => {
      try {
        const response = await createTaskApi( listId, title); 
        console.log(response)
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getListByBoardAsync = createAsyncThunk(
    "list/getList",
    async (boardId, { rejectWithValue }) => {
      try {
        const response = await getListByBoardApi(boardId); 
        console.log(response.list);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const updateTaskAsync = createAsyncThunk(
    "task/updateTask",
    async ({ taskId, priority }, { rejectWithValue }) => {
      try {
        const response = await updateTaskApi( taskId, priority); 
        console.log(response)
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteTaskAsync = createAsyncThunk(
    "task/deleteTask",
    async ({listId,taskId}, { rejectWithValue }) => {
      
      try {
        const response = await deleteListApi(listId,taskId); 
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );



export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.boards?.push(action?.payload?.Board); 
      })
      .addCase(createBoardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBoardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action?.payload?.boards; 
      })
      .addCase(deleteBoardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBoardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBoardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action?.payload?.boards; 
      })
      .addCase(getAllBoardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createListAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { boardId, list } = action.payload;
        if (!state.lists[boardId]) {
          state.lists[boardId] = [];
        }
        state.lists[boardId].push(list);  
      })
      
      .addCase(createListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteListAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { boardId, listId } = action.payload;
        if (state.lists[boardId]) {
          state.lists[boardId] = state.lists[boardId].filter((list) => list._id !== listId);
        }
      })
      
      .addCase(deleteListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getListByBoardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListByBoardAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { boardId, list } = action.payload; 
        state.lists[boardId] = list; 
      })
      
      .addCase(getListByBoardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { listId, task } = action.payload;
        if (!state.tasks[listId]) {
          state.tasks[listId] = [];
        }
        state.tasks[listId].push(task);  
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { taskId, updatedTask } = action.payload;

        
        for (const listId in state.tasks) {
          const taskIndex = state.tasks[listId].findIndex((task) => task._id === taskId);
          if (taskIndex !== -1) {
            state.tasks[listId][taskIndex] = updatedTask;
            break;
          }
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { taskId, listId } = action.payload;
        if (state.tasks[listId]) {
          state.tasks[listId] = state.tasks[listId].filter((task) => task._id !== taskId);
        }
      })
      
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});
export const Board = (state) => state.board;
export default boardSlice.reducer;
