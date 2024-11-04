import { Ficha } from "../js/Ficha.js";


export class Fichero{
    constructor(fichasPorJugador, radioFicha, ctx, posFichaCounter, posFichaTerror, imagenCt, imagenTerror){
        this.fichasPorJugador = fichasPorJugador;
        this.radioFicha = radioFicha;
        this.ctx = ctx;
        this.fichasCounter = [];
        this.fichasTerror = [];
        this.fichas = [];
        this.posFichaCounter = posFichaCounter;
        this.posFichaTerror = posFichaTerror;
        this.imagenCt = imagenCt;
        this.imagenTerror = imagenTerror;
    }

    llenarFichero(){
        for(let i=0; i<this.fichasPorJugador; i++){
            this.fichasTerror.push(new Ficha("red", this.imagenTerror.getAttribute('src'), this.posFichaTerror.x, this.posFichaTerror.y + i*10, this.radioFicha, this.ctx));
            this.fichasCounter.push(new Ficha("blue", this.imagenCt.getAttribute('src'), this.posFichaCounter.x, this.posFichaCounter.y + i*10, this.radioFicha, this.ctx));
    
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