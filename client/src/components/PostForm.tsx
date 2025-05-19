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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col space-y-6">
      <div>
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2 text-lg">
          제목
        </label>
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="appearance-none border border-gray-300 rounded-lg w-full p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2 text-lg">
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={12}
          className="appearance-none border border-gray-300 rounded-lg w-full p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="내용을 입력하세요"
          required
        />
      </div>

      <button
        type="submit"
        className="self-start bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        {isEdit ? '수정하기' : '작성하기'}
      </button>
    </form>
  )
}

export default PostForm