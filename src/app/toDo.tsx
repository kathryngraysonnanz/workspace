import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";

interface Task {
  id: number;
  title: string;
  completed: boolean; // New property to track completion status
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: any) => {
    setInputValue(event.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        title: inputValue.trim(),
        completed: false, // Initialize as not completed
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleRemoveTask = (taskId: number) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const handleToggleCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          style={{ marginRight: "10px" }}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <Button
              onClick={() => handleRemoveTask(task.id)}
              themeColor="primary"
              style={{ marginLeft: "10px" }}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
