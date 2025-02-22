const button = document.getElementById("prankButton");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const capturedImage = document.getElementById("capturedImage");

// Request camera access
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Camera access denied!", err);
    });

// Capture the image when button is clicked
button.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    // Save image to localStorage for the gallery site
    let storedImages = JSON.parse(localStorage.getItem("prankImages")) || [];
    storedImages.push(imageData);
    localStorage.setItem("prankImages", JSON.stringify(storedImages));

    capturedImage.src = imageData;
    capturedImage.style.display = "block";

   
});
