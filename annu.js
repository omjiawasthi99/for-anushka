/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}


function togglePlay() {
  const video = document.getElementById('videoPlayer');
  const playButton = document.getElementById('playButton');

  if (video.style.display === 'none') {
      video.style.display = 'block'; // Show video
      playButton.style.display = 'none'; // Hide button
      video.src += "?autoplay=1"; // Autoplay video
  }
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

 
  window.addEventListener("DOMContentLoaded", () => {
    const bgVideo = document.getElementById("bgVideo");
    const volumeBtn = document.getElementById("volumeBtn");

    // Start video with low volume
    bgVideo.muted = false;
    bgVideo.volume = 0.2;
    bgVideo.play().catch(err => console.warn("Autoplay blocked:", err));

    let volumeState = 1; // 1 = low, 2 = medium, 3 = high, 0 = mute

    volumeBtn.addEventListener("click", () => {
      switch(volumeState) {
        case 1:
          bgVideo.volume = 0.5;
          volumeBtn.textContent = "🔊"; // medium
          volumeState = 2;
          break;
        case 2:
          bgVideo.volume = 1.0;
          volumeBtn.textContent = "📢"; // loud
          volumeState = 3;
          break;
        case 3:
          bgVideo.volume = 0;
          volumeBtn.textContent = "🔇"; // mute
          volumeState = 0;
          break;
        default:
          bgVideo.volume = 0.2;
          volumeBtn.textContent = "🔉"; // low
          volumeState = 1;
      }
    });
  });

