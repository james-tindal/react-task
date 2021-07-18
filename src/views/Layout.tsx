import { connect } from "react-redux"
import { EditPost } from "../components/EditPost"
import { Post } from "../components/Post"
import { PostMenu } from "../components/PostMenu"
import { RootState } from "../core"
import './Layout.css'

export const Layout = ({ route }) =>
<div className="h-full">
  <div className="float-left overflow-auto h-full w-80 border-l-4 border-r-4">
    {route[0] === 'edit' ? <EditPost.Smart /> :
     route[0] === 'post' ? <PostMenu.Smart />
     : 'Not found' }
    </div>
  <div className="float-left overflow-auto h-full post-container p-2"><Post.Smart /></div>
</div>

Layout.Smart = connect(({ router: route }: RootState) => ({ route }))(Layout)
