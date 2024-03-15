import { Dispatch, SetStateAction } from "react";
import { useStore } from "../../context/useStore";

type PropTypes = {
  confirmDelete: boolean;
  setConfirmDelete: Dispatch<SetStateAction<boolean>>;
};
const DeleteAllModal = ({ confirmDelete, setConfirmDelete }: PropTypes) => {
  const { deleteAllTodo } = useStore(state => state)
  const handleDeleteAllTodos = () => {
    deleteAllTodo();
    setConfirmDelete(false);
  };

  return (
    <div className={`todo__delete-all--modal ${confirmDelete ? "show" : ""}`}>
      <div className="todo__delete--confirmation">
        <div className="delete--label">
          <p>You are about to delete all todos, are you sure?</p>
          <p>This action cannot be undone</p>
        </div>
        <div className="delete--buttons">
          <button className="delete-all-btn" onClick={handleDeleteAllTodos}>
            Delete
          </button>
          <button
            className="delete-cancel-btn"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllModal;
