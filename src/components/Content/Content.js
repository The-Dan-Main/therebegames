import './Content.css'

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
            isPressedDown = true;
            cursorXSpace = e.offsetX - cards.offsetLeft;
            // console.log(e.offsetX)
            // console.log(cards.offsetLeft)
        })

        container.addEventListener('mousemove', e => {
            if (!isPressedDown) return;
            e.preventDefault();
            console.log(cursorXSpace)
            cards.style.left = `${e.offsetX - cursorXSpace}px`
            boundCards()
        })


        container.addEventListener('wheel', e => {
            // console.log('scroll on: ', e)
            e.preventDefault();
            console.log("current position: ",cards.style.left)
            console.log("Delta Offset: ",e.deltaY/10000)
            // console.log("pos:",typeof parseInt(cards.style.left))
            // console.log("delta:",typeof e.deltaY)
            const newPosition = parseInt(cards.style.left)+(e.deltaY/1.5)
            console.log("new position: ",newPosition)
            
            cards.style.left = `${newPosition}px`

            boundCards()
        })

    }
    window.addEventListener('mouseup', () => isPressedDown = false)





    return (
        <div className='content-container'>
            <div className="game-cards">
                {props.data.length > 0 && props.data.map(function (element) {
                    return (
                        <div className="game-card" key={element.id}>
                            <img src={element.background_image !== null ? element.background_image : require('./logo.png')} alt={element.name} className="game-image" />
                            <p className="game-title">{element.name}</p>
                            <p className="game-release">{element.released !== null ? element.released : "upcoming"}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}