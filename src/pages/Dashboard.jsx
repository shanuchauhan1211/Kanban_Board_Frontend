import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  createBoardAsync, 
  createListAsync, 
  deleteBoardAsync, 
  deleteListAsync, 
  getAllBoardAsync, 
  getListByBoardAsync 
} from "../features/dashboard/DashboardSlice";
import { logout } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, lists } = useSelector((state) => state.board); 

  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getAllBoardAsync(userId));
    }
  }, [dispatch, userId]);


  useEffect(() => {
    if (boards.length > 0) {
      const fetchLists = async () => {
        for (const board of boards) {
          try {
            const response = await dispatch(getListByBoardAsync(board._id)).unwrap();
            console.log("Fetched lists for board:", board._id, response);
          } catch (error) {
            console.error("Error fetching lists for board:", board._id, error);
          }
        }
      };
  
      fetchLists();
    }
  }, [dispatch, boards]);
  

  const createBoard = async () => {
    if (!userId) return;
    const newBoard = { title: `Board ${boards.length + 1}`, userId };
    await dispatch(createBoardAsync(newBoard)).unwrap();
  };

  const deleteBoard = async (boardId) => {
    await dispatch(deleteBoardAsync(boardId)).unwrap();
  };

  const deleteList = async (listId, boardId) => {
    await dispatch(deleteListAsync({ listId, boardId })).unwrap();
  };

  const createList = async (boardId) => {
    const newList = { title: `List ${lists[boardId]?.length + 1 || 1}`, boardId };
    await dispatch(createListAsync(newList)).unwrap();
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

          <button className="bg-green-400 px-2 py-1 text-sm rounded mt-1 ml-2">
            Add Task
          </button>
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
