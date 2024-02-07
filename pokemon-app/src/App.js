import { useEffect, useState } from "react";
import "./App.css";

import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // ローディング用
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);

      setNextURL(res.next);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // Promise.all(配列): 全ての配列の処理の完了を待つ
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  const handlePrevPage = () => {};
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);

    await loadPokemon(data.results);
    setNextURL(data.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中…</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
