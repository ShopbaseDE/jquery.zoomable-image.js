# Zoomable Images
This jQuery Plugin helps to create zoomable images.

## Usage
```html
<img src="/to/your/image">
<script>
    $(document).ready(function() {
        $("img").zoomableImage();
    })
</script>
```
If you want to set another image when it is zoomed (e.g. image with higher quality) you can use the two following examples.

HTML:
```html
<img src="path/to/your/image" zoomed-image="/path/to/other/image">
```
JS:
```js
$("img").zoomableImage({
  zoomed: 'path/to/other/image'
});
```

## Settings
Defaults:
```js
{
    zoomed: null,
    zoom: 100,
    effect: {
        speed: "0.3s",
        options: 'ease-in-out'
    },
    cursor: '-webkit-zoom-in',
}
```
