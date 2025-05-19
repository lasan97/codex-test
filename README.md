# React Markdown Blog

이 저장소는 React(Vite) 기반 클라이언트와 FastAPI 기반 서버로 구성된 Markdown 블로그 예제입니다.

## 요구사항
- Node.js >= 14
- Python >= 3.7

## 클라이언트 설정
```bash
cd client
npm install
npm run dev
```
브라우저에서 http://localhost:5173 에 접속하세요.

## 변경 사항
- React 컴포넌트를 JSX에서 TypeScript (TSX)로 변환 적용
- Tailwind CSS를 이용한 스타일링 적용
- App.tsx 및 main.tsx 포함 주요 진입점도 TS 및 Tailwind 적용

## 주요 기능
- `/` : 게시글 목록 조회
- `/posts/:id` : 게시글 상세 조회
- `/new` : 새 게시글 등록 (Markdown 지원)
- `/edit/:id` : 게시글 수정

## 사용된 기술 스택 및 라이브러리
- React 18, React Router DOM
- TypeScript
- Tailwind CSS
- React Markdown (remark-gfm)
- Vite (개발서버)
- FastAPI (백엔드)

## 서버 설정
```bash
cd server
# (선택) 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API 서버는 http://localhost:8000 에서 실행됩니다.

## 주요 기능
- `/` : 게시글 목록 조회
- `/posts/:id` : 게시글 상세 조회
- `/new` : 새 게시글 등록 (Markdown 지원)
- `/edit/:id` : 게시글 수정