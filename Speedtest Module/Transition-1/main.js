window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = true;

    class Main {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.image = [];
            this.xPosition = 0;
            this.yPosition = 0;
            this.maxXPosition = 4;
            this.maxYPosition = 2;
            this.fading = false;
            this.imageIndex = 0;
        }

        update(deltaTime) {
            while (this.xPosition <= this.maxXPosition || this.yPosition <= this.maxYPosition) {
                if (this.xPosition <= this.maxXPosition) {
                    this.image.push(new Image(this, this.xPosition, this.yPosition));
                    this.xPosition++;
                } else {
                    this.xPosition = 0;
                    this.yPosition++;
                }
            }
            if (!this.fading) {
                this.imageIndex = Math.floor(Math.random() * this.image.length);
                this.fading = true;
            }

            if (this.fading) {
                this.image[this.imageIndex].update(deltaTime);
            }

            this.image.forEach((image, index) => {
                if (this.image[index].markedForDeletion) this.image.splice(index, 1);
            })
        }
        draw(ctx) {
            console.log(this.image.length);
            this.image.forEach((image, index) => {
                image.draw(ctx);
            })
        }
    }

    class Image {
        constructor(main, xPosition, yPosition) {
            this.main = main;
            this.image = document.getElementById('kagerou');
            this.opacity = 1;
            this.xPosition = xPosition;
            this.yPosition = yPosition;
            this.fps = 20;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
            this.markedForDeletion = false;
        }

        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.opacity > 0) this.opacity = (this.opacity - 0.1).toFixed(1);
                else {
                    this.markedForDeletion = true;
                    this.main.fading = false;
                };
            } else {
                this.frameTimer += deltaTime;
            }
        }
        draw(ctx) {
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this.image, this.xPosition * this.image.naturalWidth / 5, this.yPosition * this.image.naturalHeight / 3, this.image.width / 5, this.image.height / 3, this.xPosition * this.main.width / 5, this.yPosition * this.main.height / 3, this.main.width / 5, this.main.height / 3);
        }
    }

    const main = new Main(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        main.update(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        main.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
})