import { ReactElement, createContext, useMemo, useReducer } from "react";

export type TodoType = {
  id?: string;
  name: string;
  description: string;
  date: string;
  priority?: string;
  image?: string;
  status?: string;
};

type TodoStateType = {
  todo: TodoType[];
};

const initialTodoState: TodoStateType = {
  todo: JSON.parse(localStorage.getItem("todo")!) || [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  DELETE: "DELETE",
  DELETE_ALL: "DELETE_ALL",
  UPDATE: "UPDATE"
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: TodoType;
  filter?: string;
};

const reducer = (
  state: TodoStateType,
  action: ReducerAction
): TodoStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing in ADD case");
      }
      const { id, name, description, date, priority, image } = action.payload;
      const filteredTodo: TodoType[] = state.todo.filter(
        (todo) => todo.id !== id
      );

      return {
        ...state,
        todo: [
          ...filteredTodo,
          { id, name, description, date, priority, image },
        ],
      };
    }
    case REDUCER_ACTION_TYPE.DELETE: {
      if (!action.payload) {
        throw new Error("action.payload is missing in DELETE case");
      }

      const { id } = action.payload;
      const filteredTodo: TodoType[] = state.todo.filter(
        (todo) => todo.id !== id
      );

      return {
        ...state,
        todo: [...filteredTodo],
      };
    }
    case REDUCER_ACTION_TYPE.DELETE_ALL: {
      return {
        ...state,
        todo: [],
      };
    }
    case REDUCER_ACTION_TYPE.UPDATE: {
      if (!action.payload) {
        throw new Error("action.payload is missing in UPDATE case");
      }

      const { id, name, description, date, priority, image, status } =
        action.payload;
      const todoExists: TodoType | undefined = state.todo.find(
        (todo) => todo.id === id
      );

      if (!todoExists) throw new Error("Custom error: todo not found");

      const updatedTodo = {
        ...todoExists,
        name,
        description,
        date,
        priority,
        image,
        status,
      };

      return {
        ...state,
        todo: state.todo.map((todo) => (todo.id === id ? updatedTodo : todo)),
      };
    }
    default: {
      return state;
    }
  }
};

const useTodoContext = (initialTodoState: TodoStateType) => {
  const [state, dispatch] = useReducer(reducer, initialTodoState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  return {
    state,
    dispatch,
    REDUCER_ACTIONS,
  };
};

export type UseTodoContextType = ReturnType<typeof useTodoContext>;

const initTodoContextState: UseTodoContextType = {
  state: initialTodoState,
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
};

export const TodoContext =
  createContext<UseTodoContextType>(initTodoContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const TodoProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <TodoContext.Provider value={useTodoContext(initialTodoState)}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
