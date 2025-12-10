class Slider {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.slidesContainer = document.querySelector('.slides');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.dots');
        this.slides = Array.from(this.slidesContainer.children);
        this.current = 0;

        this._createDots()
        this._attachEvents()
        this.goTo(this.current)
    }

    _createDots() {
        this.dots = []
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot)
        }

    }
   
    _attachEvents(){
        this.prevBtn.addEventListener('click', () => this.goTo(this.current - 1));
        this.nextBtn.addEventListener('click', () => this.goTo(this.current + 1));
    }

    _updateDots() {
        this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.current));
    }

    goTo(index) {
        this.current = index % this.slides.length;
        this.slidesContainer.style.transform = `translateX(-${this.current * 100}%)`
        if (this.current === 0) {
            this.prevBtn.style.display = 'none'
        } else {
            this.prevBtn.style.display = 'block'
        }
        if (this.current === this.slides.length - 1) {
            this.nextBtn.style.display = 'none'
        } else {
            this.nextBtn.style.display = 'block'
        }
        this._updateDots()
    }
}

new Slider('.carousel')