export const initCarousels = () => {
  const carousels = document.querySelectorAll('.image-carousel');
  
  carousels.forEach(carousel => {
    if (carousel.carouselInterval) {
      clearInterval(carousel.carouselInterval);
    }
    
    const images = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentIndex = 0;
    
    const showImage = (index) => {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    };
    
    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    };
    
    const prevImage = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    };
    
    const startAutoPlay = () => {
      if (carousel.carouselInterval) {
        clearInterval(carousel.carouselInterval);
      }
      carousel.carouselInterval = setInterval(nextImage, 5000);
    };
    
    if (nextBtn && !nextBtn.hasCarouselListener) {
      nextBtn.hasCarouselListener = true;
      nextBtn.addEventListener('click', () => {
        nextImage();
        startAutoPlay();
      });
    }
    
    if (prevBtn && !prevBtn.hasCarouselListener) {
      prevBtn.hasCarouselListener = true;
      prevBtn.addEventListener('click', () => {
        prevImage();
        startAutoPlay();
      });
    }
    
    showImage(0);
    startAutoPlay();
  });
};