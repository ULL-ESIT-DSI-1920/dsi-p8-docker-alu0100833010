import "regenerator-runtime/runtime";
import Avenger from "./Avenger.js";

// Creamos un array para los 16 vengadores.
var avengers = [];

const startAvengers = async () => {
    await fetch("http://localhost/api")
        .then(function(result) {
            return result.json();
        }).then(function(result) {
            const data = result;
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                const data_a = data[i];
                const avenger = new Avenger (data_a);
                pushAvengers(avenger);
                //console.log(avenger);
            }
        });
    await showAvengers();
};

function pushAvengers(avenger) {
    avengers.push(avenger);
}

const showAvengers = async () => {
    const avenger = document.getElementById("avenger");
    for(var i = 0; i < avengers.length; i++) {
        avenger.innerHTML +=    `<div class="card" style="background-image: linear-gradient(${avengers[i].color}, rgb(255, 255, 255))">
                                    <br><div class="avg">${avengers[i].character}</div>
                                    NAME: ${avengers[i].name} <br> LEVEL: ${avengers[i].level} <br>
                                    GENRE: ${avengers[i].genre} <br> SPECIE: ${avengers[i].specie} 
                                </div>`
    }
}

startAvengers();
