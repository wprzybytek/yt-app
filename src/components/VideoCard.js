import { useNavigate } from "react-router-dom"

const VideoCard = ({ video }) => {
    let navigate = useNavigate()
    const onClick = () => {
        navigate(`${video.id.videoId}`)
    }

    return (
        <div className="card mt-2 p-2" onClick={onClick}>
            <div className="row no-gutters">
                <div className="col-sm-3">
                    <img src={video.snippet.thumbnails.default.url} className="card-img-top" alt="..." />
                </div>
                <div className="col-sm-5">
                    <div className="card-body">
                        <h5 className="card-title">{video.snippet.title}</h5>
                        <p className="card-subtitle mb-2 text-muted">{video.snippet.channelTitle} - {video.snippet.publishedAt.slice(0, 10)}</p>
                        <p className="card-text">{video.snippet.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard