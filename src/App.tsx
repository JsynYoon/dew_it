
import Header from "./components/Header"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"


function App() {
  return (
    <>
    <Header />
    <main>
      <div className="container">
        <div className="todo__form--container">
        <TodoForm />
        </div>
        <div className="todo__list--container">
          <TodoList />
        </div>
      </div>
    </main>
    </>

  )
}

export default App;