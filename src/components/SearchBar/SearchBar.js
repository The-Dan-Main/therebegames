import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SearchBar.css'

export default function SearchBar(props) {
    let history = useHistory()

    useEffect(() => {
        const pagination = document.querySelector(".pagination")
        const orderBy = document.querySelector(".orderBy-container")
        if (pagination !== null && window.location.href === "http://localhost:3000/") {
            pagination.style.visibility = "visible"
            orderBy.style.visibility = "visible"
        }
        // Pagination offset if only one page
        const nextP = document.querySelector(".nextPage")
        const previousP = document.querySelector(".previousPage")
        if (props.pageNumber === props.pagination[1] && nextP) {
            nextP.classList.add("pageNAN")
            previousP.classList.add("pageNAN")
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const changeURL = (event) => {
        if (event.key === "Enter") {
            history.push("/")
            props.getResults()
        }
    }

    const handleClickArrow = (e) => {
        e.target.classList.toggle("upsidedown")
        const ordering = e.target.nextSibling.lastChild.selectedOptions[0].value
        const orderingDirection = e.target.classList.contains("upsidedown") ? "-" : ""
        // console.log(orderingDirection + ordering)
        const sortOrder = orderingDirection + ordering
        props.getResults(undefined, sortOrder)
    }

    const handleClickPrevious = () => {
        const e = document.querySelector("select")
        const ordering = e.selectedOptions[0].value
        const orderingDirection = e.classList.contains("upsidedown") ? "-" : ""
        const sortOrder = orderingDirection + ordering
        const newPageNumber = props.pageNumber - 1
        props.setPageNumber(newPageNumber)
        props.getResults(undefined, sortOrder)
    }

    const handleClickNext = () => {
            const e = document.querySelector("select")
            const ordering = e.selectedOptions[0].value
            const orderingDirection = e.classList.contains("upsidedown") ? "-" : ""
            const sortOrder = orderingDirection + ordering
            const newPageNumber = props.pageNumber + 1
            props.setPageNumber(newPageNumber)
            props.getResults(undefined, sortOrder, newPageNumber)
    }

    return (
        <div>
            <div className='searchbar-container'>

                <div className="orderBy-container">
                    <img src={require("./arrow.png")} alt="sort order" id='arrow1' className='upsidedown' onMouseUp={(event) => handleClickArrow(event)} />
                    <div className="selection">
                        <p className="orderBy-title">Order By:</p>
                        <select name="order by">
                            <option value="metacritic">Popularity</option>
                            <option value="name">Name</option>
                            <option value="released">Released</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
                <div className="searchInput">
                    <input type="text" name="name-search" id="nameSearchInput" placeholder="type to search by name..."
                        onKeyDown={(event) => changeURL(event)}
                        onChange={(event) => { props.addInput(event) }}
                    />
                    <div className="enterPress">Enter</div>
                </div>
                <Link to="/">
                    <button className="submit-search" onClick={() => props.getResults()}>Click to start Search</button>
                </Link>
            </div>
            {props.results?.length > 0 &&
                <div className='pagination'>
                    <p className="previousPage" onClick={() => handleClickPrevious()}>Previous Page</p>
                    <p className="currentPage">Current Page {props.pageNumber}/{props.pagination[1]} </p>
                    <p className="nextPage" onClick={() => handleClickNext()}>Next Page </p>
                </div>
            }
        </div>
    )
}