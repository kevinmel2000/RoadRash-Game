function Player(playerImage) {
    this.playerImage = playerImage;
    this.width = 100;
    this.height = 100;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height;
    this.UPDAT_FACTOR = 25;
    this.printPlayer = function () {
        image(this.playerImage, this.x, this.y, this.width, this.height);
    }
    this.top = function () {
        if (this.y > 10) {
            this.y += -this.UPDAT_FACTOR;
        }
    }
    this.bottom = function () {
        if (this.y < 450) {
            this.y += this.UPDAT_FACTOR;
        }
    }
    this.left = function () {
        if (this.x > 190) {
            this.x += -this.UPDAT_FACTOR;
        }
    }
    this.right = function () {
        if (this.x < 710) {
            this.x += this.UPDAT_FACTOR;
        }
    }
    this.collide = function (car) {
        isCollide = false;
        if ((this.y - this.height / 2 <= car.y + car.height / 2.5) && (this.y + this.height / 2 >= car.y - car.height / 2.5)) {
            if ((this.x - this.width / 4.5 <= car.x + car.width / 4) && (this.x + this.width / 4.5 >= car.x - car.width / 4)) {
                isCollide = true;
            }
        }
        return isCollide;
    }
}