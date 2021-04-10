import React from "react";
import axios from "axios";
import usePagination from "./usePagination";
import { BASE_URL } from "../utils/constants";

import { getPokemonByUrl } from "../api/pokemon";
import { buildPokemonJSON } from "../utils/helpers";

const usePokemon = () => {
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const { nextPageUrl, previousPageUrl, setNextPageUrl, setPreviousPageUrl } = usePagination();
  const sourceRef = React.useRef(null);

  const fetchPokemon = React.useCallback(
    (url) => {
      setLoading(true);
      getPokemonByUrl(url)
        .then((res) => {
          const data = res.data;

          if (!data) {
            throw new Error("Incorrect response.");
          }

          setNextPageUrl(data.next);
          setPreviousPageUrl(data.previous);

          if (data?.results && Array.isArray(data.results)) {
            const pokemonPromises = data.results.map((p) => {
              return getPokemonByUrl(p.url);
            });

            Promise.all(pokemonPromises)
              .then((res) => {
                const pokemon = res.map((p) => buildPokemonJSON(p.data));
                setSelected(pokemon[0]);
                setPokemon(pokemon);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setError(true);
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(true);

          axios.isCancel((err) => {
            console.log("Axios request cancelled.");
            setError(false);
          });
        });
    },
    [setPreviousPageUrl, setNextPageUrl]
  );

  const goToNextPage = () => {
    if (nextPageUrl) {
      setPokemon([]);
      sourceRef.current = axios.CancelToken.source();
      fetchPokemon(nextPageUrl, sourceRef.current.token);
    }
  };

  const goToPreviousPage = () => {
    if (previousPageUrl) {
      setPokemon([]);
      sourceRef.current = axios.CancelToken.source();
      fetchPokemon(previousPageUrl, sourceRef.current.token);
    }
  };

  const selectPokemon = (pokemon) => {
    setSelected(pokemon);
  };

  React.useEffect(() => {
    sourceRef.current = axios.CancelToken.source();
    fetchPokemon(BASE_URL, sourceRef.current.token);

    return () => {
      if (sourceRef.current !== null) {
        sourceRef.current.cancel();
      }
    };
  }, [fetchPokemon]);

  return {
    pokemon,
    loading,
    error,
    selected,
    nextPageUrl,
    previousPageUrl,
    goToNextPage,
    goToPreviousPage,
    selectPokemon,
  };
};

export default usePokemon;
