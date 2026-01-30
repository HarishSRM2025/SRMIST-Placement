let imgLenTop=58;
let imgLenBottom=57;

/* SWIPER FACTORY */
function AdvancedSwiper({
    trackId,
    companies,
    prevBtn,
    nextBtn,
    auto = true,
    interval = 2500,
    direction = 1
}) {
    const names = companies.split("--");
    const folder = names[0];
    const total = Number(names[1]);

    const track = document.getElementById(trackId);
    const viewport = track.parentElement;

    let index = total; // 👈 start in middle
    let timer = null;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    track.style.transition = 'transform 0.4s ease';

    /* CREATE SLIDES (CLONED) */
    function createSlides() {
        // last clone
        for (let i = 1; i <= total; i++) {
            const slide = createSlide(i);
            track.appendChild(slide);
        }

        // real slides
        for (let i = 1; i <= total; i++) {
            const slide = createSlide(i);
            track.appendChild(slide);
        }

        // first clone
        for (let i = 1; i <= total; i++) {
            const slide = createSlide(i);
            track.appendChild(slide);
        }
    }

    function createSlide(i) {
        const slide = document.createElement('div');
        slide.className = 'recruitment-swiper-slide';
        slide.innerHTML = `
            <div class="recruitment-logo-card">
                <img src="./assets/images/logos/${folder}/${i}.jpg">
            </div>
        `;
        slide.onclick = () => openModal(folder, total, i);
        return slide;
    }

    createSlides();

    function slideWidth() {
        return track.children[0].offsetWidth + 40;
    }

    function update(animate = true) {
        track.style.transition = animate ? 'transform 0.4s ease' : 'none';
        currentTranslate = -index * slideWidth();
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function checkLoop() {
        if (index >= total * 2) {
            index = total;
            update(false);
        }
        if (index < total) {
            index = total * 2 - 1;
            update(false);
        }
    }

    function next() {
        index++;
        update();
        setTimeout(checkLoop, 410);
    }

    function prev() {
        index--;
        update();
        setTimeout(checkLoop, 410);
    }

    /* AUTO SCROLL */
    function startAuto() {
        if (!auto) return;
        stopAuto();
        timer = setInterval(() => {
            direction === 1 ? next() : prev();
        }, interval);
    }

    function stopAuto() {
        if (timer) clearInterval(timer);
    }

    /* ARROWS */
    document.getElementById(prevBtn).onclick = () => {
        stopAuto(); prev(); startAuto();
    };

    document.getElementById(nextBtn).onclick = () => {
        stopAuto(); next(); startAuto();
    };

    /* DRAG SUPPORT */
    viewport.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX;
        prevTranslate = currentTranslate;
        stopAuto();
        track.style.transition = 'none';
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const delta = e.pageX - startX;
        track.style.transform = `translateX(${prevTranslate + delta}px)`;
    });

    window.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false;
        const moved = e.pageX - startX;

        track.style.transition = 'transform 0.4s ease';

        if (moved < -50) next();
        else if (moved > 50) prev();
        else update();

        startAuto();
    });

    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', () => update(false));

    update(false);
    startAuto();
}

AdvancedSwiper({
    trackId: 'swiper-top',
    companies: "top--"+imgLenTop,
    prevBtn: 'top-prev',
    nextBtn: 'top-next',
    auto: true,
    interval: 1500,
    direction: 1
});

AdvancedSwiper({
    trackId: 'swiper-bottom',
    companies: "bottom--"+imgLenBottom,
    prevBtn: 'bottom-prev',
    nextBtn: 'bottom-next',
    auto: true,
    interval: 1500,
    direction: 1
});

/* MODAL */
let modalIndex = 1;
let modalFolder = '';
let modalTotal = 0;

const modal = document.getElementById('logoModal');
const modalImg = document.getElementById('modalImage');

function openModal(folder, total, index) {
    modalFolder = folder;
    modalTotal = Number(total);
    modalIndex = index;

    updateModalImage();
    modal.style.display = 'flex';
}

function updateModalImage() {
    modalImg.src = `./assets/images/logos/${modalFolder}/${modalIndex}.jpg`;
}

function changeModal(dir) {
    modalIndex += dir;

    if (modalIndex < 1) modalIndex = modalTotal;
    if (modalIndex > modalTotal) modalIndex = 1;

    updateModalImage();
}

document.querySelector('.modal-nav.left').onclick = () => changeModal(-1);
document.querySelector('.modal-nav.right').onclick = () => changeModal(1);
document.querySelector('.logo-modal .close').onclick = () => modal.style.display = 'none';

document.addEventListener('keydown', e => {
    if (modal.style.display !== 'flex') return;

    if (e.key === 'Escape') modal.style.display = 'none';
    if (e.key === 'ArrowLeft') changeModal(-1);
    if (e.key === 'ArrowRight') changeModal(1);
});