
class FallingElement {
    constructor(container) {
        this.container = container;
        this.x = Math.random() * (container.clientWidth - 50);
        this.y = -50;
        this.speed = Math.random() * 3 + 2;
        this.element = document.createElement('div');
        this.element.className = 'pizza-icon';
    }

    
    render() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.fontSize = '30px';
        this.container.appendChild(this.element); // [cite: 11]
    }

    
    update() {
        this.y += this.speed;
        this.element.style.top = this.y + 'px';

        // Ha kimegy a képből, visszaugrik felülre
        if (this.y > this.container.clientHeight) {
            this.y = -50;
            this.x = Math.random() * (this.container.clientWidth - 50);
        }
    }
}


class Pizza extends FallingElement {
    constructor(container) {
        super(container); // [cite: 11]
        this.element.innerHTML = '🍕';
        this.rotation = 0;
        this.rotationSpeed = Math.random() * 5;
    }

    
    update() {
        super.update(); // [cite: 11]
        this.rotation += this.rotationSpeed;
        this.element.style.transform = `rotate(${this.rotation}deg)`;
    }
}


const container = document.getElementById('canvas-container');
const elements = [];


for (let i = 0; i < 15; i++) {
    const p = new Pizza(container);
    p.render();
    elements.push(p);
}


function animate() {
    elements.forEach(el => el.update());
    requestAnimationFrame(animate);
}


container.addEventListener('click', (e) => {
    const p = new Pizza(container);
    p.x = e.offsetX - 15;
    p.y = e.offsetY - 15;
    p.render();
    elements.push(p);
});

animate();
