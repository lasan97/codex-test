import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Post {
  id: string
  title: string
}

const PostList: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    fetch('http://localhost:8000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">게시글 목록</h2>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.id}>
            <Link
              to={`/posts/${post.id}`}
              className="block px-4 py-2 border rounded hover:bg-gray-100"
            >
              {post.title || '(제목 없음)'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList