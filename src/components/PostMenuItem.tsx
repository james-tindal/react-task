import { Link } from '../core/router'
import './PostMenuItem.css'
export const PostMenuItem = ({ author, title, id, selected }) =>
<Link to={'/post/' + id}>
  <div className={
    `border-solid border-t-2 border-b-2 hover:bg-gray-100 py-0.5 px-1 cursor-pointer ${selected && 'selected'}`}>
    <div>{title}</div>
    <div>by {author}</div>
  </div>
</Link>