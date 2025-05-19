import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">React Markdown Blog</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            홈
          </Link>
          <Link to="/new" className="hover:underline">
            새 글 작성
          </Link>
        </div>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App

