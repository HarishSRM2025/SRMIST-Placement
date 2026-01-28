const topCompanies = [
            { name: 'Akamai', class: 'recruitment-akamai', html: 'Akamai' },
            { name: 'ALSTOM', class: 'recruitment-alstom', html: 'ALST<span class="recruitment-o-letter">O</span>M' },
            { name: 'amadeus', class: 'recruitment-amadeus', html: 'amadeus' },
            { name: 'amazon', class: 'recruitment-amazon', html: 'amazon' },
            { name: 'ANAND', class: 'recruitment-anand', html: 'ANAND' },
            { name: 'AstraZeneca', class: 'recruitment-astrazeneca', html: 'AstraZeneca' },
            { name: 'Akamai', class: 'recruitment-akamai', html: 'Akamai' },
            { name: 'ALSTOM', class: 'recruitment-alstom', html: 'ALST<span class="recruitment-o-letter">O</span>M' },
            { name: 'amadeus', class: 'recruitment-amadeus', html: 'amadeus' },
        ];

        const bottomCompanies = [
            { name: 'wipro', class: 'recruitment-wipro', html: 'wipro' },
            { name: 'Western Digital', class: 'recruitment-western-digital', html: 'Western Digital' },
            { name: 'WELLS FARGO', class: 'recruitment-wells-fargo', html: 'WELLS FARGO' },
            { name: 'Wabtec', class: 'recruitment-wabtec', html: 'Wabtec' },
            { name: 'VOLVO', class: 'recruitment-volvo', html: 'VOLVO' },
            { name: 'Volante', class: 'recruitment-volante', html: 'Volante' },
            { name: 'wipro', class: 'recruitment-wipro', html: 'wipro' },
            { name: 'Western Digital', class: 'recruitment-western-digital', html: 'Western Digital' },
            { name: 'WELLS FARGO', class: 'recruitment-wells-fargo', html: 'WELLS FARGO' },
        ];

        // Swiper state
        const swiperState = {
            1: { currentIndex: 0, autoplayInterval: null, direction: 1 }, // left to right
            2: { currentIndex: 0, autoplayInterval: null, direction: -1 } // right to left
        };

        // Initialize swipers
        function initSwiper(swiperId, companies) {
            const wrapper = document.getElementById(`recruitment-wrapper-${swiperId}`);
            
            // Create slides
            companies.forEach(company => {
                const slide = document.createElement('div');
                slide.className = 'recruitment-swiper-slide';
                slide.innerHTML = `
                    <div class="recruitment-logo-card ${company.class}">
                        ${company.html}
                    </div>
                `;
                wrapper.appendChild(slide);
            });

            // Start autoplay
            startAutoplay(swiperId);
        }

        // Move to specific slide
        function moveToSlide(swiperId, index) {
            const wrapper = document.getElementById(`recruitment-wrapper-${swiperId}`);
            const slides = wrapper.querySelectorAll('.recruitment-swiper-slide');
            const slideWidth = slides[0].offsetWidth + 40; // width + margin
            
            // Update index
            swiperState[swiperId].currentIndex = index;
            
            // Apply transform
            wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        // Next slide
        function nextSlide(swiperId) {
            const wrapper = document.getElementById(`recruitment-wrapper-${swiperId}`);
            const slides = wrapper.querySelectorAll('.recruitment-swiper-slide');
            const maxIndex = slides.length - Math.floor(wrapper.parentElement.offsetWidth / (slides[0].offsetWidth + 40));
            
            let newIndex = swiperState[swiperId].currentIndex + 1;
            if (newIndex > maxIndex) {
                newIndex = 0;
            }
            
            moveToSlide(swiperId, newIndex);
            resetAutoplay(swiperId);
        }

        // Previous slide
        function prevSlide(swiperId) {
            const wrapper = document.getElementById(`recruitment-wrapper-${swiperId}`);
            const slides = wrapper.querySelectorAll('.recruitment-swiper-slide');
            const maxIndex = slides.length - Math.floor(wrapper.parentElement.offsetWidth / (slides[0].offsetWidth + 40));
            
            let newIndex = swiperState[swiperId].currentIndex - 1;
            if (newIndex < 0) {
                newIndex = maxIndex;
            }
            
            moveToSlide(swiperId, newIndex);
            resetAutoplay(swiperId);
        }

        // Start autoplay
        function startAutoplay(swiperId) {
            const direction = swiperState[swiperId].direction;
            
            swiperState[swiperId].autoplayInterval = setInterval(() => {
                if (direction === 1) {
                    nextSlide(swiperId);
                } else {
                    prevSlide(swiperId);
                }
            }, 3000);
        }

        // Reset autoplay
        function resetAutoplay(swiperId) {
            clearInterval(swiperState[swiperId].autoplayInterval);
            startAutoplay(swiperId);
        }

        // Initialize both swipers
        initSwiper(1, topCompanies);
        initSwiper(2, bottomCompanies);

        // Pause on hover
        document.querySelectorAll('.recruitment-swiper-container').forEach((container, index) => {
            const swiperId = index + 1;
            
            container.addEventListener('mouseenter', () => {
                clearInterval(swiperState[swiperId].autoplayInterval);
            });
            
            container.addEventListener('mouseleave', () => {
                startAutoplay(swiperId);
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            moveToSlide(1, swiperState[1].currentIndex);
            moveToSlide(2, swiperState[2].currentIndex);
        });