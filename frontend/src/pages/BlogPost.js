import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await response.json();

        if (response.ok) {
          setPost(data);
        } else {
          setError(data.error || "Blog post not found");
        }
      } catch (err) {
        setError("Failed to fetch the blog post");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${id}`);
        const data = await response.json();

        if (response.ok) {
          setComments(data);
        } else {
          console.error("Failed to fetch comments:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err.message);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
  
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  
    try {
      const response = await fetch(`http://localhost:5000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token here
        },
        body: JSON.stringify({
          blog_id: id,
          user_id: 1, // Can be removed if your backend gets the user from the token
          content: commentText,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setComments((prev) => [data, ...prev]);
        setCommentText("");
      } else {
        setSubmitError(data.error || "Failed to add comment");
      }
    } catch (err) {
      setSubmitError("Failed to submit comment. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };
  

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p className="blog-date">{post.date}</p>
      <img src={post.image_url} alt={post.title} />
      <p>{post.content}</p>

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <small>By User {comment.user_id} on {new Date(comment.created_at).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}

        <div className="add-comment-form">
          <h4>Add a Comment</h4>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </form>
          {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;