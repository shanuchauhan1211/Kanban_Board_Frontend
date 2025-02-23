import { useState } from "react";
import { motion } from "framer-motion";
import { AuthUser } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const createBoard = () => {
    const newBoard = { id: Date.now(), name: `Board ${boards.length + 1}`, lists: [] };
    setBoards([...boards, newBoard]);
  };

  // Delete Board
  const deleteBoard = (boardId) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  // Create New List in a Board
  const createList = (boardId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, lists: [...board.lists, { id: Date.now(), name: `List ${board.lists.length + 1}`, tasks: [] }] }
          : board
      )
    );
  };

  // Delete List from Board
  const deleteList = (boardId, listId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId ? { ...board, lists: board.lists.filter((list) => list.id !== listId) } : board
      )
    );
  };

  // Create Task inside List
  const createTask = (boardId, listId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === listId
                  ? { ...list, tasks: [...list.tasks, { id: Date.now(), name: `Task ${list.tasks.length + 1}` }] }
                  : list
              ),
            }
          : board
      )
    );
  };

  // Delete Task from List
  const deleteTask = (boardId, listId, taskId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === listId ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) } : list
              ),
            }
          : board
      )
    );
  };

  // Drag and Drop Handler
  const onDragEnd = (event, info, boardId, sourceListId, taskId) => {
    const destinationListId = parseInt(info.point.x / 300); // Approximate list index
    if (sourceListId !== destinationListId && destinationListId < boards.find(b => b.id === boardId).lists.length) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: board.lists.map((list, idx) => {
                  if (list.id === sourceListId) {
                    return { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) };
                  } else if (idx === destinationListId) {
                    return { ...list, tasks: [...list.tasks, { id: taskId, name: `Task ${taskId}` }] };
                  }
                  return list;
                }),
              }
            : board
        )
      );
    }
  };

  return (
    <div  style={{ backgroundImage: "url('/backgroundpic.avif')" }} className="p-5 bg-cover  bg-center h-screen flex flex-col  items-center">
     <nav className="flex items-center justify-between w-full p-4 bg-gray-800 bg-opacity-70 rounded-lg text-white relative">
  <button onClick={()=>{dispatch(logout()); navigate("/login");  toast.error("User LogOut");}} className="bg-red-500 duration-200 hover:bg-red-700 px-4 py-2 rounded-lg ">Log Out</button>
  <p className="text-3xl font-bold mx-auto">
    Welcome  {user?.UserName?.toUpperCase()} to Kanban Board
  </p>
</nav>
     
      {/* Create Board Button */}
      <button className="px-4 py-2 bg-blue-500 duration-200 hover:bg-blue-700 text-white rounded-lg mt-5" onClick={createBoard}>
        Create Board
      </button>

      <div className="mt-5 flex gap-5 overflow-x-auto">
        {boards.map((board) => (
          <div key={board.id} className="bg-gray-800 text-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold">{board.name}</h2>
            <button className="bg-red-500 px-2 py-1 text-sm rounded mt-2" onClick={() => deleteBoard(board.id)}>
              Delete Board
            </button>

            {/* Create List Button */}
            <button className="bg-green-500 px-2 py-1 text-sm rounded mt-2 ml-2" onClick={() => createList(board.id)}>
              Add List
            </button>

            <div className="flex gap-3 overflow-x-auto mt-4">
              {board.lists.map((list) => (
                <div key={list.id} className="bg-gray-700 p-3 rounded-lg w-72">
                  <h3 className="text-lg font-bold">{list.name}</h3>

                  {/* Delete List Button */}
                  <button className="bg-red-400 px-2 py-1 text-sm rounded mt-1" onClick={() => deleteList(board.id, list.id)}>
                    Delete List
                  </button>

                  {/* Create Task Button */}
                  <button className="bg-green-400 px-2 py-1 text-sm rounded mt-1 ml-2" onClick={() => createTask(board.id, list.id)}>
                    Add Task
                  </button>

                  <div className="mt-2 space-y-2">
                    {list.tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        drag
                        dragConstraints={{ left: 0, right: 100 }}
                        onDragEnd={(event, info) => onDragEnd(event, info, board.id, list.id, task.id)}
                        className="bg-blue-600 p-2 rounded-md cursor-pointer"
                      >
                        {task.name}
                        <button className="ml-2 bg-red-500 px-2 py-1 text-xs rounded" onClick={() => deleteTask(board.id, list.id, task.id)}>
                          X
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
