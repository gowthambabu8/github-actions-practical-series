import pytest
from fastapi.testclient import TestClient
from app import main

client = TestClient(main.app)


@pytest.fixture(autouse=True)
def reset():
    main.tasks.clear()
    main.counter = 0


def test_health():
    assert client.get("/health").json() == {"status": "ok"}


def test_create_and_list():
    r = client.post("/tasks", json={"title": "learn actions"})
    assert r.status_code == 201
    assert r.json()["id"] == 1
    assert len(client.get("/tasks").json()) == 1


def test_delete():
    client.post("/tasks", json={"title": "x"})
    assert client.delete("/tasks/1").status_code == 204
    assert client.get("/tasks").json() == []


def test_delete_missing():
    assert client.delete("/tasks/99").status_code == 404
