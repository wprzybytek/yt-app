import VideoCard from "./VideoCard.js";

const Videos = ({ videos, changePage, currentPage }) => {
  const nextPage = () => {
    changePage(true);
  };

  const prevPage = () => {
    changePage(false);
  };

  return (
    <div className="row justify-content-center offset-sm-2 col-sm-8">
      {videos.map((video) => (
        <VideoCard key={video.id.videoId} video={video} />
      ))}
      {videos.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center mt-3">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <p className="page-link" onClick={prevPage}>
                Previous
              </p>
            </li>
            <li className="page-item active">
              <p className="page-link">{currentPage}</p>
            </li>
            <li className="page-item">
              <p className="page-link" onClick={nextPage}>
                Next
              </p>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Videos;
