import { connect } from "react-redux"
import { RootState } from "../core"
import { Link } from "../core/router"

const Post_ = ({ author, title, body, id }) => <>
  <Link to={`/post/${id}/edit`}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline pointer inline-block mb-4"
  >Edit</Link>
  <h1 className="text-4xl">{title}</h1>
  <div className="pb-6">by <Link to={'/user/' + author.id} className="text-blue-400 cursor-pointer">{author.name}</Link>
  </div>
  <div className="whitespace-pre-wrap">{body}</div>
</>

const select = ({ users, posts, selectedPostId }) => {
  const post = posts.find(post => post.id === selectedPostId)
  const author = users.find(user => user.id === post.userId)
  return { ...post, author }
}

export const Post = ({ selectedPostId, queryResult: q }) =>
  <>{
    q.status === 'loading' ? 'Loading...' :
    q.status === 'error'   ? 'Error'
    : <Post_ {...select({ ...q.data, selectedPostId })} />
  }</>

Post.Smart = connect(
  ({ postsAndUsers: { queryResult }, router }: RootState) =>
    ({ queryResult, selectedPostId: Number(router.params.id) })
)(Post)
