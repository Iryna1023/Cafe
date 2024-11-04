const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

if (window.innerWidth <= 860) {
    swiper.params.slidesPerView = 1;
    swiper.update();
}

window.addEventListener('resize', function () {
    if (window.innerWidth <= 860) {
        swiper.params.slidesPerView = 1;
    } else {
        swiper.params.slidesPerView = 2;
    }
    swiper.update();
});




