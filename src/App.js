
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import Details from './components/Details/Details';

import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [detailed, setDetailed] = useState([])
  const [screenshots, setScreenshots] = useState([])
  const [isPending, setIsPending] = useState(true)


  const addInput = (event) => {
    setInput(event.target.value)
  }

  const getResults = (id) => {
    setIsPending(true)
    // console.log("history:",history)
    const searchvalue = input
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2f0df0929cmsh9a1cb7869e69c5bp1de92bjsnc7a3e7cea091',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };
    const originalURL = `https://rawg-video-games-database.p.rapidapi.com/games?key=9f1a579f9ec54844823bd4d8a7f62e38&search=${searchvalue}&ordering=-released&search_exact=true?exclude_additions=true&page_size=50`
    const detailedURL = `https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=9f1a579f9ec54844823bd4d8a7f62e38&`
    // console.log('id: ', id)
    if (id !== undefined) {
      setDetailed([])
      fetch(detailedURL, options)
        .then(response => response.json())
        .then(response =>{
          setDetailed(response)
          setIsPending(false)
        })
        .catch(err => console.error(err));
    } else {
      setResults([])
      fetch(originalURL, options)
        .then(response => response.json())
        .then(response =>{
          setResults(response.results)
          setIsPending(false)
        })
        .catch(err => console.error(err));
    }
  }
  const addToDetails = (element) => {
    getResults(element.id)
  }

  const getDetails = (id) => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2f0df0929cmsh9a1cb7869e69c5bp1de92bjsnc7a3e7cea091',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };
    const detailedURL = `https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=9f1a579f9ec54844823bd4d8a7f62e38&`

      setDetailed([])
      fetch(detailedURL, options)
        .then(response => response.json())
        .then(response =>
          setDetailed(response)
        )
        .catch(err => console.error(err));
    
  }

  const shiftScreenshots = (data) => {
    setScreenshots([])
    setScreenshots(data)
  }

  return (
    <Router>
      <div className="App"
        onScroll={(e) => console.log('scroll detected')}>
        <Navbar />
        <SearchBar
          getResults={getResults}
          addInput={addInput}
        />
        <Switch>
          <Route exact path="/search">
            <Content
              data={results}
              addToDetails={addToDetails}
              getDetails={getDetails}
              setScreenshots={shiftScreenshots}
              isPending={isPending}
            />
          </Route>
          <Route path="/search/:key">
            <Details
              isPending={isPending}
              game={detailed}
              data={results}
              screenshots={screenshots}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;