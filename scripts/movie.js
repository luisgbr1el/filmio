const tips = [ 'tarantino', 'ação', 'globo', 'romance', 'lançado em 05/05/2022' ];
const movies = [ "The Tender Bar", "Pânico 5", "Hotel Transilvânia: Transformonstrão", "The Tragedy of Macbeth", "As Agentes 355", "O Beco do Pesadelo", "Spencer", "Moonfall Ameaça Lunar", "Morte no Nilo", "Case Comigo", "Sempre em Frente", "Uncharted", "Licorice Pizza", "O Massacre da Serra Elétrica: O Retorno de Leatherface", "Mães Paralelas", "Batman", "Belfast", "Red Crescer é uma Fera", "O Projeto Adam", "Os Caras Malvados", "Ambulância: Um Dia de Crime", "Esquema de Risco: Operação Fortune", "Everything Everywhere All At Once", "Morbius", "Cyrano", "Sonic 2", "Animais Fantásticos: Os Segredos de Dumbledore", "Medida Provisória", "Cidade Perdida", "Downton Abbey 2: Uma Nova Era", "Doutor Estranho no Multiverso da Loucura", "O Homem do Norte", "O Peso do Talento", "Top Gun Maverick ", "Jurassic World: Domínio", "Lightyear", "O Telefone Preto", "Tudo em Todo o Lugar ao Mesmo Tempo", "Minions 2: A Origem de Gru", "Thor: Amor e Trovão", "Elvis", "Não! Não olhe!", "DC Liga dos Super Pets", "Trem-Bala", "Não Se Preocupe, Querida", "Halloween Ends", "Adão Negro", "Pantera Negra: Wakanda Forever", "Creed 3", "The Fabelmans", "Avatar: The Way of Water", "Shazam: Fúria dos Deuses", "Strange World ", "Babylon", "Aquaman e o Reino Perdido", "John Wick 4", "Homem-Aranha Através do Aranhaverso", "The Flash", "Missão: Impossível 7" ];
const gameNumber = 1;

document.getElementById("gameNumber").innerHTML = `<b>JOGO:</b> #${gameNumber}`;

let sortedMovie = '';

pageNumber = Math.floor(Math.random() * 500);

// Número inicial de tentativas
let guessTries = 5;
guessNumber = document.getElementById("guessTry");
guessNumber.innerHTML = "TENTATIVAS RESTANTES: " + guessTries;

(function() {
    if (!("Notification" in window)) {
        console.log("Este browser não suporta notificações de Desktop");
    }
    // Focar no input
    document.getElementById("guess").focus();
    tipsDiv = document.getElementById('tips');
    
    let tip = '';
    // Mostrar todas as dicas
    for (i = 0; i < tips.length; i++) {
        tip += `<p id="tip">${tips[i]}</p>`;
    }
    tipsDiv.innerHTML = tip;

    moviesDiv = document.getElementById("movies");
    let movie = '';

    // Listar todos os filmes disponíveis
    for (i = 0; i < movies.length; i++) {
        movie += `<option>${movies[i]}</option>`;
    }
    moviesDiv.innerHTML = movie;

    // Sortear filme aleatório do banco (TEMPORÁRIO)
    sortRandomMovie = Math.floor(Math.random() * movies.length);
    sortedMovie = movies[sortRandomMovie];

    console.log("Resposta: "+ sortedMovie);
    // if (Notification.permission !== 'denied') {
    //     Notification.requestPermission(function (permission) {
    //       // If the user accepts, let's create a notification
    //       if (permission === "granted") {
    //         var opcoes = {
    //             body: "RESPOSTA: " + sortedMovie,
    //             icon: "https://i.ibb.co/DW1pmjt/android-chrome-512x512.png"
    //         }
    //         var notification = new Notification("Filmio", opcoes);
    //       }
    //     });
    //   }
    
})();

const triesArr = [];

var detect = document.getElementById("guess");
// Um evento listener que espera apertar um botão
detect.addEventListener("keydown", function (e) {
    // Se o botão apertado for 'Enter'
    if (e.code === "Enter") { 
        guess();
    }
})

function triesCounter() {
    let tries = 0;
    tries++;
    return tries;
}

function alert(text, time) {
    let box = document.createElement('p');
    box.innerHTML = text;
    box.classList.add('alert');

    document.querySelector("#alerts").appendChild(box);


    setTimeout(() => {
        $('.alert').fadeOut(500);
        // document.querySelector("#alerts").removeChild(box);
    }, time);

}
function guess() {
    guessInput = document.getElementById("guess");
    //let tries = '';
    // Se o usuário já tiver mandado aquele filme
    if (triesArr.includes(guessInput.value)) {
        alert("Esse filme já foi!", 2000);
        guessInput.value = "";
    // Senão...
    } else {
        // Se o usuário acertar o filme
        if (guessInput.value == sortedMovie) {

            alert("Você acertou!", 2000);
            let box = document.createElement('p');
            box.innerHTML = guessInput.value;
            box.classList.add('correctTry', 'newTry');
    
            document.querySelector("#tries").appendChild(box);
    
            guessInput.value = "";
            document.getElementById("guess").style.display = "none";
            document.getElementById("send").style.display = "none";
            triesCounter()

            let correctAnswer = document.createElement('h3');
            correctAnswer.innerHTML = `Correto!
            <p style="font-size: 12pt; font-weight: normal;">Você acertou na <b>${5 - (guessTries - triesCounter())}ª</b> tentativa.</p>
            <button id="share" onclick="share();"><i class="fa-solid fa-share-nodes"></i> Compartilhar</button>`;
            correctAnswer.classList.add('correctAnswer');
            
            document.getElementById("screen").innerHTML = "";
            document.querySelector("#screen").appendChild(correctAnswer);
            
    
            triesArr.push(guessInput.value);
        // Senão...
        } else {
            // Se o filme não pertencer ao banco
            if (!movies.includes(guessInput.value)) {
                return;
            // Senão...
            } else {
                triesDiv = document.getElementById("tries");
                triesCounter()
    
                guessTries = guessTries - triesCounter();
                guessNumber.innerHTML = "TENTATIVAS RESTANTES: " + guessTries;
    
                let guess = '';
                
                let box = document.createElement('p');
                box.innerHTML = guessInput.value;
                box.classList.add('wrongTry', 'newTry');
    
                document.querySelector("#tries").appendChild(box);
                
                triesArr.push(guessInput.value);

                guessInput.value = "";

                // Se as tentativas acabarem
                if (guessTries <= 0) {
                    alert("Você perdeu!", 2000);
                    guessInput.value.innerHTML = "";
                    document.getElementById("guess").style.display = "none";
                    document.getElementById("send").style.display = "none";

                    let correctAnswer = document.createElement('h3');
                    correctAnswer.innerHTML = `Você perdeu!
                    <p style="font-size: 12pt; font-weight: normal;">A resposta era <b>${sortedMovie}</b>.</p>`;
                    correctAnswer.classList.add('correctAnswer');
                    
                    document.getElementById("screen").innerHTML = "";
                    document.querySelector("#screen").appendChild(correctAnswer);
                }
                
            }
        }
    }  
}

function share() {
    let shareText = `🎥 Joguei Filmio #${gameNumber} | ${(5 - (guessTries - triesCounter()))}/5\n\n`;
    const emojiArr = [];

    wrongTries = document.getElementsByClassName("wrongTry").length;
    for (i = 1; i <= wrongTries; i++) {
        emojiArr.push("⬛");
    }
    emojiArr.push("🟩");

    shareText += emojiArr.join("\n");
    shareText += "\n\n#filmio";

    let check = false;
    // Dectectar se o navegador usado é no celular, tablet ou desktop
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    
    // Se for celular ou tablet
    if (check == true) {
        alert("Compartilhando...", 2000);
        navigator.share({title: "Eu acertei!", text: shareText });
    }
    // Senão...
    else {
        navigator.clipboard.writeText(shareText).then(function(x) {
            alert("Copiado para a área de transferência!", 2000);
        });
    }
    
}

modal = document.getElementById("modal");
modal2 = document.getElementById("modal2");
close = document.getElementById("close");
close2 = document.getElementById("close2");

// Mostar o modal de ajuda
function help() {
    modal.style.display = "block";
}

// Mostrar o modal de créditos
function credits() {
    modal2.style.display = "block";
}

// Fechar o modal
close.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal se o usuário clicar fora da caixa dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modal2) {
        modal2.style.display = "none";
    }
  }

// Fechar o modal
close2.onclick = function() {
    modal2.style.display = "none";
}
