class Slider {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.slidesContainer = document.querySelector('.slides');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.dots');
        this.slides = Array.from(this.slidesContainer.children);
        this.current = 1;

        this.cloneSlides()
        this.createDots()
        this.attachEvents()
        this.goTo(this.current, false)
    }

    cloneSlides(){
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
        this.slidesContainer.appendChild(firstClone);
        this.slidesContainer.insertBefore(lastClone, this.slidesContainer.firstChild);
        this.slides = Array.from(this.slidesContainer.children);
        this.realSlideCount = this.slides.length - 2;
    }

    createDots() {
        this.dots = []
        for (let i = 0; i < this.realSlideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i + 1));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot)
        }

    }
   
    attachEvents(){
        this.prevBtn.addEventListener('click', () => this.goTo(this.current - 1));
        this.nextBtn.addEventListener('click', () => this.goTo(this.current + 1));
        this.slidesContainer.addEventListener('transitionend', () => {
            if (this.current === 0) {
                this.goTo(this.realSlideCount, false);
            }
            if (this.current === this.slides.length - 1) {
                this.goTo(1, false);
            }
        })
    }

    updateDots() {
        const realIndex = (this.current - 1 + this.realSlideCount) % this.realSlideCount;
        this.dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
    }

    goTo(index, animate = true) {
        if (index < 0 ) index = this.slides.length - 2
        if (index >= this.slides.length) index = 1
        this.current = index;
        if (animate) {
            this.slidesContainer.style.transition = 'none';
            void this.slidesContainer.offsetWidth
            this.slidesContainer.style.transition = 'transform 0.5s ease';

        } else {
            this.slidesContainer.style.transition = 'none'
        }
        this.slidesContainer.style.transform = `translateX(-${this.current * 100}%)`
        if (animate) this.updateDots()
    }   
}

new Slider('.carousel')