<template>
    <video
            class="video-js vjs-big-play-centered"
            controls
            preload="auto"
            width="640"
            height="264"
            data-setup='{"playbackRates": [0.7, 1, 1.5, 1.7, 2],"techOrder": ["html5","flash"]}'>
        <source src="${response.url}">
    </video>
</template>

<script>
    import 'video.js/dist/video-js.min.css'
    import 'videojs-flash/dist/videojs-flash.min.js'
    import 'video.js/dist/video.min.js'
</script>

<style>

</style>

