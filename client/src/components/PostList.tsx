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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">게시글 목록</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <Link
              to={`/posts/${post.id}`}
              className="block px-6 py-4 bg-gray-50 rounded-lg shadow hover:bg-indigo-50 transition duration-300 ease-in-out border border-transparent hover:border-indigo-300"
            >
              <h3 className="text-xl font-semibold text-indigo-700">{post.title || '(제목 없음)'}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList