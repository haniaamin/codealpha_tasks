document.addEventListener('DOMContentLoaded', function() {
    const imageFiles = [
        'nature.jpg',
        'city.jpg',
        'animal.jpg',
        'food.jpg',
        'people.jpg'
    ];

    // Create image objects with paths
    const images = imageFiles.map(file => ({
        src: `images/${file}`,
        alt: `Image ${file}`
    }));

    const mainImage = document.getElementById('main-image');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const thumbnailContainer = document.querySelector('.thumbnail-container');

    let currentIndex = 0;

    function initGallery() {
        totalImagesSpan.textContent = images.length;
        
        if (images.length > 0) {
            updateMainImage(currentIndex);
            
            images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image.src;
                thumbnail.alt = image.alt;
                thumbnail.classList.add('thumbnail');
                if (index === currentIndex) {
                    thumbnail.classList.add('active');
                }
                
                thumbnail.addEventListener('click', () => {
                    currentIndex = index;
                    updateMainImage(currentIndex);
                    updateThumbnails();
                });
                
                thumbnailContainer.appendChild(thumbnail);
            });

            if (images.length > 1) {
                nextBtn.disabled = false;
            }
        } else {
            mainImage.alt = "No images available";
            mainImage.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23ddd' width='400' height='400'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='20' dy='.35em' text-anchor='middle' x='200' y='200'%3ENo images found%3C/text%3E%3C/svg%3E";
        }
    }

    function updateMainImage(index) {
        mainImage.src = images[index].src;
        mainImage.alt = images[index].alt;
        currentImageSpan.textContent = index + 1;
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === images.length - 1;
    }

    function updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateMainImage(currentIndex);
            updateThumbnails();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateMainImage(currentIndex);
            updateThumbnails();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateMainImage(currentIndex);
            updateThumbnails();
        } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
            currentIndex++;
            updateMainImage(currentIndex);
            updateThumbnails();
        }
    });

    initGallery();
});