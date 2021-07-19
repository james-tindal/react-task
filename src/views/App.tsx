import { connect } from "react-redux"
import { RootState } from "../core"
import { Posts } from "./Posts"
import { User } from "./User"

export const App = ({ route }) =>
  route === 'user'      ? <User.Smart /> :
  /^post\//.test(route) ? <Posts.Smart /> 
                        : <div>Not found</div>


App.Smart = connect(({ router }: RootState) => ({ route: router.page }))(App)