document.addEventListener('DOMContentLoaded', function () {

        /* TESTIMONIALS SWIPER */
        const testimonialsSwiper = new Swiper('.cdc-testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            loopAdditionalSlides: 2,
            speed: 600,
            effect: 'slide',
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
            on: {
                init() {
                    console.log('Testimonials Swiper initialized');
                }
            }
        });


        /* NEWS SWIPER */
        const cdcNewsSwiper = new Swiper('.cdc-newsSwiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 600,
            effect: 'slide',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.cdc-newsSwiper .cdc-swiper-pagination',
                clickable: true,
            },
            on: {
                init() {
                    console.log('News Swiper initialized');
                }
            }
        });
        const counters = document.querySelectorAll('.stat-number');
        let started = false;

        const runCounter = () => {
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                let count = 0;
                const speed = 200; // lower = faster

                const updateCount = () => {
                    const increment = Math.ceil(target / speed);

                    if (count < target) {
                        count += increment;
                        counter.innerText = count > target ? target : count;
                        requestAnimationFrame(updateCount);
                    } else {
                        // add + sign if needed
                        if (counter.dataset.target === "120") {
                            counter.innerText = target + "+";
                        } else {
                            counter.innerText = target;
                        }
                    }
                };

                updateCount();
            });
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    runCounter();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.stats'));
    });