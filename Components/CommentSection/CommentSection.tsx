"use client";
import React, { useState } from "react";
import styles from "./CommentSection.module.scss";

interface Comment {
  id: number;
  username: string;
  content: string;
  timestamp: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleAddComment = () => {
    if (username && content) {
      const newComment: Comment = {
        id: comments.length + 1,
        username,
        content,
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setUsername("");
      setContent("");
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Comments</h3>
      <div className={styles.commentList}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p>
                <strong>{comment.username}</strong> ({comment.timestamp})
              </p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      <div className={styles.commentForm}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}
