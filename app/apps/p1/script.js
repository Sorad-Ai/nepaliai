// Check if the window width is less than 1079 pixels
if (window.innerWidth >= 1079) {
    setTimeout(() => {
        // Get the controls div and the horizontal-bar div
        const controlsDiv = document.querySelector('.controls');
        const horizontalBarDiv = document.querySelector('.horizontal-bar');

        // // Hide the controls div
        // if (controlsDiv) {
        //     controlsDiv.style.display = 'none'; // Hides the controlsDiv
        // }

        // Append the controls div inside the horizontal-bar div
        if (controlsDiv && horizontalBarDiv) {
            horizontalBarDiv.appendChild(controlsDiv);
        }

    }, 220);
}
