import { connect } from "react-redux"
import { RootState } from "../core"
import { postsAndUsers } from "../core/postsAndUsers"
import { PostMenuItem } from "./PostMenuItem"



export const PostMenu = ({ status, result, selectedPostId, select_post }) =>
  <div className="overflow-scroll">{
    status === 'loading' ? 'Loading...' :
    status === 'error'   ? 'Error'
    : result.data.posts.map(post =>
      <PostMenuItem {...post}
        key={post.id}
        onClick={select_post(post.id)}
        selected={post.id === selectedPostId} />)
  }</div>

PostMenu.Smart = connect(
  ({
    queryResult,
    selectedPostId
  }: RootState["postsAndUsers"]) => ({
    result: queryResult,
    status: queryResult?.status,
    selectedPostId
  }),
  { select_post: postsAndUsers.actions.select_post
  }
)(PostMenu)