import { useContext } from "react";
import TodoContext, { UseTodoContextType } from "../context/TodoProvider";

const useTodo = (): UseTodoContextType => {
    return useContext(TodoContext);
}

export default useTodo