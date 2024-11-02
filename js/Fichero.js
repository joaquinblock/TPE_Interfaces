import { Ficha } from "../js/Ficha.js";


export class Fichero{
    constructor(fichasPorJugador, radioFicha, ctx, posFichaCounter, posFichaTerror){
        this.fichasPorJugador = fichasPorJugador;
        this.radioFicha = radioFicha;
        this.ctx = ctx;
        this.fichasCounter = [];
        this.fichasTerror = [];
        this.fichas = [];
        this.posFichaCounter = posFichaCounter;
        this.posFichaTerror = posFichaTerror;
    }

    llenarFichero(){
        for(let i=0; i<this.fichasPorJugador; i++){
            this.fichasTerror.push(new Ficha("red", "../img/terror.svg", this.posFichaTerror.x, this.posFichaTerror.y + i*10, this.radioFicha, this.ctx));
            this.fichasCounter.push(new Ficha("blue", "../img/counter.svg", this.posFichaCounter.x, this.posFichaCounter.y + i*10, this.radioFicha, this.ctx));
    
            this.fichas.push(this.fichasTerror[i]);
            this.fichas.push(this.fichasCounter[i]);
        }
    }

    dibujarFichas() {
        for (let i=0; i<this.fichasPorJugador; i++) {
            this.fichasCounter[i].dibujarFichaCircular();
            this.fichasTerror[i].dibujarFichaCircular();
        }
    }

    vaciarFichero(){
        this.fichasCounter = [];
        this.fichasTerror = [];
        this.fichas = [];
    }

}