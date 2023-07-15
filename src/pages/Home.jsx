// Home.jsx
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    if (pokedex.length > 0) {
      setNotification(true);
    }
  }, [pokedex]);

  const getPokemons = async () => {
    try {
      let endpoints = [];
      for (let i = 1; i < 100; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
      console.log(endpoints);
      const responses = await axios.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );
      const updatedPokemons = responses.map((response) => response.data);
      setPokemons(updatedPokemons);
    } catch (error) {
      console.error(error);
    }
  };

  const addPokemonToPokedex = (pokemon) => {
    setPokedex([...pokedex, pokemon]);
    setNotification(true);
  };

  const removePokemonFromPokedex = (pokemon) => {
    const updatedPokedex = pokedex.filter((p) => p.name !== pokemon.name);
    setPokedex(updatedPokedex);
  };

  const pokemonFilter = async (name) => {
    try {
      if (name === "") {
        getPokemons();
      } else {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const filteredPokemons = [response.data];
        setPokemons(filteredPokemons);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar
        pokemonFilter={pokemonFilter}
        showNotification={notification}
        clearNotification={() => setNotification(false)}
      />
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                addPokemon={() => addPokemonToPokedex(pokemon)}
                weight={pokemon.weight}
                height={pokemon.height}
                types={pokemon.types.map((type) => type.type.name)}
                abilities={pokemon.abilities.map(
                  (ability) => ability.ability.name
                )}
                stats={pokemon.stats}
              />
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="h4"
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "5px",
            borderRadius: "50px 10px 50px 10px ",
          }}
        >
          Pokédex
        </Typography>
        <Grid container spacing={3}>
          {pokedex.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                removePokemon={() => removePokemonFromPokedex(pokemon)}
                weight={pokemon.weight}
                height={pokemon.height}
                types={pokemon.types.map((type) => type.type.name)}
                abilities={pokemon.abilities.map(
                  (ability) => ability.ability.name
                )}
                stats={pokemon.stats}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
