import axios from "axios";

export const getPokemonsPage = (url, token) => {
  const config = {
    method: "GET",
    url: url,
    cancelToken: token,
  };
  return axios(config);
};

export const getPokemonByUrl = (url, token) => {
  const config = {
    method: "GET",
    url: url,
    cancelToken: token,
  };
  return axios(config);
};
