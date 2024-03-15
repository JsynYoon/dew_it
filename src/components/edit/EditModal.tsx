import { Dispatch, SetStateAction } from "react";
import EditTodoForm from "./EditTodoForm";
import { TodoType } from "../../context/TodoProvider";

type PropType = {
  todo: TodoType;
  id: string | undefined,
  setEditTodo: Dispatch<SetStateAction<boolean>>
}
const EditModal = ({ todo, id, setEditTodo }: PropType) => {
  return (
    <div className="todo__edit--modal">
      <div className="todo__edit--form">
        <EditTodoForm todo={todo} id={id} setEditTodo={setEditTodo}/>
      </div>
    </div>
  );
};

export default EditModal;
