import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="bg-appblue h-13 flex justify-between items-center">
      {/* MYTASKS on the left */}
      <Link
        to="/tasks"
        className="inline-block text-slate-100 font-extrabold text-2xl m-2 ml-6"
      >
        MYTASK
      </Link>

      {/* THE NEW TASK BUTTON CHANGES FROM A ICON TO TEXT ON RESIZE */}
      <Link
        to="/task-create"
        className="inline-block text-slate-100 text-lg m-2 md:mr-6 2xl:mr-12 mr-2 font-semibold border-2 px-2 pt-0 rounded-lg
        hover:-translate-y-0.5 hover:translate-x-0.5 duration-200 transition-transform"
      >
        <span className="font-extrabold">+</span> add task
      </Link>
    </div>
  );
};
