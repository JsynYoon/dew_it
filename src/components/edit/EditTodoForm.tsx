import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
//import useTodo from "../../hooks/useTodo";
// import {
//   getFromStorage,
// } from "../../actions/localStorageActions";
import { FaWindowClose } from "react-icons/fa";
import { TodoType } from "../../context/TodoProvider";
import { useStore } from "../../context/useStore";

type PropType = {
  todo: TodoType;
  id: string | undefined;
  setEditTodo: Dispatch<SetStateAction<boolean>>;
};

const EditTodoForm = ({ todo, id, setEditTodo }: PropType) => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDesc, setTodoDesc] = useState<string>("");
  const [todoDate, setTodoDate] = useState<string>("");
  const [todoPriority, setTodoPriority] = useState<string>("");
  const [todoImage, setTodoImage] = useState<string>("");

  //const { dispatch, REDUCER_ACTIONS } = useTodo();

  const { updateTodo } = useStore(state => state)

  //^ Change Event Handlers
  const handleTodoTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleTodoDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDesc(e.target.value);
  };

  const handleTodoDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoDate(e.target.value);
  };

  const handleTodoPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTodoPriority(e.target.value);
  };

  //const todoToEdit = getFromStorage("todo", id);
  const { name, description, date, priority, image } = todo;

  useEffect(() => {
    setTodoTitle(name);
    setTodoDesc(description);
    setTodoDate(date);
    setTodoPriority(priority!);
    setTodoImage(image!);
  }, [name, description, date, priority, image]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData = new FormData();
    formData.append("file", file!);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_PRESET_KEY!
    );
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        toast.error("Image upload failed");
      }
      const { secure_url } = await res.json();

      setTodoImage(secure_url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!todoTitle || !todoDesc || !todoDate || !todoPriority) {
      toast.error("Please fill in all the required fields");
      return;
    } else {
      const payload = {
        id,
        name: todoTitle,
        description: todoDesc,
        date: todoDate,
        priority: todoPriority,
        image: todoImage,
        status: todo.status
      };
      // dispatch({
      //   type: REDUCER_ACTIONS.UPDATE,
      //   payload: payload,
      // });
      updateTodo(payload);
      toast.success("Todo updated successfully!");

      //updateFromStorage("todo", id, payload);
      setEditTodo(false);
    }
  };

  //# Define Todo Priority Options
  const optionValues: string[] = ["None", "Low", "Medium", "High"];

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`priority-${val}`} value={val}>
        {val}
      </option>
    );
  });

  const content = (
    <div className="todo__form">
      <div className="todo__form--close" onClick={() => setEditTodo(false)}>
        <FaWindowClose />
      </div>
      <form onSubmit={handleTodoEdit}>
        <div className="form__left">
          <div className="todo__title">
            <label htmlFor="todo__title">Title</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              aria-label="Todo Title"
              value={todoTitle}
              onChange={handleTodoTitleChange}
            />
          </div>
          <div className="todo__description">
            <label htmlFor="todo__description">Description</label>
            <textarea
              name="todo-description"
              id="todo__description"
              placeholder="Description"
              aria-label="Todo Description"
              value={todoDesc}
              onChange={handleTodoDescChange}
            />
          </div>
        </div>

        <div className="form__right">
          <div className="todo__date">
            <label htmlFor="todo__date">Date</label>
            <input
              type="date"
              value={todoDate}
              onChange={handleTodoDateChange}
              aria-label="Todo Date"
            />
          </div>
          <div className="todo__priority">
            <label htmlFor="todo__priority">Priority</label>
            <select
              name="todo-priority"
              id="todo__priority"
              value={todoPriority}
              onChange={handleTodoPriorityChange}
              aria-label="Todo Priority"
            >
              {options}
            </select>
          </div>
          <div className="todo__image">
            <label htmlFor="todo__image">Image</label>
            <input type="file" name="image" onChange={handleFileUpload} />
          </div>
          <button type="submit" className="todo__btn--create">
            Update
          </button>
        </div>
      </form>
    </div>
  );
  return content;
};

export default EditTodoForm;
