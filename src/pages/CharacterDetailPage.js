import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_BY_ID } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { loading, error: queryError, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      // Simpan karakter ke localStorage
      const allCharacters = JSON.parse(localStorage.getItem("characters")) || {};
      allCharacters[data.character.id] = data.character;
      localStorage.setItem("characters", JSON.stringify(allCharacters));
    }
  }, [data]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAssignLocation = () => {
    if (location && data?.character) {
      const existingLocations = JSON.parse(localStorage.getItem("locations")) || {};

      // Cek apakah karakter sudah ada di lokasi lain
      const currentLocation = Object.keys(existingLocations).find((loc) =>
        existingLocations[loc].includes(data.character.id)
      );

      if (currentLocation) {
        setError(`Character is already assigned to ${currentLocation}`);
        setSuccess(""); // Clear success message
        return;
      }

      if (!existingLocations[location]) {
        existingLocations[location] = [];
      }

      // Tambahkan karakter ke lokasi
      existingLocations[location].push(data.character.id);
      localStorage.setItem("locations", JSON.stringify(existingLocations));

      setLocation("");
      setError(""); // Clear error message
      setSuccess("Character successfully assigned to the location!");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (queryError) return <div className="text-center text-danger">Error: {queryError.message}</div>;

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card" style={{ width: '100%', maxWidth: '800px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={data.character.image}
              alt={data.character.name}
              className="card-img"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{data.character.name}</h1>
              <p className="card-text"><strong>Status:</strong> {data.character.status}</p>
              <p className="card-text"><strong>Species:</strong> {data.character.species}</p>
              <p className="card-text"><strong>Gender:</strong> {data.character.gender}</p>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter location"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleAssignLocation}
                >
                  Assign Location
                </button>
                {/* Add margin for the alerts */}
                {success && (
                  <div className="alert alert-success mt-3" role="alert">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
