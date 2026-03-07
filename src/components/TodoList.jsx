import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../store/Theme";

const TodoList = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState("lightblue");

  useEffect(() => {
    if (localStorage.getItem("todoList")) {
      setTodoList(JSON.parse(localStorage.getItem("todoList")));
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex flex-col items-center pt-5 w-full">
      <div className="flex items-center justify-center gap-5">
        <input
          className={theme=="light" ?"bg-gray-300 focus:outline-none rounded-2xl p-2 w-90 text-gray-800 font-bold" : "bg-gray-800 focus:outline-none rounded-2xl p-2 w-90 text-gray-200 font-bold"}
          type="text"
          placeholder="Input List"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <input
          className="rounded-3xl h-10 w-20 ml-5"
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />

        <button
          className={theme=="light" ?"rounded-3xl h-9 w-20 text-gray-700 ml-5 bg-green-400" :"rounded-3xl h-9 w-20 text-gray-200 ml-5 bg-green-600"}
          onClick={() => {
            if (inputValue.trim() !== "") {
              setTodoList([...todoList, { text: inputValue, color: color }]);
              setInputValue("");
            }

            localStorage.setItem(
              "todoList",
              JSON.stringify([...todoList, { text: inputValue, color: color }]),
            );
          }}
        >
          Add
        </button>

      <label className="inline-flex items-center cursor-pointer ml-4">

  <input
    type="checkbox"
    className="sr-only peer"
    checked={theme === "dark"}
    onChange={toggleTheme}
  />

  <div
    className="relative w-12 h-6 bg-gray-300 rounded-full peer
    peer-checked:bg-blue-700
    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
    after:bg-white after:rounded-full after:h-5 after:w-5
    after:transition-all
    peer-checked:after:translate-x-6"
  ></div>

  <span className={theme=="light" ?"ml-3 text-sm text-gray-800 font-medium" :"ml-3 text-sm text-gray-200 font-medium"}>
    {theme === "dark" ? "Dark" : "Light"}
  </span>

</label>

      </div>

      <div>
        {todoList.map((ele, idx) => (
          <div
            key={idx}
            className="h-9 w-100 rounded-tl-2xl rounded-br-2xl pl-4 pr-4 items-center mt-5 flex justify-between"
            style={{ backgroundColor: ele.color }}
          >
            <p className={theme=="light" ? "text-gray-700 font-sm text-xl" :"text-gray-200 font-sm text-xl"}>{ele.text}</p>

            <svg
              className={theme=="light" ? "text-red-400 cursor-pointer w-6 h-6" :"text-red-600 cursor-pointer w-6 h-6"}
              onClick={() => {
                setTodoList(
                  todoList.filter((_, i) => {
                    return i !== idx;
                  }),
                );
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 8h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 011-1h8a1 1 0 011 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
