import React, { useState, useRef } from "react";

import "bootswatch/dist/superhero/bootstrap.min.css";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskImput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskImput.current?.focus();
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const DoneTask = (i: number) => {
    const newTask: ITask[] = [...tasks];
    newTask[i].done = !newTask[i].done;
    setTasks(newTask);
  };

  const removeTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskImput}
                  autoFocus
                />
                <div className="d-grid">
                  <button className="btn btn-info mt-2">Save</button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => {
            return (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.name}
                </h2>
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => DoneTask(i)}
                  >
                    {t.done ? "✅" : "❌"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTask(i)}
                  >
                    {"🗑"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
