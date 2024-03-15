import { TodoType } from "../context/TodoProvider";

export const addToStorage = (storage_name: string, payload: TodoType) => {
    const todoString = localStorage.getItem(storage_name);
    const todo = todoString ? JSON.parse(todoString) : [];
    todo.push(payload);
    localStorage.setItem("todo", JSON.stringify(todo));
}
export const deleteFromStorage = (storage_name: string, id: string | undefined) => {
    const todoString = localStorage.getItem(storage_name);
    const target_todo = todoString ? JSON.parse(todoString) : [];
    const new_todo = target_todo.filter((target: TodoType)  => target.id !== id);
    localStorage.setItem("todo", JSON.stringify(new_todo));
}

export const getFromStorage = (storage_name: string, id: string | undefined) => {
    const todoString = localStorage.getItem(storage_name);
    const todoParsed = todoString ? JSON.parse(todoString) : [];
    return todoParsed.find((todo: TodoType) => todo.id === id);
}

export const updateFromStorage = (storage_name: string, id: string | undefined, payload: TodoType) => {
    const todoString = localStorage.getItem(storage_name);
    const todoParsed = todoString ? JSON.parse(todoString) : [];
    const new_todo = todoParsed.map((todo: TodoType) => {
       if (todo.id === id) {
           todo = payload
       } 
       return {...todo}
    })
    localStorage.setItem("todo", JSON.stringify(new_todo));
}
