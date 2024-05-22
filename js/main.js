


document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Function to set the background image of a div
    function setBackgroundImage(elementId, imageName) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = "";
            element.style.backgroundImage = `url('./loadout/${imageName}.png')`;
            element.style.backgroundSize = 'contain';
            element.style.backgroundRepeat = 'no-repeat';
            element.style.backgroundPosition = 'center';
            element.setAttribute('data-tooltip', imageName);
        }
    }

    // Function to fetch and set the background image for all types
    function fetchAndSetImages() {
        // Fetch and set the background image for Primary
        socket.emit('get:Primary');
        socket.on('response:Primary', (imageName) => {
            setBackgroundImage('Primary', imageName);
        });

        // Fetch and set the background image for Sidearms
        socket.emit('get:Sidearms');
        socket.on('response:Sidearms', (imageName) => {
            setBackgroundImage('Sidearms', imageName);
        });

        // Fetch and set the background image for Grenades
        socket.emit('get:Grenades');
        socket.on('response:Grenades', (imageName) => {
            setBackgroundImage('Grenades', imageName);
        });

        // Fetch and set the background images for Stratagems
        const stratagemElements = ['Stratagem1', 'Stratagem2', 'Stratagem3', 'Stratagem4'];
        const stratagemResponses = new Set();

        stratagemElements.forEach((elementId) => {
            socket.emit('get:Stratagems');
            socket.on('response:Stratagems', function handler(imageName) {
                if (!stratagemResponses.has(imageName)) {
                    stratagemResponses.add(imageName);
                    setBackgroundImage(elementId, imageName);
                    socket.off('response:Stratagems', handler);
                } else {
                    socket.emit('get:Stratagems');
                }
            });
        });
    }

    // Call fetchAndSetImages on load
    fetchAndSetImages();

    // Attach fetchAndSetImages to the button with id 'rgenerate'
    const button = document.getElementById('rgenerate');
    if (button) {
        button.addEventListener('click', fetchAndSetImages);
    }
});
