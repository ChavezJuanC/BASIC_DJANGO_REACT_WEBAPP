import { useNavigate } from "react-router-dom";

export const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/tasks/${task.id}`);
      }}
      className="bg-slate-200 m-4 rounded-md p-2 shadow-md
      hover:shadow-lg hover:cursor-pointer
      active:-translate-y-0.5 transition-transform duration-300	
      "
    >
      <h1 className="font-extrabold text-appbluedark text-xl">{task.title}</h1>
      <p className="text-black w-full text-sm">{task.description}</p>
      {task.done && (
        <p className="font-semibold text-md text-right text-green-400">
          Completed
        </p>
      )}
      {!task.done && (
        <p className="font-semibold text-md text-right text-red-400">Pending</p>
      )}
      <hr />
    </div>
  );
};
