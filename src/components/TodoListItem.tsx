import { ChangeEvent, ReactElement, useState } from "react";
import { TodoType } from "../context/TodoProvider";
import { BsThreeDots } from "react-icons/bs";
import EditModal from "./edit/EditModal";
import { dateConverter } from "../utils/dateConverter";
import toast from "react-hot-toast";
import { useStore } from "../context/useStore";

type PropsType = {
  todo: TodoType;
};
const TodoListItem = ({ todo }: PropsType): ReactElement => {
  const [dialog, setDialog] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const { deleteTodo, updateTodo } = useStore(state => state)

  const handleDelete = async () => {
    deleteTodo(todo)
  };

  //# close dialog if clicking away.
  const toggleDialog = () => {
    if (dialog) {
      setDialog(false);
    }
  };

  const handleTodoStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateTodo({ ...todo, status: e.target.value });
    toast.success("Todo Status Updated");
  };

  const statusValues: string[] = ["Not Started", "In Progress", "Completed"];

  const options: ReactElement[] = statusValues.map((status) => {
    return (
      <option key={`todo-status-${status}`} value={status}>
        {status}
      </option>
    );
  });

  const content = (
    <li className="todo__item" onClick={toggleDialog}>
      <div className="todo__item--card">
        <div className="card-top--label">
          <div className="date--label">
            <p>Todo Date: </p>
            <p className="date--label-text">{dateConverter(todo.date)}</p>
          </div>
          <div className="priority--label">
            <p>Priority: </p>
            <p className={`priority--${todo.priority}`}>{todo.priority}</p>
          </div>
        </div>
        <div className="card-bottom--body">
          <div
            className={`todo__item--image ${todo.image == "" && "no--image"}`}
          >
            <img src={todo.image} alt={todo.name} />
            {todo.status === "Completed" && (
              <div className="completed-overlay">
                <p>completed</p>
              </div>
            )}
          </div>
          <div className="todo__item--body">
            <h2>{todo.name}</h2>
            <p className="todo-description">{todo.description}</p>
          </div>
        </div>
        <div className="todo__item--controls">
          <div className="todo__item--toggle-status">
            <select
              name="todo-status"
              id="todo--status"
              aria-label="Todo Status"
              value={todo.status}
              onChange={handleTodoStatusChange}
            >
              {options}
            </select>
          </div>
          <div
            role="button"
            className="todo__item--delete"
            onMouseEnter={() => setDialog(true)}
            onMouseLeave={() => setDialog(false)}
          >
            <BsThreeDots />
            {dialog && (
              <div className="dialog">
                <div className="delete--dialog">
                  <p role="button" onClick={handleDelete}>
                    Delete
                  </p>
                </div>
                <div className="update--dialog">
                  <p role="button" onClick={() => setEditTodo(true)}>
                    Update
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {editTodo && (
        <EditModal todo={todo} id={todo.id} setEditTodo={setEditTodo} />
      )}
    </li>
  );
  return content;
};

export default TodoListItem;
