
import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Content from './components/Content/Content';

function App() {


  const [results, setResults] = useState([])



  const getResults = (event) => {
    const searchvalue = event.target.previousSibling.value
    // console.log(event.target.previousSibling.value)

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2f0df0929cmsh9a1cb7869e69c5bp1de92bjsnc7a3e7cea091',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };

    fetch(`https://rawg-video-games-database.p.rapidapi.com/games?key=9f1a579f9ec54844823bd4d8a7f62e38&search=${searchvalue}&ordering=name&search_exact=true?exclude_additions=true`, options)
      .then(response => response.json())
      .then(response =>
        setResults(response.results)
        
        )
      .catch(err => console.error(err));
  }







  return (
    <div className="App"
    onScroll={(e) => console.log('scroll detected')}>
      <Navbar />
      <SearchBar 
      getResults={getResults}
      />
      <Content 
      data={results}
      />
    </div>
  );
}

export default App;
