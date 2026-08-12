import { useEffect, useState } from "react";

function Dashboard() {
 const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
  fetch("http://localhost:5000/api/tasks")
    .then((response) => response.json())
    .then((data) => {
      setTasks(data);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
}, []);
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
  <div>
    <p className="text-sm font-medium text-blue-600">
      TaskFlow
    </p>

    <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
      Dashboard
    </h1>

    <p className="mt-2 text-slate-600">
      Welcome back! Here's an overview of your tasks.
    </p>
  </div>

  <div className="text-sm text-slate-500">
    Stay organized. Keep moving.
  </div>
</div>
        {/* Statistics */}
        <section className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <p className="text-sm font-medium text-slate-500">
    Total Tasks
  </p>

  <p className="mt-3 text-4xl font-bold text-slate-900">
    {tasks.length}
  </p>

  <p className="mt-2 text-sm text-slate-500">
    All tasks in your workspace
  </p>
</div>

<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <p className="text-sm font-medium text-slate-500">
    Completed
  </p>

  <p className="mt-3 text-4xl font-bold text-green-600">
    {tasks.filter((task) => task.status === "Completed").length}
  </p>

  <p className="mt-2 text-sm text-slate-500">
    Tasks you've finished
  </p>
</div>

<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <p className="text-sm font-medium text-slate-500">
    Pending
  </p>

  <p className="mt-3 text-4xl font-bold text-orange-500">
    {tasks.filter((task) => task.status !== "Completed").length}
  </p>

  <p className="mt-2 text-sm text-slate-500">
    Tasks still in progress
  </p>
</div>

        </section>

        {/* Tasks */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
<div>
  <h2 className="text-xl font-bold text-slate-900">
    Your Tasks
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Manage and track your current tasks.
  </p>
</div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {showForm && (
            <div className="mb-6 rounded-lg border bg-slate-50 p-4">

              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task"
                className="w-full rounded-lg border p-3"
              />

              <button
                onClick={async () => {
                 if (!newTask.trim()) return;

                 try {
                   const response = await fetch("http://localhost:5000/api/tasks", {
                     method: "POST",
                     headers: {
                       "Content-Type": "application/json",
                     },
                     body: JSON.stringify({
                       title: newTask,
                     }),
                  });

                   const data = await response.json();

                   if (!response.ok) {
                     console.error(data.message);
                     return;
                    }

                   setTasks([...tasks, data]);
                   setNewTask("");
                   setShowForm(false);
                 } catch (error) {
                   console.error("Error adding task:", error);
                 }
                }}
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save Task
              </button>

            </div>
          )}

          {/* Task List */}
          {tasks.length === 0 && (
  <div className="mb-4 rounded-xl border border-dashed border-slate-300 p-10 text-center">
    <h3 className="text-lg font-semibold text-slate-900">
      No tasks yet
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Create your first task to start organizing your work.
    </p>

    <button
      onClick={() => setShowForm(true)}
      className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      Create your first task
    </button>
  </div>
)}
          <div className="space-y-4">
            
            

            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Task #{task.id}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <span
  className={`rounded-full px-3 py-1 text-sm font-medium ${
    task.status === "Completed"
      ? "bg-green-100 text-green-700"
      : task.status === "In Progress"
      ? "bg-blue-100 text-blue-700"
      : "bg-orange-100 text-orange-700"
  }`}
>
  {task.status}
</span>

                  {task.status !== "Completed" && (
  <button
    onClick={async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${task.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Completed",
            }),
          }
        );

        const updatedTask = await response.json();

        if (!response.ok) {
          console.error(updatedTask.message);
          return;
        }

        setTasks(
          tasks.map((item) =>
            item.id === updatedTask.id ? updatedTask : item
          )
        );
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }}
    className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
  >
    Complete
  </button>
)}
                <button
  onClick={async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setTasks(tasks.filter((item) => item.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }}
  className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
>
  Delete
</button>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}

export default Dashboard;