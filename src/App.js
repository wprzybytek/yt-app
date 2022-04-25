import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Videos from "./components/Videos";
import Home from "./components/Home";
import VideoDetails from "./components/VideoDetails";
import { fetchVideos, fetchPage } from "./apis/youtube";

function App() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setText] = useState("");
  const [prevPageToken, setPrev] = useState(0);
  const [nextPageToken, setNext] = useState(0);

  const onClick = async (text) => {
    setText(text);
    const data = await fetchVideos(text);
    setVideos(data.items);
    setNext(data.nextPageToken);
    setPrev(data.prevPageToken);
    setCurrentPage(1);
  };

  const changePage = async (next) => {
    let pageToken;
    if (next) {
      setCurrentPage(currentPage + 1);
      pageToken = nextPageToken;
    } else {
      setCurrentPage(currentPage - 1);
      pageToken = prevPageToken;
    }
    const data = await fetchPage(pageToken, searchText);
    setVideos(data.items);
    setNext(data.nextPageToken);
    setPrev(data.prevPageToken);
  };

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <NavBar onClick={onClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <Videos
                videos={videos}
                changePage={changePage}
                currentPage={currentPage}
              />
            }
          />
          <Route path="/search/:id" element={<VideoDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
