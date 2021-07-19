import { connect } from "react-redux"
import { EditPost } from "../components/EditPost"
import { Post } from "../components/Post"
import { PostMenu } from "../components/PostMenu"
import { RootState } from "../core"
import './Posts.css'

export const Posts = ({ route }) =>
<div className="h-full">
  <div className="float-left overflow-auto h-full w-80 border-l-4 border-r-4">
    <PostMenu.Smart />
  </div>
  <div className="float-left overflow-auto h-full post-container p-4">{
    route === 'post/edit' ? <EditPost.Smart /> :
    route === 'post/show' ? <Post.Smart />
    : 'Not found'
  }</div>
</div>

Posts.Smart = connect(({ router }: RootState) => ({ route: router.page }))(Posts)
