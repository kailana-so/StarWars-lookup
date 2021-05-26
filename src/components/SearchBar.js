import './SearchBar.css'
import { useContext } from 'react'
import { PageContext } from './PageContext'
// import FilmCards from './FilmCards'

export default function SearchBar() {

    const { films, searchTerm, handleChange, searchResults } = useContext(PageContext)


    // do we want to hover and open from the drop down menu or do we want to "live search" (like the drop down menu) with the film cards??

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul className="drop-down">
                {searchResults.map(item => ( 
                    <li onClick="">{item}</li>
                ))}
            </ul>
        </div>
    )
}