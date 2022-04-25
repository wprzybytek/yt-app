import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ onClick }) => {
  const [text, setText] = useState("");
  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      onClick(text);
      navigate("/search");
    }
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Video Player
        </Link>
        <form className="d-flex" onSubmit={onSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            values={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
