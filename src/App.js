import './App.css';
import FilmDetails from './components/FilmDetails';
import FilmsHomePage from './components/FilmsHomePage'
import Header  from './components/Header'
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {



  return (

    <div className="App">
      <Router>
            <Link to="/">
              <Header />
            </Link>
        <Switch>
          <Route exact path="/" component={FilmsHomePage} />
          <Route path="/profile/:title" component={FilmDetails} />
        </Switch>
      </Router>
    </div>
    // <div className="App">
    //   {/* componenets here */}
    //   <Header />
    //   <SearchBar />
    //   <FilmsHomePage />
    //   <FilmDetails />
    // </div>
  );
}

export default App;
