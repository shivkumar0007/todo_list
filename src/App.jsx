import TodoList from "./components/TodoList";
import { ThemeContext } from "./store/Theme";
import { useContext } from "react";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme=="light" ? "min-h-screen bg-gray-200" : "min-h-screen bg-gray-900"}>
      <TodoList />
    </div>
  );
};

export default App;