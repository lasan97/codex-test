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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight border-b-4 border-indigo-500 pb-3">
        게시글 목록
      </h2>
      <ul className="space-y-6">
        {posts.map(post => (
          <li key={post.id}>
            <Link
              to={`/posts/${post.id}`}
              className="block px-8 py-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200 hover:border-indigo-400"
            >
              <h3 className="text-2xl font-extrabold text-indigo-600 truncate">
                {post.title || '(제목 없음)'}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList