import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./app/Login";
import Signin from "./app/Signin";
import Dashboard from "./pages/Dashboard";
import PostForm from "./app/PostForm";
import Post from "./pages/Post";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/makeapost">
            <PostForm />
          </Route>

          <Route path="/post/:id">
            <Post />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
