const API = import.meta.env.VITE_API_URL;

export async function getTasks() {
  const res = await fetch(`${API}/tasks`);
  return res.json();
}

export async function createTask(title) {
  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

export async function updateTask(id, completed) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
}

export async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
  });
}
