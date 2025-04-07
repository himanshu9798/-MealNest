import React, { useState } from "react";
import MatrixBackground from "./MatrixBackground";
import Loader from "../Api/loader/Loader";

function Meals() {
  const [data, setData] = useState([]); // Store meal data
  const [query, setQuery] = useState("");
  const [isloading, setIsloading] = useState(false);

  const fetchMeals = () => {
    setIsloading(true);
    fetch(
      `https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=${query}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("API Response:", res);
        setIsloading(false);
        setData(res.data.data || []);
      })
      .catch((err) => {
        alert("Error fetching meals: " + err);
        setIsloading(false); // Stop loading when there is an error
      });
  };

  return (
    <div style={styles.container}>
      <Loader isLoading={isloading} />

      <h1 style={styles.title}>🍽️ MealNest</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={query}
          style={styles.input}
          placeholder="Search meals..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button style={styles.button} onClick={fetchMeals}>
          Find
        </button>
      </div>

      {/* Display Meals */}
      <div style={styles.mealsContainer}>
        {data.length > 0 ? (
          data.map((meal) => (
            <div key={meal.idMeal} style={styles.card}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={styles.image}
              />
              <h3 style={styles.mealTitle}>{meal.strMeal}</h3>
              <p style={styles.description}>
                {meal.strInstructions.substring(0, 100)}...
              </p>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                🎥 Watch on YouTube
              </a>
            </div>
          ))
        ) : (
          <p style={styles.noMeals}>
            No meals found. Try searching for "rice" or "cake"...........
          </p>
        )}
      </div>
    </div>
  );
}

// 🔹 Modern UI Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5", // Light gray background
    minHeight: "100vh",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    width: "250px",
    padding: "12px",
    borderRadius: "25px",
    border: "2px solid #ff6600",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#ff6600",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "10px",
    transition: "0.3s",
  },
  mealsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "15px",
    margin: "15px",
    width: "280px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  mealTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    color: "#ff6600",
    fontWeight: "bold",
  },
  noMeals: {
    fontSize: "18px",
    color: "#777",
    marginTop: "20px",
  },
};

export default Meals;

