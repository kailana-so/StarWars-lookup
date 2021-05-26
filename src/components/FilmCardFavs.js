import './FilmCards.css'
import { PageContext } from './PageContext'
import { useContext } from 'react'
import StarRoundedIcon from '@material-ui/icons/StarRounded';

export default function FilmCards(props){

    const { toRoman, handleOpenFilmDetails, handleRemoveFavourite } = useContext(PageContext)
    const film = props.data

    return (
        <section className="films-fav-card">
            <span onClick={() => handleRemoveFavourite(props)}> 
                <StarRoundedIcon /> 
            </span>
            <h1 className="clickable-link" onClick={() => handleOpenFilmDetails(props)}> { film.title } {toRoman[film.episode_id]} </h1>
        </section>
    )
}