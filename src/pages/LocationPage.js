import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const LocationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || {};
    setLocations(storedLocations);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const charactersData = (locations[selectedLocation] || []).map(
        (id) => JSON.parse(localStorage.getItem("characters"))[id]
      );
      // Filter out undefined characters
      setCharacters(charactersData.filter(character => character !== undefined));
    } else {
      setCharacters([]);
    }
  }, [selectedLocation, locations]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary font-weight-bold mb-4" style={{ textTransform: "uppercase" }}>
        Character by Location
      </h1>
      <div className="d-flex justify-content-center mb-4">
        <div className="w-50">
          <select
            className="form-control form-control-sm"
            value={selectedLocation}
            onChange={handleLocationChange}
            style={{
              fontSize: "1rem", // Ukuran font yang konsisten
              padding: "0.75rem 1.25rem", // Padding
              borderRadius: "0.25rem",
            }}
          >
            <option value="">Select a location</option>
            {Object.keys(locations).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mx-auto" style={{ maxWidth: "50%" }}>
          <thead className="thead-light bg-primary text-white">
            <tr>
              <th className="text-center">No.</th>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Status</th>
              <th className="text-center">Species</th>
            </tr>
          </thead>
          <tbody>
            {characters.length > 0 ? (
              characters.map((character, index) => (
                <tr key={character.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img
                      src={character.image}
                      alt={character.name}
                      style={{ width: "100px", height: "auto" }} // Ukuran gambar
                    />
                  </td>
                  <td className="text-center">{character.name}</td>
                  <td className="text-center">{character.gender}</td>
                  <td className="text-center">{character.status}</td>
                  <td className="text-center">{character.species}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No characters found for this location
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationPage;
