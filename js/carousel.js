
//carousel

//Array storage class
let carouselArr = [];

class Carousel {

    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }


    static Start(arr) {
        if (arr) {
            if (arr.length > 0) {
                Carousel._sequence = 0;
                Carousel._size = arr.length;
                Carousel.Next();
                Carousel._interval = setInterval(function () { Carousel.Next(); }, 5000);
            }
        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static Next() {
        let item = carouselArr[Carousel._sequence];


        let carouselDiv = document.getElementById("carousel");
        carouselDiv.style.backgroundImage = `url('img/${item.image}')`;
        carouselDiv.style.backgroundSize = "cover";
        carouselDiv.style.backgroundPosition = "center";
        carouselDiv.style.backgroundRepeat = "no-repeat";
        carouselDiv.style.cursor = item.url !== "#" ? "pointer" : "default";
        carouselDiv.onclick = function () { if (item.url !== "#") window.location.href = item.url; };


        let titleDiv = document.getElementById("carousel-title");
        titleDiv.innerHTML = `<a href="${item.url}">${item.title}</a>`;


        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
    }


    static Prev() {
        clearInterval(Carousel._interval);
        Carousel._sequence = (Carousel._sequence - 2 + Carousel._size) % Carousel._size;
        Carousel.Next();
        Carousel._interval = setInterval(function () { Carousel.Next(); }, 5000);
    }


    static GoNext() {
        clearInterval(Carousel._interval);
        Carousel.Next();
        Carousel._interval = setInterval(function () { Carousel.Next(); }, 5000);
    }
};
