const BlogPost = ({ id, title, content, author, username, tags }) => {
  return (
    <div className="glass blog-post-container bg-white rounded-lg shadow-md p-6 m-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-2">{content}</p>
      <div className="flex items-center justify-between text-gray-500">
        <p>By {author}</p>
        <p>@{username}</p>
      </div>
      <div className="mt-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
