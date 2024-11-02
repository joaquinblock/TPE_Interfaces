
export class Ficha {
    constructor(color, imageUrl, x, y, radio, ctx) {
        this.color = color;
        this.image = new Image();
        this.image.src = imageUrl;
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.enTablero = false; //si la ficha ya está en el tablero
        this.ctx = ctx;
        this.imageLoaded = false; // Variable para indicar si la imagen está cargada

        // Configura la imagen y marca cuando esté lista
        this.image.onload = () => {
            this.imageLoaded = true;
            this.dibujarFichaCircular();
        };
    }

    dibujarFichaCircular() {
        if (!this.imageLoaded) return; // No dibujar si la imagen no está lista
            this.ctx.save(); // Guarda el estado del contexto

            // Crear un camino circular
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.clip(); // Establece el área de recorte a la forma del círculo
        
            // Dibuja la imagen ajustada al tamaño de la ficha
            this.ctx.drawImage(this.image, this.x-this.radio, this.y-this.radio, this.radio * 2, this.radio * 2);
            this.ctx.lineWidth = 3; // Ancho del contorno
            this.ctx.strokeStyle = "black"; // Color del contorno
            this.ctx.stroke(); // Dibujar el contorno
        
            this.ctx.restore(); // Restaura el contexto al estado guardado para evitar que el recorte afecte otros dibujos
    }
}