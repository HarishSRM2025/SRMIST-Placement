    const activeImage = document.getElementById('activeImage');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbContainer=document.getElementById('thumbContainer');

    let currentIndex = 0;

    function updateCarousel(index) {
        thumbs.forEach(t => t.classList.remove('active'));
        thumbs[index].classList.add('active');

        activeImage.style.opacity = '0';
        setTimeout(() => {
            activeImage.src = thumbs[index].src.replace('/300/200', '/1200/500');
            activeImage.style.opacity = '1';
        }, 200);

        currentIndex = index;
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateCarousel(index));
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
        updateCarousel(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbs.length;
        updateCarousel(currentIndex);
    });

    /* Drag Scroll for Thumbnails */
    const slider = document.getElementById('thumbContainer');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);

    slider.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });

    /* Touch support */
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].pageX;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', e => {
        const x = e.touches[0].pageX;
        slider.scrollLeft = scrollLeft - (x - startX);
    });


    