import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

const API_BASE = "http://localhost:8080/tasks";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({  name: "", description: "" });

  const fetchTasks = async () => {
    const res = await axios.get(API_BASE);
    setTasks(res.data);
  };

  const addTask = async () => {
    if ( !form.name || !form.description) return;
    await axios.post(API_BASE, { ...form, completed: false });
    setForm({  name: "", description: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    debugger
    await axios.delete(`${API_BASE}/${id}`);
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`${API_BASE}/${id}/complete`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Task Manager</h1>
      <div className="grid gap-4">
        <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="flex justify-between items-center p-4">
            <CardContent className="flex-1 space-y-1">
              <p className="font-semibold text-lg">
                #  {task.name} {task.completed && "✅"}
              </p>
              <p className="text-gray-500 text-sm">{task.description}</p>
            </CardContent>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => completeTask(task.id)}>
                Complete
              </Button>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
