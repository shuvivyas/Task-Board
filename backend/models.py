from dataclasses import dataclass
from uuid import uuid4

@dataclass
class Task:
    id: str
    title: str
    completed: bool = False
