import './App.css';
import FilmDetails from './components/FilmDetails';
import FilmsHomePage from './components/FilmsHomePage'
import Header  from './components/Header'

function App() {



  return (
    <div className="App">
      {/* componenets here */}
      <Header />
      <FilmsHomePage />
      <FilmDetails />
    </div>
  );
}

export default App;
