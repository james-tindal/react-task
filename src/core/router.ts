import { createSlice } from "@reduxjs/toolkit";
import UniversalRouter from "universal-router";

export const router = createSlice({
  name: 'router',
  initialState: ['post', 0],
  reducers: {
    setRoute: (state, { payload }) => payload
  }
})


// new UniversalRouter([
//   { path: '/post/:id', action: ctx => router.actions.setRoute(['post', ctx.params.id])},
//   { path: '/edit/:id', action: ctx => router.actions.setRoute(['edit', ctx.params.id])}
// ])