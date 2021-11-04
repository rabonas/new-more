import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Search from "./pages/Search";
import ViewMovies from "./pages/ViewMovies";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
      <div className="wrapper">
        <Router>
          <ScrollToTop/>
          <Header/>
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/catalog/:genreid">
                <Catalog />
              </Route>

              <Route path="/catalog">
                <Catalog />
              </Route>

              <Route path="/movie/:id">
                <ViewMovies />
              </Route>

              <Route path="/search">
                <Search />
              </Route>

              <Route path="*">
                <NotFound />
              </Route>

            </Switch>
        </Router>
      </div>
  );
}

export default App;
