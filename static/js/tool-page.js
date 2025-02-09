let isFirstImage = true;

// Check if example2.png exists
function checkSecondImage() {
  const img = new Image();
  img.onload = function() {
    document.getElementById('switchButton').style.display = 'block';
  };
  img.onerror = function() {
    document.getElementById('switchButton').style.display = 'none';
  };
  img.src = 'example2.png';
}

function toggleImage() {
  const img = document.getElementById('exampleImage');
  if (isFirstImage) {
    img.src = 'example2.png';
  } else {
    img.src = 'example.png';
  }
  isFirstImage = !isFirstImage;
}

// Check for second image when page loads
window.onload = checkSecondImage;