<div className="post">
    <div className="post-left">
        <img src={post.imageUrl} alt="Bài viết" className="post-image" />
    </div>
    <div className="post-right">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div className="post-footer">
            <button className="like-button" onClick={() => handleLike(post._id)}>
                ❤️ {post.likes}
            </button>
            <div className="comments-section">
                <input 
                    type="text" 
                    className="comment-input" 
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="comment-button" onClick={() => handleComment(post._id)}>
                    Bình luận
                </button>
            </div>
        </div>
    </div>
</div>
