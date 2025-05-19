from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(__file__)
POSTS_DIR = os.path.join(BASE_DIR, "posts")
if not os.path.exists(POSTS_DIR):
    os.makedirs(POSTS_DIR)

class Post(BaseModel):
    id: str
    title: str
    content: str

class PostCreate(BaseModel):
    title: str
    content: str

@app.get("/api/posts", response_model=List[Post])
def list_posts():
    posts = []
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith(".md"):
            post_id = filename[:-3]
            filepath = os.path.join(POSTS_DIR, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()
            lines = text.splitlines()
            if lines and lines[0].startswith("# "):
                title = lines[0][2:]
                content = "\n".join(lines[1:]).lstrip()
            else:
                title = ""
                content = text
            posts.append(Post(id=post_id, title=title, content=content))
    return posts

@app.get("/api/posts/{post_id}", response_model=Post)
def get_post(post_id: str):
    filepath = os.path.join(POSTS_DIR, f"{post_id}.md")
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Post not found")
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.splitlines()
    if lines and lines[0].startswith("# "):
        title = lines[0][2:]
        content = "\n".join(lines[1:]).lstrip()
    else:
        title = ""
        content = text
    return Post(id=post_id, title=title, content=content)

@app.post("/api/posts", response_model=Post)
def create_post(post: PostCreate):
    post_id = str(uuid.uuid4())
    filepath = os.path.join(POSTS_DIR, f"{post_id}.md")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# {post.title}\n\n{post.content}")
    return Post(id=post_id, title=post.title, content=post.content)

@app.put("/api/posts/{post_id}", response_model=Post)
def update_post(post_id: str, post: PostCreate):
    filepath = os.path.join(POSTS_DIR, f"{post_id}.md")
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Post not found")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# {post.title}\n\n{post.content}")
    return Post(id=post_id, title=post.title, content=post.content)