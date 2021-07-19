import { createSlice, Store } from "@reduxjs/toolkit"
import createMatcher from 'feather-route-matcher'
import { connect } from "react-redux"

const _matcher = createMatcher({
  '/'             : 'root',
  '/post/:id'     : 'post/show',
  '/post/:id/edit': 'post/edit',
  '/user/:id'     : 'user',
  '/*'            : 'not-found'
})
const matcher = (pathname: string): State => {
  const match = _matcher(pathname)
  return match.value === 'root'
    ? { page: 'post/show', params: { id: '1' } , pathname: '/' }
    : { page: match.value, params: match.params, pathname }
}

type State = {
  page: string
  params: { [key: string]: string }
  pathname: string
}

export const router = createSlice({
  name: 'router',
  initialState: matcher(window.location.pathname) as State,
  reducers: {
    update: (state, { payload }) => matcher(payload)
  }
})


export const routeListener = (store: Store) => {
  window.addEventListener('popstate', () =>
    store.dispatch(router.actions.update(window.location.pathname)))

  store.subscribe(() => {
    const { pathname } = store.getState().router
    if (window.location.pathname !== pathname) {
      window.history.pushState(null, '', pathname)
      document.body.scrollTop = 0
      document.body.scrollLeft = 0
    }
  })
}

const _Link = ({ to, children, go, ...props }) =>
  <a href={to} onClick={e => { e.preventDefault(); go(to) }} {...props}>{children}</a>

export const Link = connect(null, { go: router.actions.update })(_Link)