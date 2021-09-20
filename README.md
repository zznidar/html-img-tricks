# html-img-tricks
Various tricks to make images on your website more user-friendly. 

## img map area percentage
Although declaring area coordinates as percentages found its way into one of w3 drafts, it never saw the light. Unfortunately, because it would be really useful. Imagine you have a responsive website where images are resized to fit on screens of different sizes perfectly. How to create a map for such an image? Definitely not by using absolute pixel coordinates. 
### JavaScript comes to the rescue!
The `calculateMaps` function in `calculateMaps.js` translates percentage values into actual pixel coordinates, based on current image size. 
1. Add a `cooper` attribute to your area (instead of `coords`) with coordinates as percentages
2. The `<map>` element should have `class="isMap"`
3. The `<img>` element should have `class="hasMap"`
4. Call the `calculateMaps()` function when images are loaded (`load` event should be helpful here)
5. The function will calculate pixel coordinates from your percentages and apply them to the `<area>` elements.

#### Example
```HTML
<map name="map1" class="isMap">
    <area shape="circle" cooper="50%,48%,13%" alt="Coffee?" onclick="handleThis(this)">
</map>
<img src="images/bar.jpg" class="hasMap" usemap="#map1">
```
```js
// Calculate maps as percentages
window.addEventListener('load', (event) => {
    console.log("Images loaded.")
    // Wait for all images to load. Otherwise, map area coordinates are undefined in Firefox.
    calculateMaps();
});
```
```js
// Recalculate maps as percentages on window resize
let debouncer;
window.addEventListener("resize", function() {
    clearTimeout(debouncer);
    // Suppose 200 ms is enough for all elements to be repositioned
    // Also, suppose no change in 200 ms means stale.
    debouncer = setTimeout(calculateMaps, 200);
})
```