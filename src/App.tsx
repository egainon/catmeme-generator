import "./App.css";
import { useEffect, useState } from "react";
import type { Cat } from "./types/cat";
import { funnyLegends } from "./data/Legends";

function App() {
  const API_URL = "https://api.thecatapi.com/v1/images/search";
  const API_KEY = import.meta.env.VITE_CAT_API_KEY;
  const [catImage, setCatImage] = useState<Cat | null>(null);
  const [legend, setLegend] = useState<string>("");

  const fetchRandomCat = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await res.json();
      setCatImage(data[0]);
      const randomLegend =
        funnyLegends[Math.floor(Math.random() * funnyLegends.length)];
      setLegend(randomLegend);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-300 to-purple-400 p-4 sm:p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
        Cat Generator
      </h1>
      {catImage ? (
        <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto flex flex-col items-center">
          <img
            src={catImage.url}
            alt="Random cat"
            className="w-full mb-3 rounded-lg max-h-[50vh] sm:max-h-[70vh] object-contain"
          />
          <p className="text-white text-base sm:text-xl font-semibold mb-4 text-center px-2">
            {legend}
          </p>
          <button
            onClick={fetchRandomCat}
            className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm sm:text-base"
          >
            New Cat 🐈‍⬛
          </button>
        </div>
      ) : (
        <p className="text-white text-center">Chargement du chat...</p>
      )}
    </div>
  );
}

export default App;
