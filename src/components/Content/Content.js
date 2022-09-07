import './Content.css'
import { Link } from 'react-router-dom';

export default function Content(props) {


    const container = document.querySelector(".content-container")
    const cards = document.querySelector(".game-cards")

    let isPressedDown = false;
    let cursorXSpace;

    function boundCards() {
        const countainer_rect = container.getBoundingClientRect()
        const cards_rect = cards.getBoundingClientRect()
        if (cards.offsetLeft > 0) {
            cards.style.left = 0
        } else if (cards_rect.right < countainer_rect.right) {
            cards.style.left = `-${cards_rect.width - countainer_rect.width}px`
        }
    }

    if (container !== null) {
        container.addEventListener('mousedown', e => {
            // console.log(e.offsetX)
            // console.log(cards.offsetLeft)
            isPressedDown = true;
            cursorXSpace = e.offsetX - cards.offsetLeft;
        })

        container.addEventListener('mousemove', e => {
            // console.log(cursorXSpace)
            if (!isPressedDown) return;
            e.preventDefault();
            cards.style.left = `${e.offsetX - cursorXSpace}px`
            boundCards()
        })


        container.addEventListener('wheel', e => {
            // console.log('scroll on: ', e)
            // console.log("current position: ", cards.style.left)
            // console.log("Delta Offset: ", e.deltaY / 10000)
            // console.log("pos:",typeof parseInt(cards.style.left))
            // console.log("delta:",typeof e.deltaY)
            // console.log("new position: ", newPosition)
            e.preventDefault();
            const newPosition = parseInt(cards.style.left) + (e.deltaY / 1.5)
            cards.style.left = `${newPosition}px`
            boundCards()
        })

    }
    window.addEventListener('mouseup', () => isPressedDown = false)

    const gameCards = document.querySelector(".game-cards")
    if (gameCards !== null) {
        // console.log("elements found", gameCards)
        gameCards.style.gridTemplateColumns = `repeat(${props.data.length}, 300px)`
    }

    const clickHandlerLink = (element) => {
        props.addToDetails(element)
        console.log("screenshots added")
        props.setScreenshots(element.short_screenshots)
    }


    return (
        <div className='content-container'>
            <div className="game-cards">
                {props.data.length > 0 && props.data.map(function (element) {
                    return (
                        <div className="game-card" key={element.id}>
                            <img
                                src={element.background_image !== null ? element.background_image : require('./logo.png')}
                                alt={element.name}
                                className="game-image"
                            />
                            <p
                                className="game-title"
                                onClick={() => clickHandlerLink(element)}
                            >
                                <Link to={`/search/${element.id}`} onClick={() => clickHandlerLink(element)}>
                                    {element.name}
                                </Link>
                            </p>
                            <p
                                className="game-release"
                                onClick={() => props.addToDetails(element)}
                            >
                                <Link to={`/search/${element.id}`}  >
                                    {element.released !== null ? element.released : "upcoming"}
                                </Link>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}