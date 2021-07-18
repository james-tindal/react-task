import { connect } from "react-redux"
import { RootState } from "../core"

export const _Post = ({ author, title, body }) => <>
  <button className="bg-blue-400 text-gray-100 px-2 rounded hover:bg-blue-300">Edit</button>
  <h1 className="text-4xl">{title}</h1>
  <div className="pb-6">by <a href="">{author.name}</a></div>
  <div>{body}</div>
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
    : <_Post {...select({ ...q.data, selectedPostId })} />
  }</>

Post.Smart = connect(
  ({ postsAndUsers: { queryResult }, router: route }: RootState) =>
    ({ queryResult, selectedPostId: route[1] })
)(Post)
