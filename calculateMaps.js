function calculateMaps() {
    let haveMaps = document.getElementsByClassName("hasMap"); // Images with maps
    let theseMaps = document.getElementsByClassName("isMap"); // Maps containing areas
    console.assert(haveMaps.length == theseMaps.length, "Number of images with maps != number of maps");
    for(let i = 0; i < haveMaps.length; i++) {
        console.log(i, haveMaps[i], theseMaps[i]);
        let imgWidth = haveMaps[i].width;
        let imgHeight = haveMaps[i].height;
        console.log("imgW,H: ", imgWidth, imgHeight);

        for(let c of theseMaps[i].children) {
            let percentages = c.attributes["cooper"].value.split("%,");
            console.log("Perc: ", percentages);
            let x = imgWidth*percentages[0]/100;
            let y = imgHeight*percentages[1]/100;
            let r = Math.min(imgWidth, imgHeight)*parseInt(percentages[2])/100; // parseInt to remove % sign
            console.log(`${x}, ${y}, ${r}`);
            c.setAttribute("coords", `${x}, ${y}, ${r}`);
        }

    }

}

// Calculate maps as percentages
window.addEventListener('load', (event) => {
    console.log("Images loaded.")
    // Wait for all images to load. Otherwise, map area coordinates are undefined in Firefox.
    calculateMaps();

});

// Recalculate maps as percentages on window resize
let debouncer;
window.addEventListener("resize", function() {
    clearTimeout(debouncer);
    // Suppose 200 ms is enough for all elements to be repositioned
    // Also, suppose no change in 200 ms means stale.
    debouncer = setTimeout(calculateMaps, 200);
})