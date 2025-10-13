

async function main() {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        console.log(dirEntry)
        getFile(dirEntry);
    });
}

function getFile(dirEntry) {
    dirEntry.getFile("score.txt", {}, function(fileEntry) {
        readFile(fileEntry);
    });

}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            const contentElement = document.getElementById("leaderboard-content");

            contentElement.innerHTML = this.result.split("\n")
                .map(score => parseInt(score))
                .filter((score) => !isNaN(score))
                .sort((a, b) => a - b)
                .slice(0, 3)
                .map((score) => {
                    return `<p>${score}/10</p>`
            }).join('');
        };

        reader.readAsText(file);

    });
}

document.addEventListener('deviceready', main, false);