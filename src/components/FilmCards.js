import './FilmCards.css'
import { PageContext } from './PageContext'
import { useContext } from 'react'
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded'
import { Link } from "react-router-dom";

export default function FilmCards(props){

    const { toRoman, handleOpenFilmDetails, handleAddFavourite } = useContext(PageContext)

    const film = props.data


    return (
        <section className="films-homepage-card">
            <span onClick={() => handleAddFavourite(props)}> 
                <StarOutlineRoundedIcon />
            </span>
            <Link to={`/profile/${film.title.split(' ').join('-')}`} exact>
            <h1 className="clickable-link" 
                onClick={() => handleOpenFilmDetails(props)}> 
                { film.title } { toRoman[film.episode_id] } 
            </h1>
            </Link>

        </section>
    )
}