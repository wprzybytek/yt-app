import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Videos from "./components/Videos";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoDetails from './components/VideoDetails';

function App() {
    const [videos, setVideos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchText, setText] = useState('')
    const [prevPageToken, setPrev] = useState(0)
    const [nextPageToken, setNext] = useState(0)

    const onClick = async (text) => {
        setText(text)
        const data = await fetchVideos(text)
        setVideos(data.items)
        setNext(data.nextPageToken)
        setPrev(data.prevPageToken)
        setCurrentPage(1)
    }

    const fetchVideos = async (text) => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}&maxResults=10&type=video&key=AIzaSyBiGDh7FP4jOsMdjcNaeDh6Xs7ZOHinr88`)
        const data = await res.json()
        return data
    }

    const changePage = async (next) => {
        let res
        if(next) {
            setCurrentPage(currentPage + 1)
            res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&maxResults=10&type=video&key=AIzaSyBiGDh7FP4jOsMdjcNaeDh6Xs7ZOHinr88&pageToken=${nextPageToken}`)
        }
        else {
            setCurrentPage(currentPage - 1)
            res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&maxResults=10&type=video&key=AIzaSyBiGDh7FP4jOsMdjcNaeDh6Xs7ZOHinr88&pageToken=${prevPageToken}`)
        }   
        const data = await res.json()
        setVideos(data.items)
        setNext(data.nextPageToken)
        setPrev(data.prevPageToken)
    }

    return (
        <BrowserRouter>
        <div className="container-fluid">
            <NavBar onClick={onClick}/>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path='/search' 
                    element={<Videos videos={videos} changePage={changePage} currentPage={currentPage}/>}
                />
                <Route 
                    path='/search/:id'
                    element={<VideoDetails />}
                />
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
