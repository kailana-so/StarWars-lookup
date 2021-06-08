import React from "react";
import { PageContext } from './PageContext'
import { useContext } from 'react'
import { Link } from  "react-router-dom";
import './FilmDetails.css'
import KeyboardReturnRoundedIcon from '@material-ui/icons/KeyboardReturnRounded';
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from '@material-ui/core/styles';


var moment = require('moment'); // require

export default function FilmDetails() {

    const { filmDetails, characters} = useContext(PageContext)
    const dateArray = filmDetails.length !== 0 ? filmDetails.release_date.split('-') : 0
    console.log(characters)

    const CharacterTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: 'white',
            color: 'black',
            minWidth: 220,
            fontSize: '16px',
            fontFamily: 'Roboto Mono',
            padding: '5%',
            border: '2px solid white',
        },
        arrow: {
            color: theme.palette.common.white
        }
      }))(Tooltip);

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
                <h4>
                    {moment(dateArray).format("dddd, MMMM Do YYYY")}
                </h4>
                <p>
                    {filmDetails.opening_crawl}
                </p>
                <section className="character-card-container">
                    {characters.length !== 0 ? characters.map(character => {
                        return (
                            <CharacterTooltip
                            arrow
                            title={
                                <React.Fragment>
                                    <b>Name:</b> {character.name}
                                    <br></br>
                                    <b>Birth year:</b> {character.birth_year}
                                    <br></br>
                                    <b>Eye colour:</b> {character.eye_color}
                                    <br></br>
                                    <b>Gender:</b> {character.gender}
                                    <br></br>
                                    <b>Hair Colour:</b> {character.hair_color}
                                    <br></br>
                                    <b>Height:</b> {character.height}
                                    
                                </React.Fragment>
                            }
                            placement="top"
                            >
                                <div className="character-card">{character.name}</div>
                            </CharacterTooltip>
                        )}) 
                        : 'loading!'}
                </section>
                <Link to="/">
                    <KeyboardReturnRoundedIcon/>
                </Link>
                
            </div>
        </article>
    )

}