import './Details.css'
import { useHistory } from 'react-router-dom';

export default function Details(props) {
    let history = useHistory()

    const ratingsComment = (ratings) => {
        let output = []
        // console.log("ratings:", ratings)
        if (ratings !== undefined) {
            for (let ratingcomment of ratings) {
                output.push(`${ratingcomment.title}(${ratingcomment.count})`)
            }
        }
        // console.log(output)
        return output.join(", ")
    }

    const genresString = (genresColletion) => {
        let output = []
        // console.log("genresColletion:", genresColletion)
        if (genresColletion !== undefined) {
            for (let genre of genresColletion) {
                output.push(genre.name)
            }
        }


        // console.log(output)
        return output.join(", ")
    }

    const stores = (stores) => {
        let output = []
        // console.log("stores:", stores)
        if (stores !== undefined) {
            for (let i in stores) {
                output.push(stores[i].store.name)
            }
        }
        // console.log(output)
        return output.join(", ")
    }

    const platforms = (platforms) => {
        let output = []
        // console.log("platforms:", platforms)
        if (platforms !== undefined) {
            for (let i in platforms) {
                output.push(platforms[i].platform.name)
            }
        }
        // console.log(output)
        return output.join(", ")
    }


    if (document.querySelector(".background1-container") !== null) {
        document.querySelector(".background1-container").style.backgroundImage = `url(${props.game.background_image})`
        document.querySelector(".background2-container").style.backgroundImage = `url(${props.game.background_image_additional})`
    }

    if (document.querySelector(".details-container") !== null) {
        const container = document.querySelector(".details-container")
        container.addEventListener("wheel", (event) => {
            // console.log(event)
        })
    }

    if (document.querySelector(".description") !== null) {
        const container = document.querySelector(".description")
        container.innerHTML = props.game.description
    }

    if (document.querySelector(".back-to-results") !== null) {
        const backToResults = document.querySelector(".back-to-results")
        backToResults.addEventListener("click", () => {
            history.replace("/search")
            const gameCards = document.querySelector(".game-cards")
            if (gameCards !== null) {
                // console.log("elements found", gameCards)
                gameCards.style.gridTemplateColumns = `repeat(${props.data.length}, 300px)`
            }
            // history.replace("/search")
        }
        )
    }

    const mouseOverHandler = (event) => {
        const displayImage = document.querySelector(".current-screenshot-image")
        displayImage.src = event.target.src
    }

    return (
        <div className='details-container'>
            { props.isPending && <div className="loading">Loading...</div> }
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
                        <img src={e.image} key={e.id} className="screenshots" onMouseEnter={(e)=> mouseOverHandler(e)} />
                    )
                })}
            </div>
            <div className="current-screenshot-container">
                <img src={props.screenshots[0]?.image} alt="" className='current-screenshot-image' />
            </div>
            <div className="background2-container"></div>
        </div>
    )
}