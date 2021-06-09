import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const PageContext = createContext()

export function PageProvider(props) {
    
    const [ films, setFilms ] = useState([])
    const [ filmDetails, setFilmDetails ] = useState([])
    const [ characters, setCharacters ] = useState([])
    const [ starships, setStarships ] = useState([])
    const [ species, setSpecies ] = useState([])
    const [ favourites, setFavourites ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ searchResults, setSearchResults ] = useState([])
    console.log(films)
    // handling search terms and dropdown menu
    const predictedArray = []
    const handleChange = event => {
        setSearchTerm(event.target.value);
    }
    useEffect(() => {
        films.forEach(film => {
            predictedArray.push(film.title)
        })

        const results = searchTerm === '' ? [] : predictedArray.filter(arr =>
          arr.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results)
    }, [searchTerm])

    // roman numeral lookup for episode number 
    const toRoman = {
        '1': 'I',
        '2': 'II',
        '3': 'III',
        '4': 'IV',
        '5': 'V',
        '6': 'VI'
    }

    // initial pull of movies from API
    useEffect(() => {
        axios
        .get('https://swapi.dev/api/films/')
        .then(({ data }) => setFilms(data.results))
    },[])

    // initial pull of favourites from local storage
    useEffect(() => {
        let storedFavs = localStorage.getItem('favourites')
        const idx = storedFavs !== null ? storedFavs.match(/\d+/g) : []

        if(idx !== null) {
            for(let i = 0; i < films.length; i++) {
                if(films[idx[i]]) {
                    setFavourites(prevState => [...prevState, films[idx[i]]])
                }
            }  
        }
    },[films])

    // handling open to film details
    const handleOpenFilmDetails = (props) => {
        setFilmDetails(props)
        setCharacters([])   

        //handling dropdown menu close on click
        setSearchResults([])
        setSearchTerm("")

        props.characters.forEach((characterApi => {
            // console.log('https' + characterApi.split('').slice(4).join(''))
            axios
            .get('https' + characterApi.split('').slice(4).join(''))
            .then(({ data }) => data)
            .then(charactersDetails => 
                setCharacters(prevState => 
                    [...prevState, charactersDetails]
            ))
        }))

        props.starships.forEach((starshipApi => {
            axios
            .get('https' + starshipApi.split('').slice(4).join(''))
            .then(({ data }) => data)
            .then(starshipsDetails => 
                setStarships(prevState => 
                    [...prevState, starshipsDetails]
            ))
        }))

        props.species.forEach((speciesApi => {
            axios
            .get('https' + speciesApi.split('').slice(4).join(''))
            .then(({ data }) => data)
            .then(speciesDetails => 
                setSpecies(prevState => 
                    [...prevState, speciesDetails]
            ))
        }))
    }

    // handling favourites
    const handleAddFavourite = (props) => {

        if(localStorage.getItem('favourites')){ // check if there are favourite items
            var storage = JSON.parse(localStorage['favourites'])

            for (var i = 0; i <= storage.length; i++){
                if (storage.indexOf(props.id) === -1) { //not in storage, so add it
                    // console.log('item added to favorites')
                    storage.push(props.id)
                    setFavourites(prevState => [...prevState, films[props.id]])
                    localStorage.setItem('favourites', JSON.stringify(storage))
                
                }
            }
        } else { // key "favourites" not in local storage
            var favArray = []
            favArray.push(props.id)

            setFavourites(prevState => [...prevState, films[props.id]])
            localStorage.setItem("favourites", JSON.stringify(favArray))
            // console.log('new fav added')
        }
        // setClicked(true)
    }
    const handleRemoveFavourite = (props) => {
        var storage = JSON.parse(localStorage['favourites'])

            if (favourites.indexOf(props.id)) {
                // console.log('this item exists in favs' + props.id)

                storage.splice(props.id, 1)
                localStorage.setItem('favourites', JSON.stringify(storage))
                let updatedFavs = favourites.filter(film => film.title !== props.data.title)
                setFavourites(updatedFavs)
            }
            // setClicked(false)
    }

    return (
        <PageContext.Provider value={ { films, toRoman, favourites, filmDetails, characters, starships, species, searchTerm, searchResults,  handleOpenFilmDetails, handleAddFavourite, handleRemoveFavourite, handleChange} }>
            { props.children }
        </PageContext.Provider>
    )
}