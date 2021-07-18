import { connect, useSelector } from "react-redux"
import { RootState } from "../core"

export const _Post = ({ author, title, body }) => <>
  <h1 className="sz-2">{title}</h1>
  <div><a href="">{author.name}</a></div>
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
    : <_Post {...select({ ...q, selectedPostId })} />
  }</>

Post.Smart = connect(
  ({ postsAndUsers }: RootState) => postsAndUsers)
