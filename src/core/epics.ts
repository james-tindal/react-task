import { combineEpics, ofType } from "redux-observable"
import { catchError, combineLatest, map, mergeMap, mergeMapTo, Observable, of, pipe, startWith } from "rxjs"
import { ajax } from 'rxjs/ajax'
import { postsAndUsers } from "./postsAndUsers"

export const initial = () => of({ type: 'get_posts' })

const baseUrl = 'https://jsonplaceholder.typicode.com/'


export type Result = {
  status: 'loading'
} | {
  status: 'success'
  data: any
} | {
  status: 'error'
  error: any
}
export const Result = {
  loading: { status: 'loading' } as Result,
  success: data => ({ status: 'success', data } as Result),
  error: error => ({ status: 'error', error } as Result)
}

const apiGet = (path: string): Observable<Result> =>
  ajax(baseUrl + path).pipe(
    map(response => Result.success(response.response)),
    catchError(error => of(Result.error(error))),
    startWith(Result.loading)
  )

const getPostsAndUsers: Observable<Result> =
  combineLatest([ apiGet('posts'), apiGet('users') ]).pipe(
    map(([posts, users]) => 
      posts.status === 'error'      ? posts :
      users.status === 'error'      ? users :
      posts.status === 'success' &&
      users.status === 'success'    ? Result.success({ posts: posts.data, users: users.data })
      /* else */                    : Result.loading
    )
  )

export const getPosts = pipe(
  ofType('get_posts'),
  mergeMapTo(getPostsAndUsers),
  mergeMap(result => of(postsAndUsers.actions.get_posts_result(result)))
)

export const rootEpic = combineEpics(
  initial,
  getPosts
)