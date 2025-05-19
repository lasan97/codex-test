import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface RouteParams {
  id?: string
}

const PostForm: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:8000/api/posts/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('게시글을 불러오는 중 오류')
          return res.json()
        })
        .then(data => {
          setTitle(data.title)
          setContent(data.content)
        })
        .catch(err => console.error(err))
    }
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = { title, content }
    try {
      const url = isEdit && id
        ? `http://localhost:8000/api/posts/${id}`
        : 'http://localhost:8000/api/posts'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('저장 중 오류')
      const data = await res.json()
      navigate(`/posts/${data.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? '게시글 수정' : '새 게시글 등록'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">제목:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">내용 (Markdown):</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={10}
            required
            className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isEdit ? '수정' : '등록'}
        </button>
      </form>
    </div>
  )
}

export default PostForm