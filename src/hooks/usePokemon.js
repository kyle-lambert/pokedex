import React from "react";
import axios from "axios";
import usePagination from "./usePagination";
import { BASE_URL } from "../utils/constants";

import { getPokemonByUrl } from "../api/pokemon";
import { buildPokemonJSON } from "../utils/helpers";

const usePokemon = () => {
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const {
    nextPageUrl,
    previousPageUrl,
    setNextPageUrl,
    setPreviousPageUrl,
    resetState,
  } = usePagination();
  const sourceRef = React.useRef(null);

  const resetPokemonState = () => {
    setPokemon([]);
    setLoading(false);
    setError("");
    setSelected(null);
    resetState();
  };

  const fetchPokemon = React.useCallback(
    (url) => {
      setError("");
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
                setError("There was problem fetching all Pokemon infomation");
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          setError("Sorry we had a problem processing your request.");

          axios.isCancel((err) => {
            console.log("Axios request cancelled.");
            setError("");
          });
        });
    },
    [setPreviousPageUrl, setNextPageUrl]
  );

  const findPokemon = (name) => {
    resetPokemonState();

    const url = `${BASE_URL}/${name}`;
    setLoading(true);

    getPokemonByUrl(url)
      .then((res) => {
        const data = res.data;

        if (!data) {
          throw new Error("Pokemon does not exist.");
        }

        const pokemon = buildPokemonJSON(data);

        setSelected(pokemon);
        setPokemon([pokemon]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Sorry a Pokemon by that name does not exist.");
        setLoading(false);
      });
  };

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
    findPokemon,
    fetchPokemon,
  };
};

export default usePokemon;
