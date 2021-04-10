import React from "react";
import "./App.scss";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Error from "./components/Error/Error";

import usePokemon from "./hooks/usePokemon";

function App(props) {
  const {
    pokemon,
    loading,
    error,
    selected,
    nextPageUrl,
    previousPageUrl,
    goToNextPage,
    goToPreviousPage,
    selectPokemon,
    findPokemon,
    fetchPokemon,
  } = usePokemon();

  const renderBranchJSX = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <Error message={error} />;
    return (
      <ul className="App__pokemon">
        {pokemon.map((p) => {
          return (
            <Card
              key={p.id}
              pokemon={p}
              isSelected={selected && selected.id === p.id}
              handlePokemonSelect={selectPokemon}
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
          <Header findPokemon={findPokemon} fetchPokemon={fetchPokemon} />
          <Pagination
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            handleNextPage={goToNextPage}
            handlePreviousPage={goToPreviousPage}
          />
          {renderBranchJSX()}
        </div>
      </main>
    </div>
  );
}

export default App;
