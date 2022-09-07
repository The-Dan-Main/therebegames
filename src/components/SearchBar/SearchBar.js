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

    return (
        <div className='searchbar-container'>
            {/* <h3 className="searchbar-header">Search</h3> */}
            <input type="text" name="name-search" id="nameSearchInput" placeholder="type to search by name..."
                onKeyDown={(event) => changeURL(event)} 
                onChange={(event) => { props.addInput(event) }} />
            <Link to="/search">
                <button className="submit-search" onClick={() => props.getResults()}>Click to start Search</button>
            </Link>
        </div>
    )
}