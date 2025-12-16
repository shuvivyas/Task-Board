from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import uuid4
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: str
    title: str
    completed: bool = False

class TaskCreate(BaseModel):
    title: str

class TaskUpdate(BaseModel):
    completed: bool

tasks: list[Task] = []


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def add_task(task: TaskCreate):
    new_task = Task(id=str(uuid4()), title=task.title)
    tasks.append(new_task)
    return new_task


@app.patch("/tasks/{task_id}")
def update_task(task_id: str, update: TaskUpdate):
    for task in tasks:
        if task.id == task_id:
            task.completed = update.completed
            return task
    return {"error": "Task not found"}


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    global tasks
    tasks = [t for t in tasks if t.id != task_id]
    return {"status": "deleted"}

app.mount(
    "/", 
    StaticFiles(directory="../frontend/dist", html=True),
    name="frontend"
)