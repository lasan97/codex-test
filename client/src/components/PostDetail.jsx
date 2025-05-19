import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('게시글을 불러오는 중 오류')
        return res.json()
      })
      .then(data => setPost(data))
      .catch(err => console.error(err))
  }, [id])

  if (!post) return <div>Loading...</div>

  return (
    <div>
      <h2>{post.title}</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      <button onClick={() => navigate(`/edit/${post.id}`)}>수정</button>{' '}
      <Link to="/">목록으로</Link>
    </div>
  )
}

export default PostDetail