import React from 'react'

export default function Post() {
  return (
    <div className="post">
        <div className="image">
          <img src='public/chatgptvsbard.png' alt="" />
        </div>
        <div className="texts">
          <h2>ChatGPT vs Bard</h2>
          <p className="info">
            <a className="author">Author</a>
          </p>
          <p className="summary">In a sign that big tech companies are ready
            and willing to shell out cash for database tech, Neon, a startup
            building an open source alternative to AWS Aurora Postgres, on
            Wednesday announced that Microsoft’s venture arm M12 led a $25 million
            strategic investment in its business.
          </p>
        </div>
      </div>
  );
}
