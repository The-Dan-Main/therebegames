import { Link, useHistory } from 'react-router-dom';
import './SearchBar.css'

export default function SearchBar(props) {
    // console.log("history:", useHistory())
    // console.log("Location:", useLocation())
    let history = useHistory()
    // let location = useLocation()

    const changeURL = (event) => {
        // console.log(event)
        if (event.key === "Enter") {
            history.push("/search")
            props.getResults()
            // console.log("enter fired")
        }
    }

    const handleClickArrow = (e) => {
        // console.log(e.target.nextSibling.lastChild.selectedOptions[0].value)
        e.target.classList.toggle("upsidedown")
        const ordering = e.target.nextSibling.lastChild.selectedOptions[0].value
        const orderingDirection = e.target.classList.contains("upsidedown") ? "-" : ""
        // console.log(orderingDirection + ordering)
        const sortOrder = orderingDirection + ordering
        props.getResults(undefined, sortOrder)
    }

    const handleClickPrevious = () => {
        console.log(window.location.href)
        if (props.pageNumber !== 1) {
            const e = document.querySelector("select")
            const ordering = e.selectedOptions[0].value
            const orderingDirection = e.classList.contains("upsidedown") ? "-" : ""
            const sortOrder = orderingDirection + ordering
            const newPageNumber = props.pageNumber - 1
            props.setPageNumber(newPageNumber)
            props.getResults(undefined, sortOrder)
        }
    }

    const handleClickNext = () => {
        console.log(window.location.href.indexOf("search"))
        const e = document.querySelector("select")
        const ordering = e.selectedOptions[0].value
        const orderingDirection = e.classList.contains("upsidedown") ? "-" : ""
        const sortOrder = orderingDirection + ordering
        const newPageNumber = props.pageNumber + 1
        props.setPageNumber(newPageNumber)
        props.getResults(undefined, sortOrder)
    }

    return (
        <div>
            <div className='searchbar-container'>
                <div className="orderBy-container">
                    <img src={require("./arrow.png")} alt="sort order" id='arrow1' className='upsidedown' onMouseUp={(event) => handleClickArrow(event)} />
                    <div className="selection">
                        <p className="orderBy-title">Order By:</p>
                        <select name="order by">
                            <option value="name">Name</option>
                            <option value="released">Released</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
                <input type="text" name="name-search" id="nameSearchInput" placeholder="type to search by name..."
                    onKeyDown={(event) => changeURL(event)}
                    onChange={(event) => { props.addInput(event) }} />
                <Link to="/search">
                    <button className="submit-search" onClick={() => props.getResults()}>Click to start Search</button>
                </Link>
            </div>
            {props.results?.length > 0 && window.location.href.indexOf("search") !== -1 ?
                <div className='pagination'>
                    <p className="previousPage" onClick={() => handleClickPrevious()}>Previous Page</p>
                    <p className="nextPage" onClick={() => handleClickNext()}>Next Page</p>
                </div>
                : undefined
            }
        </div>
    )
}