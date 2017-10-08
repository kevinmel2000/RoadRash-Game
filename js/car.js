function Car() {
    this.width = 100;
    this.height = 100;
    this.x = 230 + random(TRACK_SIZE);
    this.y = 0;
    switch (parseInt(random(3))) {
    case 0:
        this.carImage = car_type1;
        break;
    case 1:
        this.carImage = car_type2;
        break;
    case 2:
        this.carImage = car_type3;
        break;
    }
    this.printCar = function () {
        image(this.carImage, this.x, this.y, this.hidth, this.height);
        this.y += SPEED + parseInt(score) * 0.01;
    }
    this.outOfFrame = function () {
        return (this.y + this.height / 2.5 >= height);
    }
}