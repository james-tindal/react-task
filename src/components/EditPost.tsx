import { connect } from "react-redux"
import { RootState } from "../core"
import { postsAndUsers } from "../core/postsAndUsers"
import { router } from "../core/router"

export const EditPost_ = ({ title, body, id, save, cancel }) =>
<div>
  <form onSubmit={save(id)}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
      <input type="text" name="title" defaultValue={title} placeholder="Title"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">Body </label>
      <textarea name="body" cols={30} rows={10} defaultValue={body} placeholder="Body"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <input type="submit" value="Save"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-4" />
    <button onClick={cancel(id)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >Cancel</button>
  </form>
</div>

const select = ({ users, posts, selectedPostId }) => {
  const post = posts.find(post => post.id === selectedPostId)
  const author = users.find(user => user.id === post.userId)
  return { ...post, author }
}

export const EditPost = ({ selectedPostId, queryResult: q, save, cancel }) =>
  <>{
    q.status === 'loading' ? 'Loading...' :
    q.status === 'error'   ? 'Error'
    : <EditPost_ {...select({ ...q.data, selectedPostId })} {...{save, cancel}} />
  }</>

EditPost.Smart = connect(
  ({ postsAndUsers: { queryResult }, router }: RootState) => ({ queryResult, selectedPostId: Number(router.params.id)  }),
  dispatch => ({
    cancel: id => () => dispatch(router.actions.update('/post/' + id)),
    save: id => event => {
      event.preventDefault()
      const { title, body } = event.target.elements
      dispatch(postsAndUsers.actions.update_post({id, title: title.value, body: body.value }))
      dispatch(router.actions.update('/post/' + id))
    }
  })
)(EditPost)


// Save: get form data and give to an action. route to view this post
// Cancel: route to view post.

