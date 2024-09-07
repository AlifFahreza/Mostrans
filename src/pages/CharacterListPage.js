import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_CHARACTERS } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CharacterListPage = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-danger">Error: {error.message}</div>
    );

  const characters = data.characters.results;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = characters.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-white shadow-sm mb-5">
        <a
          className="navbar-brand text-primary mx-4"
          style={{ fontSize: "1.15rem" }}
        >
          Character List
        </a>
        <ul className="navbar-nav ml-auto" style={{ marginRight: "0.5cm" }}>
          <li className="nav-item">
            <Link
              to="/locations"
              className="btn btn-primary"
            >
              View Locations
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="row">
          {currentCharacters.map((character) => (
            <div className="col-md-3 mb-4" key={character.id}>
              <div className="card" style={{ width: "100%", height: "100%" }}>
                <img
                  src={character.image}
                  alt={character.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "160px" }} // Menyesuaikan ukuran gambar
                />
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text text-muted">
                    Status: {character.status}
                  </p>
                  <Link
                    to={`/character/${character.id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <button
            className="btn btn-light text-primary border border-primary me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <ul className="pagination mb-0">
            {[...Array(totalPages).keys()].map((page) => (
              <li
                key={page}
                className={`page-item ${
                  currentPage === page + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-light text-primary border border-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterListPage;
