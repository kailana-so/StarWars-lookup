import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const PageContext = createContext()

export function PageProvider(props) {
    
    const [ films, setFilms ] = useState([])
    const [ filmDetails, setFilmDetails ] = useState([])
    const [ characters, setCharacters ] = useState([])
    const [ favourites, setFavourites ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ searchResults, setSearchResults ] = useState([])
    
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
        .get('http://swapi.dev/api/films/')
        .then(({ data }) => setFilms(data.results))
    },[])

    // initial pull of favourites from local storage
    useEffect(() => {
        let storedFavs = localStorage.getItem('favourites')
        const idx = storedFavs !== null ? storedFavs.match(/\d+/g) : []

        if(idx !== null) {
            console.log('go time')
            // let list = films
            console.log(films.length)
            for(let i = 0; i < films.length; i++) {
                if(films[idx[i]]) {
                    setFavourites(prevState => [...prevState, films[idx[i]]])
                }
            }  
        }
    },[films])

    // handling open to film details
    const handleOpenFilmDetails = (props) => {
        setFilmDetails(props.data)
        setCharacters([])   
        console.log(characters)

        props.data.characters.forEach((characterApi => {
            // console.log(characterApi)
            axios
            .get(`${characterApi}`)
            .then(({ data }) => data)
            .then(charactersDetails => 
                setCharacters(prevState => 
                    [...prevState, charactersDetails]
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
        <PageContext.Provider value={ { films, toRoman, favourites, filmDetails, characters, searchTerm, searchResults,  handleOpenFilmDetails, handleAddFavourite, handleRemoveFavourite, handleChange} }>
            { props.children }
        </PageContext.Provider>
    )
}