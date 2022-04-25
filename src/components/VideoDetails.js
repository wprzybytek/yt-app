import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { fetchVideo } from "../apis/youtube";

const VideoDetails = () => {
  const params = useParams();
  const [video, setVideo] = useState();
  useEffect(() => {
    const getVideo = async () => {
      const videoFromApi = await fetchVideo(params.id);
      setVideo(videoFromApi.items[0]);
    };

    getVideo();
  }, [params.id]);

  if (video) {
    return (
      <div className="card">
        <div className="video-player">
          <iframe
            className="video"
            title="Youtube player"
            sandbox="allow-same-origin allow-forms allow-scripts allow-presentation"
            src={`https://youtube.com/embed/${params.id}?autoplay=0`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="card-body">
          <h1 className="card-title">{video.snippet.title}</h1>
          <p className="card-subtitle mb-2 text-muted">
            {video.snippet.channelTitle} -{" "}
            {video.snippet.publishedAt.slice(0, 10)}
          </p>
          <h5 className="card-text">
            <AiOutlineEye /> {video.statistics.viewCount} <AiOutlineLike />{" "}
            {video.statistics.likeCount}
          </h5>
          <p className="card-text">{video.snippet.description}</p>
          <p className="text-muted" style={{ display: "inline" }}>
            tags:{" "}
          </p>
          {video.snippet.tags &&
            video.snippet.tags.map((tag) => (
              <p
                className="text-muted"
                style={{ display: "inline" }}
              >{`${tag}, `}</p>
            ))}
        </div>
      </div>
    );
  }
};

export default VideoDetails;
