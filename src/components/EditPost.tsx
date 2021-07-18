import { connect } from "react-redux"
import { RootState } from "../core"
import { router } from "../core/router"

export const EditPost = ({ title, body, save, cancel }) =>
<div>
  <form>
    <label>Title <input type="text" value={title} /></label>
    <label>Body <textarea name="body" cols={30} rows={10} value={body}></textarea></label>
    <button onClick={save}>Save</button> <button onClick={cancel}>Cancel</button>
  </form>
</div>

EditPost.Smart = connect(
  ({ postsAndUsers: { queryResult: { data } } }: RootState) => (),
  { save: , cancel: router.actions.setRoute() }
)(EditPost)
