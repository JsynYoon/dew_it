import { ChangeEvent, ReactElement, useState } from "react";
import { useStore } from "../context/useStore";
import { FaBomb } from "react-icons/fa";
import TodoListItem from "./TodoListItem";
import DeleteAllModal from "./deleteAll/DeleteAllModal";
import toast from "react-hot-toast";

const TodoList = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const todos = useStore((state) => state.todo);

  const confirmDeleteAll = () => {
    const todosExists = todos.length > 0;
    if (!todosExists) {
      toast.error("You have no todos to delete!");
    } else {
      setConfirmDelete(!confirmDelete);
    }
  };

  const handleTodoFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filterValues: string[] = [
    "All",
    "Not Started",
    "In Progress",
    "Completed",
  ];

  const options: ReactElement[] = filterValues.map((val) => {
    return (
      <option key={`todo-filter-${val}`} value={val}>
        {val}
      </option>
    );
  });

  const deleteHoverContent = (
    <div className="todo__list--delete-all-tooltip">
      <p>Delete All</p>
    </div>
  );

  const content = (
    <div className="todo__list--inner">
      {todos.length > 0 ? (
        <div className="todo__list--content">
          <div className="todo__list--controls">
            <div className="todo__list--destroy" onClick={confirmDeleteAll}>
              <FaBomb
                onMouseEnter={() => setDeleteHover(true)}
                onMouseLeave={() => setDeleteHover(false)}
              />

              {deleteHover && deleteHoverContent}
            </div>
            <div className="todo__list--filter">
              <select
                name="todo__list--filter"
                id="todo__list--filter"
                value={filterStatus}
                onChange={handleTodoFilterChange}
                aria-label="Todo List Filter"
              >
                {options}
              </select>
            </div>
          </div>

          <ul className="todo__list">
            {todos.map((todo, i) => {
              if (todo.status === filterStatus) {
                return <TodoListItem key={i} todo={todo} />;
              } else if (filterStatus === "All") {
                return <TodoListItem key={i} todo={todo} />;
              }
            })}
          </ul>
        </div>
      ) : (
        <div className="no--task-label">
          <p>Nothing to do!</p>
          <p>Add a new task</p>
        </div>
      )}

      {confirmDelete && (
        <DeleteAllModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
        />
      )}
    </div>
  );
  return content;
};

export default TodoList;
