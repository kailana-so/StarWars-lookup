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

    const { filmDetails, characters, starships, species, toRoman } = useContext(PageContext)
    const dateArray = filmDetails.length !== 0 ? filmDetails.release_date.split('-') : 0

    const ItemTooltip = withStyles((theme) => ({
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
                    {filmDetails.title} {toRoman[filmDetails.episode_id]}
                </h1>
                <p> 
                    Director: {filmDetails.director} 
                </p>
                <p> 
                    Producer: {filmDetails.producer} 
                </p>
                <p>
                    Release: {moment(dateArray).format("dddd, MMMM Do YYYY")}
                </p>
                <p>
                    {filmDetails.opening_crawl}
                </p>
                <h4> 
                    Characters:
                </h4>
                <section className="character-card-container">
                    {characters.length !== 0 ? characters.map(character => {
                        return (
                            <ItemTooltip
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
                            </ItemTooltip>
                        )}) 
                        : 'Loading!'}
                </section>
                <h4> 
                    Species:
                </h4>
                <section className="character-card-container">
                    {species.length !== 0 ? species.map(spec => {
                        return (
                            <ItemTooltip
                            arrow
                            title={
                                <React.Fragment>
                                    <b>Name:</b> {spec.name}
                                    <br></br>
                                    <b>Life Span:</b> {spec.average_lifespan}
                                    <br></br>
                                    <b>Classification:</b> {spec.classification}
                                    <br></br>
                                    <b>Designation:</b> {spec.designation}
                                    <br></br>
                                    <b>Language:</b> {spec.language}
                                </React.Fragment>
                            }
                            placement="top"
                            >
                                <div className="character-card">{spec.name}</div>
                            </ItemTooltip>
                        )}) 
                        : 'Loading!'}
                </section>
                <h4> 
                    Starships:
                </h4>
                <section className="character-card-container">
                    {starships.length !== 0 ? starships.map(starship => {
                        return (
                            <ItemTooltip
                            arrow
                            title={
                                <React.Fragment>
                                    <b>Model:</b> {starship.model}
                                    <br></br>
                                    <b>Passengers:</b> {starship.passengers}
                                    <br></br>
                                    <b>Megalight:</b> {starship.MGLT}
                                    <br></br>
                                    <b>Cargo Capacity:</b> {starship.cargo_capacity}
                                    <br></br>
                                    <b>Crew:</b> {starship.crew}
                                    <br></br>
                                    <b>Hyperdrive Rating:</b> {starship.hyperdrive_rating}
                                    <br></br>
                                    <b>Manufacturer:</b> {starship.manufacturer}
                                    <br></br>
                                    <b>Starship Class:</b> {starship.starship_class}   
                                </React.Fragment>
                            }
                            placement="top"
                            >
                                <div className="character-card">{starship.name}</div>
                            </ItemTooltip>
                        )}) 
                        : 'Loading!'}
                </section>
                <Link to="/">
                    <KeyboardReturnRoundedIcon/>
                </Link>
                
            </div>
        </article>
    )

}