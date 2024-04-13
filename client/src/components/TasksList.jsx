import { getAllTasks } from "../api/tasks.api";
import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

export const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data.reverse());
    }
    loadTasks();
  }, []);

  return (
    <div>
      <h1 className="mx-auto text-center text-slate-800 font-bold text-2xl m-3">
        Active Tasks
      </h1>
      <div>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
