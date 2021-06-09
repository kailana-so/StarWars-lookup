import './SearchBar.css'
import { useContext } from 'react'
import { PageContext } from './PageContext'
import { Link } from "react-router-dom";


export default function SearchBar() {

    const { films, searchTerm, handleChange, searchResults, handleOpenFilmDetails } = useContext(PageContext)

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
            <ul className="drop-down">
                {searchResults.map(item => ( 
                    
                    <Link to={`/film-details/${item.split(' ').join('-')}`} exact="true">
                        <li onClick={() => handleOpenFilmDetails(films.filter(film => film.title === item)[0])}>{item}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}