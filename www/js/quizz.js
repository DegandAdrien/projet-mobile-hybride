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

    if (pokemon.name.fr === guess) {
        score += 1;
    }

    pokemonIdx += 1;

    if (pokemonIdx > pokemonToGuess.length - 1) {
        endGame();
    } else {
        displayPokemon();
    }

    document.getElementById('guess-input').value = "";
}

function displayPokemon() {
    const imageElement = document.getElementById('pokemon-image');

    imageElement.src = pokemonToGuess[pokemonIdx].sprites.regular;

    console.log(pokemonToGuess[pokemonIdx].name.fr)
}

function endGame() {
    const quizzContent = document.getElementById('quizz-content');
    quizzContent.setAttribute("hidden", "true");

    const quizzResult = document.getElementById('quizz-result');
    quizzResult.removeAttribute("hidden");


    const scoreElement = document.getElementById('score');

    scoreElement.innerHTML = score;

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        console.log(dirEntry)
        var isAppend = true;
        createFile(dirEntry, "score.txt", isAppend, `${score}\n`);
    });
}

function createFile(dirEntry, fileName, isAppend, score) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

        writeFile(fileEntry, score, isAppend);

    });

}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
        };

        reader.readAsText(file);

    });
}

function writeFile(fileEntry, dataObj, isAppend, score) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file read...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file read: " + e.toString());
        };

        // If we are appending data to file, go to the end of the file.
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                console.log("file doesn't exist!");
            }
        }
        fileWriter.write(dataObj);
    });
}

document.addEventListener('deviceready', main, false);

