import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function PostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (isEdit) {
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

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = { title, content }
    try {
      const url = isEdit
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
    <div>
      <h2>{isEdit ? '게시글 수정' : '새 게시글 등록'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용 (Markdown):</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>
        <button type="submit">{isEdit ? '수정' : '등록'}</button>
      </form>
    </div>
  )
}

export default PostForm