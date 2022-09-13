import './Details.css'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export default function Details(props) {
    let history = useHistory()


    useEffect(() => {
        const pagination = document.querySelector(".pagination")
        const orderBy = document.querySelector(".orderBy-container")
        pagination.style.visibility = "hidden"
        orderBy.style.visibility = "hidden"
        const detailsContianer = document.querySelector(".details-container")
        const loader = document.querySelector(".lds-ripple")
        loader.style.visibility = "visible"
        detailsContianer.style.visibility = "hidden"

        setTimeout(() => {
            detailsContianer.style.visibility = "visible"
            loader.style.visibility = "hidden"
        }, 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ratingsComment = (ratings) => {
        let output = []
        if (ratings !== undefined) {
            for (let ratingcomment of ratings) {
                output.push(`${ratingcomment.title}(${ratingcomment.count})`)
            }
        }
        return output.join(", ")
    }

    const genresString = (genresColletion) => {
        let output = []
        if (genresColletion !== undefined) {
            for (let genre of genresColletion) {
                output.push(genre.name)
            }
        }
        return output.join(", ")
    }

    const stores = (stores) => {
        let output = []
        if (stores !== undefined) {
            for (let i in stores) {
                output.push(stores[i].store.name)
            }
        }
        return output.join(", ")
    }

    const platforms = (platforms) => {
        let output = []
        if (platforms !== undefined) {
            for (let i in platforms) {
                output.push(platforms[i].platform.name)
            }
        }
        return output.join(", ")
    }


    if (document.querySelector(".background1-container") !== null) {
        document.querySelector(".background1-container").style.backgroundImage = `url(${props.game.background_image})`
        document.querySelector(".background2-container").style.backgroundImage = `url(${props.game.background_image_additional})`
    }

    if (document.querySelector(".description") !== null) {
        const container = document.querySelector(".description")
        container.innerHTML = props.game.description
    }

    if (document.querySelector(".back-to-results") !== null) {
        const backToResults = document.querySelector(".back-to-results")
        backToResults.addEventListener("click", () => {
            history.replace("/")
            const gameCards = document.querySelector(".game-cards")
            if (gameCards !== null) {
                gameCards.style.gridTemplateColumns = `repeat(${props.data.length}, 300px)`
            }
            const pagination = document.querySelector(".pagination")
            const orderBy = document.querySelector(".orderBy-container")
            if (pagination !== null) {
                pagination.style.visibility = "visible"
                orderBy.style.visibility = "visible"
            }
        }
        )
    }

    const mouseOverHandler = (event) => {
        const displayImage = document.querySelector(".current-screenshot-image")
        displayImage.src = event.target.src
    }

    return (
        <div className="details-overhead">
            <div className="lds-ripple"><div></div><div></div></div>
            <div className='details-container'>
                <div className='back-to-results'>
                    <p className="back-text">Back to Results</p>
                </div>
                <div className="background1-container"></div>
                <h1 className="details-title detailed-infos">{props.game.name}</h1>
                <h3 className="release-date detailed-infos">Release Date: {props.game.released} </h3>
                <h3 className="rating detailed-infos">
                    Global Rating:{props.game.rating > 0 ? ` ${props.game.rating}/5` : " not available"}
                </h3>
                <h4 className="ratingscomments detailed-infos">Rating-Comments: {ratingsComment(props.game.ratings)}</h4>
                <h3 className="genres detailed-infos">Genres: {genresString(props.game.genres)}</h3>
                <h3 className="stores detailed-infos">Available in Stores: {stores(props.game.stores)}</h3>
                <h3 className="platforms detailed-infos">Available on Platforms: {platforms(props.game.platforms)}</h3>
                <div className="description detailed-infos"></div>
                <div className="screenshot-container">
                    {props.screenshots?.map((e) => {
                        return (
                            <img src={e.image} key={e.id} className="screenshots" onMouseEnter={(e) => mouseOverHandler(e)} alt={e.id} />
                        )
                    })}
                </div>
                <div className="current-screenshot-container">
                    <img src={props.screenshots[0]?.image} alt="" className='current-screenshot-image' />
                </div>
                <div className="background2-container"></div>
            </div>

        </div>
    )
}