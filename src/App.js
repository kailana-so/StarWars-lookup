import './App.css';
import FilmDetails from './components/FilmDetails';
import FilmsHomePage from './components/FilmsHomePage'
import Header  from './components/Header'
import SearchBar from './components/SearchBar';

function App() {



  return (
    <div className="App">
      {/* componenets here */}
      <Header />
      <SearchBar />
      <FilmsHomePage />
      <FilmDetails />
    </div>
  );
}

export default App;
