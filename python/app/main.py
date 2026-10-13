from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
tasks = {}
counter = 0


class Task(BaseModel):
    title: str
    done: bool = False


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/tasks", status_code=201)
def create_task(task: Task):
    global counter
    counter += 1
    tasks[counter] = task
    return {"id": counter, **task.model_dump()}


@app.get("/tasks")
def list_tasks():
    return [{"id": i, **t.model_dump()} for i, t in tasks.items()]


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    del tasks[task_id]
