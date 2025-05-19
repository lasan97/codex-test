import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Post {
  id: string
  title: string
  content: string
}

interface RouteParams {
  id?: string
}

const PostDetail: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('게시글을 불러오는 중 오류')
        return res.json()
      })
      .then(data => setPost(data))
      .catch(err => console.error(err))
  }, [id])

  if (!post) return <div className="text-center p-4">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <article className="prose prose-blue">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
      <div className="mt-6 space-x-4">
        <button
          onClick={() => navigate(`/edit/${post.id}`)}
          className="px-4 py-2 border rounded bg-yellow-300 hover:bg-yellow-400"
        >
          수정
        </button>
        <Link
          to="/"
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          목록으로
        </Link>
      </div>
    </div>
  )
}

export default PostDetail