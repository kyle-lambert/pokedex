import React from "react";
import axios from "axios";
import "./App.scss";
import { BASE_URL } from "./utils/constants";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Error from "./components/Error/Error";

import { getPokemonByUrl, getPokemonsPage } from "./api/pokemon";
import { buildPokemonJSON } from "./utils/helpers";

function App(props) {
  const [pokemon, setPokemon] = React.useState([]);
  const [nextPageUrl, setNextPageUrl] = React.useState(null);
  const [previousPageUrl, setPreviousPageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const sourceRef = React.useRef(null);

  const fetchPokemon = async (url) => {
    setLoading(true);

    try {
      const res = await getPokemonsPage(url);
      const data = res.data;

      if (!data) return;

      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);

      if (data?.results && Array.isArray(data.results)) {
        const pokemonPromises = data.results.map((p) => {
          return getPokemonByUrl(p.url);
        });

        const res = await Promise.all(pokemonPromises);
        const pokemon = res.map((p) => buildPokemonJSON(p.data));

        console.log(res[0].data);

        // setSelected(pokemon[0]);
        setPokemon(pokemon);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);

      axios.isCancel((err) => {
        console.log("Axios request cancelled.");
        setError(false);
      });
    }
  };

  React.useEffect(() => {
    sourceRef.current = axios.CancelToken.source();
    fetchPokemon(BASE_URL, sourceRef.current.token);

    return () => {
      if (sourceRef.current !== null) {
        sourceRef.current.cancel();
      }
    };
  }, []);

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setPokemon([]);
      sourceRef.current = axios.CancelToken.source();
      fetchPokemon(previousPageUrl, sourceRef.current.token);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      setPokemon([]);
      sourceRef.current = axios.CancelToken.source();
      fetchPokemon(nextPageUrl, sourceRef.current.token);
    }
  };

  const handlePokemonSelect = (pokemon) => {
    setSelected(pokemon);
  };

  const renderBranchJSX = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <Error />;
    return (
      <ul className="App__pokemon">
        {pokemon.map((p) => {
          return (
            <Card
              key={p.id}
              pokemon={p}
              isSelected={selected && selected.id === p.id}
              handlePokemonSelect={handlePokemonSelect}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <div className="App">
      <main className="App__main">
        <Sidebar pokemon={selected} />
        <div className="App__content">
          <Header />
          <Pagination
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
          {renderBranchJSX()}
        </div>
      </main>
    </div>
  );
}

export default App;
