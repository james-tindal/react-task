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
type select_post = Action<number>

export const postsAndUsers = createSlice({
  name: 'postsAndUsers',
  initialState: {
    queryResult: Result.loading
  } as State,
  reducers: {
    get_posts_result: 
      (state: State, { payload }: get_posts_result) =>
        ({ ...state, queryResult: payload }),
    select_post:
      (state: State, { payload }: select_post) =>
        ({ ...state, selectedPostId: payload })
  }
})