import { createSlice } from '@reduxjs/toolkit'
import { Result } from './epics'


type State = {
  queryResult: Result
  selectedPostId: number
}
type Action<T> = {
  type: string
  payload: T
}
type get_posts_result = Action<Result>

export const postsAndUsers = createSlice({
  name: 'postsAndUsers',
  initialState: {
    queryResult: Result.loading
  } as State,
  reducers: {
    get_posts_result: 
      (state: State, { payload }: get_posts_result) =>
        ({ ...state, queryResult: payload }),
    update_post:
      (state: State, { payload: {id, title, body} }) => {
        // @ts-ignore
        const post = state.queryResult.data.posts.find(post => post.id === id)
        post.title = title
        post.body = body
      }
  }
})