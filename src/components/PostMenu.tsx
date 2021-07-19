import { connect } from "react-redux"
import { RootState } from "../core"
import { PostMenuItem } from "./PostMenuItem"



export const PostMenu = ({ status, data, selectedPostId }) =>
  <div>{
    status === 'loading' ? 'Loading...' :
    status === 'error'   ? 'Error'
    : data.posts.map(post =>
      <PostMenuItem {...post}
        key={post.id}
        author={data.users.find(user => user.id === post.userId).name}
        selected={post.id === selectedPostId} />)
  }</div>

PostMenu.Smart = connect(
  ({
    postsAndUsers: {
// @ts-ignore
      queryResult: { status, data },
    },
    router
  }: RootState) => ({
    data,
    status,
    selectedPostId: Number(router.params.id)
  })
)(PostMenu)