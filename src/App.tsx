import { useEffect, useState } from 'react';
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { CheckCircle, Circle } from 'lucide-react';
import { Separator } from './components/ui/separator';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  interface AddTodoEvent extends React.FormEvent<HTMLFormElement> { }

  const addTodo = (e: AddTodoEvent): void => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
    setNewTodo('');
  }

  const toggleCompleted = (todo: Todo) => {
    setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed))
  }

  useEffect(() => {
    switch (filter) {
      case "all":
        setFilteredTodos(todos)
        break;
      case "active":
        setFilteredTodos(todos.filter(t => !t.completed))
        break;
      case "completed":
        setFilteredTodos(todos.filter(t => t.completed))
        break;
    }
  }, [filter, todos])

  return (
    <div className="flex justify-center h-screen items-center bg-background">
      <div className="bg-card w-1/2 p-5 rounded-[10px] shadow-lg flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Todos</h1>
        <form onSubmit={(e) => addTodo(e)} className='flex gap-2 w-full'>
          <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="grow" type="text" placeholder='New Task' />
          <Button type="submit">Add</Button>
        </form>
        <ul className="w-full">
          {filteredTodos.length ? (
            filteredTodos.map((todo) => (
              <li key={todo.id} className="flex justify-start items-center gap-2 bg-background/50 p-1 rounded-md mb-2">
                <Button onClick={() => toggleCompleted(todo)} variant="ghost" size="icon" className='text-neutral-400'>
                  {todo.completed ? <CheckCircle className="text-green-500" /> : <Circle />}
                </Button>
                <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>{todo.title}</span>
              </li>
            ))
          ) : (
            <p className="text-center py-3">{`No ${filter !== "all" ? filter : ""}`} todos :(</p>
          )}
        </ul>
        <Separator />
        <div className="w-full flex items-center justify-between text-sm">
          <span>
            {`${todos.filter(t => !t.completed).length} left`}
          </span>
          <div className="flex gap-2">
            <Button onClick={() => setFilter("all")} variant={filter === "all" ? "outline" : "ghost"} size="sm">
              All
            </Button>
            <Button onClick={() => setFilter("active")} variant={filter === "active" ? "outline" : "ghost"} size="sm">
              Active
            </Button>
            <Button onClick={() => setFilter("completed")} variant={filter === "completed" ? "outline" : "ghost"} size="sm">
              Completed
            </Button>
          </div>
          <Button onClick={() => clearCompleted()} variant="ghost">Clear completed</Button>
        </div>
      </div>
    </div>
  )
}

export default App