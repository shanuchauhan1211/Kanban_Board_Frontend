import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  createBoardAsync, 
  createListAsync, 
  deleteBoardAsync, 
  deleteListAsync, 
  getAllBoardAsync, 
  getListByBoardAsync, 
  createTaskAsync,
  updateTaskAsync,
  deleteTaskAsync, 
 
} from "../features/dashboard/DashboardSlice";
import { logout } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, lists, tasks } = useSelector((state) => state.board); 
console.log(tasks)
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getAllBoardAsync(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (boards.length > 0) {
      boards.forEach((board) => dispatch(getListByBoardAsync(board._id)));
    }
  }, [dispatch, boards]);

  // useEffect(() => {
  //   if (lists) {
  //     Object.values(lists).forEach((listArray) => {
  //       listArray.forEach((list) => dispatch(getTasksByListAsync(list._id)));
  //     });
  //   }
  // }, [dispatch, lists]);

  const createBoard = async () => {
    if (!userId) return;
    await dispatch(createBoardAsync({ title: `Board ${boards.length + 1}`, userId })).unwrap();
  };

  const deleteBoard = async (boardId) => {
    await dispatch(deleteBoardAsync(boardId)).unwrap();
  };

  const deleteList = async (listId, boardId) => {
    await dispatch(deleteListAsync({ listId, boardId })).unwrap();
  };

  const createList = async (boardId) => {
    await dispatch(createListAsync({ title: `List ${lists[boardId]?.length + 1 || 1}`, boardId })).unwrap();
  };

  const createTask = async (listId) => {
    await dispatch(createTaskAsync({ title: `Task ${tasks[listId]?.length + 1 || 1}`, listId })).unwrap();
  };

  const deleteTask = async (taskId, listId) => {
    await dispatch(deleteTaskAsync({ taskId, listId })).unwrap();
  };

  const handlePriorityChange = async (taskId, priority) => {
    await dispatch(updateTaskAsync({ taskId, priority })).unwrap();
  };


  return (
    <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center">
      <nav className="flex items-center justify-between w-full p-4 bg-gray-800 bg-opacity-70 rounded-lg text-white">
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
            toast.error("User Logged Out");
          }}
          className="bg-red-500 duration-200 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Log Out
        </button>
        <p className="text-3xl font-bold mx-auto">
          Welcome {user?.UserName?.toUpperCase()} to Kanban Board
        </p>
      </nav>

      <button 
        className="px-4 py-2 mb-5 bg-blue-500 duration-200 hover:bg-blue-700 text-white rounded-lg mt-5" 
        onClick={createBoard}
      >
        Create Board
      </button>

      {boards.length === 0 ? (
        <p className="text-2xl font-semibold">No Boards Available</p>
      ) : (
        <div className="mt-5 flex flex-wrap gap-5">
        {boards.map((board) => (
          <div key={board._id} className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">{board.title}</h2>

            <button className="bg-red-500 px-2 py-1 text-sm rounded mt-2" onClick={() => deleteBoard(board._id)}>
              Delete Board
            </button>

            <button className="bg-green-500 px-2 py-1 text-sm rounded mt-2 ml-2" onClick={() => createList(board._id)}>
              Add List
            </button>

            <div className="flex flex-row gap-3 mt-4 w-full">
              {lists[board._id]?.map((list) => ( 
                <div key={list._id} className="bg-gray-700 p-3 rounded-lg w-72 flex-shrink-0">
                  <h3 className="text-lg font-bold">{list.title}</h3>

                  <button onClick={() => deleteList(list._id, board._id)} className="bg-red-400 px-2 py-1 text-sm rounded mt-1">
                    Delete List
                  </button>

                  <button className="bg-green-400 px-2 py-1 text-sm rounded mt-1 ml-2" onClick={() => createTask(list._id)}>
                    Add Task
                  </button>

                  <div className="mt-2">
                    {tasks[list._id]?.map((task) => (
                      <div key={task?._id} className="bg-gray-600 p-2 rounded-lg mt-1">
                        <p className="text-white">{task?.title}</p>
                        <button className="bg-red-400 px-2 py-1 text-sm rounded mt-1" onClick={() => deleteTask(task?._id, list?._id)}>
                          Delete Task
                        </button>
                        <select
                          className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                          value={task?.priority || "Medium"}
                          onChange={(e) => handlePriorityChange(task?._id, list?._id, e.target.value)}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
