import { PageContext } from './PageContext'
import { useContext } from 'react'
import './FilmDetails.css'
var moment = require('moment'); // require

export default function FilmDetails() {

    const { filmDetails, characters} = useContext(PageContext)
    const dateArray = filmDetails.length !== 0 ? filmDetails.release_date.split('-') : 0

    return (
        <article className="film-details">
            <div className="film-details-content">
                <h1>
                    {filmDetails.title}
                </h1>
                <h4> 
                    {filmDetails.director} 
                </h4>
                <h4> 
                    {filmDetails.producer} 
                </h4>
                <h5>
                    {moment(dateArray).format("dddd, MMMM Do YYYY")}
                </h5>
                <p>
                    {filmDetails.opening_crawl}
                </p>
                <ul>
                    {characters.length !== 0 ? characters.map(character => {
                        return <li>{character.name}</li>
                    }) : 'loading!'}
                </ul>
            </div>
        </article>
    )

}