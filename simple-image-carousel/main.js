const images = document.querySelectorAll('.slide-img');
let currentImageIndex = 0;

images[currentImageIndex].classList.add('active');

document.getElementById('nextBtn').addEventListener('click', function () {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
})