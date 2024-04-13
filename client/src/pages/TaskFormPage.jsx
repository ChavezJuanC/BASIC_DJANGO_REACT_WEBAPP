import { useForm } from "react-hook-form";
import { createTask } from "../api/tasks.api";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const TaskFormPage = () => {
  const { register, handleSubmit, formState, setValue } = useForm();
  const errors = formState.errors;
  const params = useParams();
  const navigate = useNavigate();
  const [taskStatus, setTaskStaus] = useState("Waiting on status..");

  useEffect(() => {
    const fetchTask = async () => {
      if (params.id) {
        const res = await getTask(params.id);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
        console.log("completed: ", res.data.done);

        if (res.data.done) {
          setTaskStaus(true);
        } else {
          setTaskStaus(false);
        }
      }
    };
    fetchTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log(data);
      toast("Task Updating..", { duration: 1700, position: "top-center" });
      updateTask(params.id, data); // Await the updateTask function
    } else {
      await createTask(data);
      toast("Task Created", {
        duration: 1700,
        position: "top-center",
      });
    }
  });

  return (
    <div>
      {params.id && (
        <h1 className="mx-auto text-center text-slate-800 font-bold text-2xl m-2">
          Edit Task
        </h1>
      )}
      {!params.id && (
        <h1 className="mx-auto text-center text-slate-800 font-bold text-2xl m-3">
          Create New Task
        </h1>
      )}
      <div className="border-2 m-4 mt-2 bg-slate-50 rounded-lg p-4 pb-0 h-full">
        <form onSubmit={onSubmit}>
          <h3 className="text-appbluedark text-lg p-1 font-semibold">Title:</h3>
          <input
            type="text"
            placeholder={"title"}
            {...register("title", { required: true })}
            className="border-2 border-slate-300 rounded-md focus:ring-slate-400 focus:ring-1 w-full"
          />
          {errors.title && <span>Title is required</span>}

          <h3 className="text-appbluedark text-lg p-1 font-semibold">
            Task description:
          </h3>
          <textarea
            name=""
            id=""
            rows="26"
            placeholder={"description.."}
            {...register("description", { required: true })}
            className="border-2 border-slate-300 rounded-md focus:ring-slate-400 focus:ring-1 w-full"
          ></textarea>
          {errors.description && <span>Description is required</span>}
          {!params.id && (
            <div className="text-right">
              <button className="border-2 border-white rounded-md px-4 mb-6 mt-4 mr-4 text-lg text-slate-50 bg-appblue">
                Save
              </button>
            </div>
          )}
          {params.id && (
            <div className="flex justify-between mb-6 mt-2">
              <div>
                <button
                  onClick={() => {
                    // Handle form submission asynchronously
                    handleSubmit((formData) => {
                      // Create new task data by spreading existing form data
                      const taskData = {
                        ...formData,
                        done: !taskStatus, // Invert the 'done' status
                      };

                      // Call the 'updateTask' API function with the task ID and updated data
                      const res = updateTask(params.id, taskData);

                      // Update the local state 'taskStatus' to reflect the new completion status
                      setTaskStaus(!taskStatus);
                    })();
                  }}
                  className={
                    taskStatus
                      ? "border-2 border-white rounded-md px-4 m-1 mr-4 text-lg text-slate-50 bg-red-400"
                      : "border-2 border-white rounded-md px-4 m-1 mr-4 text-lg text-slate-50 bg-green-400"
                  }
                >
                  {taskStatus ? "Mark Incomplete" : "Mark complete"}
                </button>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={async () => {
                    const confirm = window.confirm(
                      "Are you sure you want to delete task?"
                    );
                    if (confirm) {
                      await deleteTask(params.id);
                      toast("Task Deleted", {
                        duration: 1700,
                        position: "top-center",
                      });
                      navigate("/tasks");
                    }
                  }}
                  className="border-2 border-white rounded-md px-4 m-1 text-lg text-slate-50 bg-appblue"
                >
                  delete
                </button>
                <button className="border-2 border-white rounded-md px-4 m-1 text-lg text-slate-50 bg-appblue">
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <Toaster />
    </div>
  );
};
