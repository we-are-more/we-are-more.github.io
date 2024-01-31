document.addEventListener('DOMContentLoaded', function () {
    const shapesField = document.querySelector('.shapes');
    const shapes = [];

    for (let i = 0; i < 150; i++) {
        createShape();
    }

    function createShape() {
        const shape = document.createElement('div');
        shape.className = 'circle';
        const randomShape = Math.random();

        if (randomShape < 0.5) {
            shape.className = 'circle';
        } else {
            shape.className = 'square';
        }

        const size = Math.random() * 7;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * window.innerWidth}px`;
        shape.style.top = `${Math.random() * window.innerHeight}px`;

        // Add initial velocities for movement
        shape.velocityX = (Math.random() - 0.5);
        shape.velocityY = (Math.random() - 0.5);

        shapesField.appendChild(shape);
        shapes.push(shape);
    }

    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        shapes.forEach((shape) => {
            const shapeX = shape.getBoundingClientRect().left + shape.clientWidth / 2;
            const shapeY = shape.getBoundingClientRect().top + shape.clientHeight / 2;

            const deltaX = mouseX - shapeX;
            const deltaY = mouseY - shapeY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const moveAwayFactor = 50;
            const speedFactor = 0.1;

            if (distance < moveAwayFactor) {
                const moveX = (moveAwayFactor - distance) * (deltaX / distance) * speedFactor;
                const moveY = (moveAwayFactor - distance) * (deltaY / distance) * speedFactor;

                shape.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
            } else {
                shape.style.transform = 'translate(0, 0)';
            }
        });
    });

    function updateShapes() {
        shapes.forEach((shape) => {
            shape.style.left = `${parseFloat(shape.style.left) + shape.velocityX}px`;
            shape.style.top = `${parseFloat(shape.style.top) + shape.velocityY}px`;

            // Check if shapes are out of the screen, then reset their position and velocity
            if (
                parseFloat(shape.style.left) < 0 ||
                parseFloat(shape.style.left) > window.innerWidth ||
                parseFloat(shape.style.top) < 0 ||
                parseFloat(shape.style.top) > window.innerHeight
            ) {
                shape.style.left = `${Math.random() * window.innerWidth}px`;
                shape.style.top = `${Math.random() * window.innerHeight}px`;
                shape.velocityX = (Math.random() - 0.5) * 2;
                shape.velocityY = (Math.random() - 0.5) * 2;
            }
        });

        requestAnimationFrame(updateShapes);
    }

    updateShapes();
});
