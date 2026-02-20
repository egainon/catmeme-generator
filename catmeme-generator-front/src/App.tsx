import { useEffect, useState } from 'react';
import type { Cat } from './types/cat';
import {funnyLegends} from './data/Legends';
import { API_KEY } from './key/key';

function App() {
  const API_URL = 'https://api.thecatapi.com/v1/images/search';
  const [catImage, setCatImage] = useState<Cat | null>(null); //useState<Cat | null>(null) crée une variable d'état catImage qui peut contenir soit un objet de type Cat, soit null (valeur initiale), et setCatImage est la fonction pour modifier cette valeur.


  const [legend, setLegend] = useState<string>("");

    const fetchRandomCat = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            'x-api-key': API_KEY // la clé API
          }
        });
        const data = await res.json();
        console.log(data[0]);
        setCatImage(data[0]); // Stocker dans le state
        const randomLegend = funnyLegends[Math.floor(Math.random() * funnyLegends.length)];
        setLegend(randomLegend);
      } catch (error) {
        console.error(error);
      }
    }
    ;

  useEffect(() => {
  fetchRandomCat(); // Appel simplifié
  }, []);

  return (
    <>
  <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 p-8 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-white text-center mb-8">
      Cat Generator
    </h1>
    
    {catImage ? (
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <img src={catImage?.url} className="mb-2 rounded-lg max-w-xl max-h-[70vh] object-contain"></img>
        {/* "accède à l'url de catImage seulement si catImage existe, sinon retourne undefined" (le ? est l'opérateur de optional chaining). */}
        <p className="text-white text-xl font-semibold mb-4 text-center">{legend}</p>
        <button 
          onClick={fetchRandomCat}
          className="bg-pink-500 text-white px-6 py-2 rounded-full"
        >
        New Cat 🐈‍⬛
        </button>
      </div>
    ) : (
      <p className="text-white text-center">Chargement du chat...</p>
    )}
  </div>
    </>
  )
}

export default App
