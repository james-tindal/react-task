import { connect } from "react-redux"
import { RootState } from "../core"
import { postsAndUsers } from "../core/postsAndUsers"
import { PostMenuItem } from "./PostMenuItem"



export const PostMenu = ({ status, data, selectedPostId, select_post }) =>
  <div>{
    status === 'loading' ? 'Loading...' :
    status === 'error'   ? 'Error'
    : data.posts.map(post =>
      <PostMenuItem {...post}
        key={post.id}
        author={data.users.find(user => user.id === post.userId).name}
        onClick={() => select_post(post.id)}
        selected={post.id === selectedPostId} />)
  }</div>

PostMenu.Smart = connect(
  ({
    postsAndUsers: {
// @ts-ignore
      queryResult: { status, data },
      selectedPostId
    }
  }: RootState) => ({
    data,
    status,
    selectedPostId
  }),
  { select_post: postsAndUsers.actions.select_post
  }
)(PostMenu)