import React, { useState, useEffect } from 'react'
import { GoHeart, GoArrowRight, GoTrashcan } from "react-icons/go";
import "./styles.css";

const App = () => {
  const [currentCat, setCurrentCat] = useState(null);
  const [favoriteCats, setFavoriteCats] = useState([]);

  const favoriteCat = cat => {
    setFavoriteCats(favoriteCats.concat(cat))
  };

  const removeFavorite = catToRemove => {
    setFavoriteCats(favoriteCats.filter(cat => cat !== catToRemove))
  };

  const catInFavorites = cat => favoriteCats.includes(cat);

  const getCat = () => {
    const url = 'https://catis.life/cat';
    setCurrentCat(null);
    fetch(url)
      .then(rsp => rsp.json())
      .then(data => setCurrentCat(data.cat))
  };

  useEffect(() => {
    getCat()
  }, []);

  return (
    <main>
      <section className="cat-wrapper">
        <h1>Choose your favorite cats</h1>
        <section className="cat-container">
          <figure>
            <img
              className="cat-image"
              src={currentCat}
              alt="An awesome cat"
            />
          </figure>
          <ul className="cat-actions">
            <li>
              <button
                onClick={() => favoriteCat(currentCat)}
                disabled={catInFavorites(currentCat)}
                className="heart-icon">
                <GoHeart size="30" color="#f44336" />
              </button>
            </li>
            <li>
              <button onClick={getCat}>
                <GoArrowRight size="30" />
              </button>
            </li>
          </ul>
        </section>
        <ul className="favorite-cats">
          {favoriteCats.map((cat, index) => (
            <li key={index}>
              <img className="favorite-cat" src={cat} alt="favorited cat"/>
              <button onClick={() => removeFavorite(cat)}>
                <GoTrashcan size="20"/>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;
