import { connect } from "react-redux"
import { RootState } from "../core"
import { Link } from "../core/router"

const User_ = ({ name, website, company, posts }) =>
<div>
  <h1 className="text-4xl">{name}</h1>
  <div>Website: <a className="text-blue-400" href={'http://' + website}>{website}</a></div>
  <div>Company: {company.name}</div>

  {/* <h1 className="text-2xl mt-4">Photo albums</h1> */}

  <h1 className="text-2xl mt-4">Posts</h1>
  <div>{posts.map(post => <Link className="block text-blue-400" to={'/post/' + post.id}>{post.title}</Link>)}</div>
</div>

export const User = ({ userId, queryResult: q }) =>
  <>{
    q.status === 'loading' ? 'Loading...' :
    q.status === 'error'   ? 'Error'
    : <User_
        {...q.data.users.find(user => user.id == userId)}
        posts={q.data.posts.filter(post => post.userId == userId)} />
  }</>


User.Smart = connect(({ router, postsAndUsers: { queryResult }}: RootState) =>
  ({ userId: router.params.id, queryResult })
)(User)
