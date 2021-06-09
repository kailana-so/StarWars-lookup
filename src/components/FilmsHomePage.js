import { PageContext } from './PageContext'
import { useContext } from 'react'
import './FilmsHomePage.css'
import FilmCards from './FilmCards'
import FilmCardFavs from './FilmCardFavs'

export default function FilmsHomePage() {

    const { films, favourites } = useContext(PageContext)

    // WORK OUT THE DELAY HERE OR SCRAP THE FILTER  - bugggy 
    // let notIncFavs = films.filter(film => 
    //     !favourites.find(({ title }) => film.title === title))
    // console.log(notIncFavs)

    return (
        <section className="films-homepage">
            {favourites ? 
                favourites.map((favourite, idx) => 
                    <FilmCardFavs key={favourite.title} id={idx} data={favourite}/>) 
                : <h1> loading favs! </h1>
            }
            {films ? 
                films.map((film, idx) => 
                        <FilmCards key={film.title} id={idx} data={film}/>)
                : <h1> loading favs! </h1>
            }
        </section>
    )
}