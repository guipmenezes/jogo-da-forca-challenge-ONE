const frutas = ["abacaxi", "abacate", "banana", "caju", "goiaba", "jabuticaba", "kiwi", "laranja", "limao", "melancia", "pera", "uva"];
const frutaAdicionada = JSON.parse(localStorage.getItem("frutas")) || []
const inputFruta = document.querySelector(".area-texto");
const todasFrutas = frutas.concat(frutaAdicionada);
const palavraSecreta = todasFrutas[Math.floor(Math.random() * todasFrutas.length)];

let chance = 6;
let acerto = 0;
let forca = 0;
let posicao;

function adicionaFruta() {
    if(inputFruta.value.length != 0) {
        frutaAdicionada.push(inputFruta.value);
        localStorage.setItem("frutas", JSON.stringify(frutaAdicionada));
        frutas.push(frutaAdicionada.value);
        window.location.assign("gamepage.html");
    }
}

for (posicao = 0; posicao < palavraSecreta.length; posicao++) {
    let span = document.createElement("span");
    span.setAttribute("id", posicao);

    let div = document.getElementById("palavra-jogo");
    div.appendChild(span);
}
 let letraAlfabeto = "abcdefghijklmnopqrstuvwxyz";
 let letras = letraAlfabeto.split("");

 for (posicao = 0; posicao < letras.length; posicao++) {
     let btn = document.createElement("button");
     let letra = document.createTextNode(letras[posicao]);

     btn.appendChild(letra);
     btn.setAttribute("onclick", 'escolheLetra(\''+letras[posicao]+'\')');
     btn.setAttribute("id", letras[posicao]);

     let div = document.getElementById("letras");
     div.appendChild(btn);
 }

function escolheLetra(letra) {

    let acertou = false;

    for (posicao = 0; posicao < palavraSecreta.length; posicao++) {
        if(letra == palavraSecreta[posicao]) {
            let span = document.getElementById(posicao);
            let letraEscolhida = document.createTextNode(letra);

            span.appendChild(letraEscolhida);

            let btn = document.getElementById(letra);
            btn.style.background = 'green';
            btn.setAttribute("class", "correto");
            btn.removeAttribute("onclick");

            acerto++;
            acertou = true;
        }
    }

    if (acertou == false) {
        forca++;

        document.getElementById("forca").src = "forcaimg/forca-"+forca+".svg";

        var btn = document.getElementById(letra);
        btn.style.background = 'red';
        btn.setAttribute("class", "errado");
        btn.removeAttribute("onclick");

        chance--;
    }

    if (chance == 0) {
        let mensagem = document.createElement("p");
        let t1 = document.createTextNode("Fim de jogo, voce perdeu!");
        mensagem.appendChild(t1);

        let btn = document.createElement("button");
        let t2 = document.createTextNode("jogar novamente!");

        btn.appendChild(t2);
        btn.setAttribute("class", "novo-btn");
        btn.setAttribute("onclick", "window.location.reload()");

        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(btn);
    }

    if (acerto == palavraSecreta.length) {
        let mensagem = document.createElement("p");
        let t1 = document.createTextNode("Parabens, voce conseguiu!!");
        mensagem.appendChild(t1);

        let btn = document.createElement("button");
        let t2 = document.createTextNode("jogar novamente!");

        btn.appendChild(t2);
        btn.setAttribute("class", "novo-btn");
        btn.setAttribute("onclick", "window.location.reload()");

        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(btn);
    }
}