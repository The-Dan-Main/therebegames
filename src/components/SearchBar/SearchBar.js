import './SearchBar.css'


export default function SearchBar(props) {
    return (
        <div className='searchbar-container'>
            <h3 className="searchbar-header">Search</h3>
            <input type="text" name="name-search" id="nameSearchInput" placeholder="type to search by name..." onScroll={(e)=> console.log(e)}/>
            <button className="submit-search" onClick={(event) => props.getResults(event)}>Click to start Search</button>
        </div>
    )
}