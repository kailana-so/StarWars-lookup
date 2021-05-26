import { PageContext } from './PageContext'
import { useContext } from 'react'
import './FilmsHomePage.css'
import FilmCards from './FilmCards'
import FilmCardFavs from './FilmCardFavs'

export default function FilmsHomePage() {

    const { films, favourites } = useContext(PageContext)

    return (
        <section className="films-homepage">
            {favourites ? 
                favourites.map((favourite, idx) => 
                    <FilmCardFavs key={favourite.id} id={idx} data={favourite}/>) 
                : <h1> loading favs! </h1>
            }
            {films ? 
                films.map((film, idx) => 
                    <FilmCards key={film.id} id={idx} data={film}/>) 
                : <h1> loading favs! </h1>
            }
        </section>
    )
}