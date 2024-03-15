import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useStore } from "../context/useStore";

const TodoForm = () => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDesc, setTodoDesc] = useState<string>("");
  const [todoDate, setTodoDate] = useState<string>("");
  const [todoPriority, setTodoPriority] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const addTodo = useStore((state) => state.addTodo);

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
      setImage(secure_url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!todoTitle || !todoDesc || !todoDate || !todoPriority) {
      //^ Avoid duplicate toast by adding id (e.g: non-stop clicking)
      toast.error("Please fill in all the required fields", {
        id: "toast-error",
      });
      return;
    } else {
      const payload = {
        id: uuidv4(),
        name: todoTitle,
        description: todoDesc,
        date: todoDate,
        priority: todoPriority,
        image:
          image !== ""
            ? image
            : "https://res.cloudinary.com/dkmgu6nut/image/upload/v1707338784/tl9ngke8k2fpq6j55vwo.png",
        status: "Not Started",
      };

      addTodo(payload);

      toast.success("Todo created successfully!");

      //Todo: Reset form fields
      setTodoTitle("");
      setTodoDesc("");
      setTodoDate("");
      setTodoPriority("None");
      setImage("");
      Object.entries(e.target)[4][1].value = "";
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
      <form onSubmit={handleTodoSubmit}>
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
            <input type="file" id="todo__image" onChange={handleFileUpload} />
          </div>
          <button type="submit" className="todo__btn--create">
            Create
          </button>
        </div>
      </form>
    </div>
  );
  return content;
};

export default TodoForm;
