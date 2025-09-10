const fs = require('fs');

let pokemonIdx = 0;
let score = 0;
const pokemonToGuess = [];

function getRandomNumber() {
    return Math.floor(Math.random() * (1025 - 1 + 1)) + 1;
}

async function getData() {
    const url = "https://tyradex.vercel.app/api/v1/pokemon";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

async function main() {
    const pokemons = await getData();

    for (let i = 0; i < 10; i++) {
        const pokemon = pokemons[getRandomNumber()]
        pokemonToGuess.push(pokemon)
    }

    displayPokemon();
}

function guessPokemon() {
    const pokemon = pokemonToGuess[pokemonIdx];

    const guess = document.getElementById('guess-input').value;

    if (pokemon.name.fr == guess) {
        score += 1;
    }

    pokemonIdx += 1;

    if (pokemonIdx > pokemonToGuess.length - 1) {
        endGame();
    } else {
        displayPokemon();
    }
}

function displayPokemon() {
    const imageElement = document.getElementById('pokemon-image');

    imageElement.src = pokemonToGuess[pokemonIdx].sprites.regular;

    const textElement = document.getElementById('pokemon-name');

    textElement.textContent = pokemonToGuess[pokemonIdx].name.fr;
}

function endGame() {
    const quizzContent = document.getElementById('quizz-content');
    quizzContent.setAttribute("hidden", "true");

    const quizzResult = document.getElementById('quizz-result');
    quizzResult.removeAttribute("hidden");


    const scoreElement = document.getElementById('score');

    scoreElement.innerHTML = score;
}

void main();



