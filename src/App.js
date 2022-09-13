
import React, { useEffect, useState } from 'react';
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
  const [pageNumber, setPageNumber] = useState(1)
  const [pagination, setPagination] = useState([1, 1])


  useEffect(()=> {
    getResults( undefined, "-metacritic")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const addInput = (event) => {
    setInput(event.target.value)
  }

  const getResults = (id, sortOrder = "name", pageN = pageNumber, genre = "action") => {
    setIsPending(true)
    const searchGenre = genre === undefined ? "" : `&genres=${genre}`
    const searchvalue = input
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2f0df0929cmsh9a1cb7869e69c5bp1de92bjsnc7a3e7cea091',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };
    const originalURL = `https://rawg-video-games-database.p.rapidapi.com/games?key=9f1a579f9ec54844823bd4d8a7f62e38&search=${searchvalue}&ordering=${sortOrder}&search_exact=true${searchGenre}&exclude_additions=true&page_size=20&page=${pageN}`
    const detailedURL = `https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=9f1a579f9ec54844823bd4d8a7f62e38&`
    if (id !== undefined) {
      setDetailed([])
      fetch(detailedURL, options)
        .then(response => response.json())
        .then(response => {
          setDetailed(response)
          setIsPending(false)
        })
        .catch(err => console.error(err));
    } else {
      setResults([])
      fetch(originalURL, options)
        .then(response => response.json())
        .then(response => {
          setPagination([1, Math.ceil(response.count / 20)])
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
    setIsPending(true)
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
      .then(response => {
        setDetailed(response)
        setIsPending(false)
      }
      )
      .catch(err => console.error(err));

  }

  const shiftScreenshots = (data) => {
    setScreenshots([])
    setScreenshots(data)
  }


  return (
    <Router>
      <div className="App">
        <Navbar />
        <SearchBar
          getResults={getResults}
          addInput={addInput}
          setPageNumber={setPageNumber}
          results={results}
          pageNumber={pageNumber}
          pagination={pagination}

        />
        <Switch>
          <Route exact path="/">
            <Content
              data={results}
              addToDetails={addToDetails}
              getDetails={getDetails}
              setScreenshots={shiftScreenshots}
              isPending={isPending}
            />
          </Route>
          <Route path="/game/:key">
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