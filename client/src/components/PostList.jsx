import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title || '(제목 없음)'}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList