
export const PostMenuItem = ({ author, title, selected }) =>
<div className={`border-solid border-t-2 border-b-2 hover:bg-gray-300 cursor-pointer ${selected && 'selected'}`}>
  <div>{title}</div>
  <div>by {author}</div>
</div>