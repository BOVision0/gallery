const folderPath = './images';  // Set this to your image folder path
const gallery = document.getElementById('gallery');
const maxImages = 20;
const extensions = ['jpg', 'jpeg', 'png', 'gif'];

// Overlay elements
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const closeBtn = document.getElementById('closeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const metadata = document.getElementById('imageMetadata');
const imageName = document.getElementById('imageName').querySelector('span');
const imageDimensions = document.getElementById('imageDimensions').querySelector('span');
const imageSize = document.getElementById('imageSize').querySelector('span');
const imageDate = document.getElementById('imageDate').querySelector('span');

// Loop to dynamically add images to the gallery with lazy loading
for (let i = 1; i <= maxImages; i++) {
    let imageLoaded = false;

    for (let ext of extensions) {
        if (imageLoaded) break;

        const img = document.createElement('img');
        img.src = `${folderPath}/image${i}.${ext}`;
        img.loading = "lazy"; // Lazy load image
        img.classList.add('gallery-image');

        // Set up click event to open overlay
        img.onclick = () => {
            overlay.style.display = 'flex';
            overlayImage.src = img.src;
            downloadBtn.href = img.src;  // Set download link to image source
            
            // Get and display metadata
            const imgElement = new Image();
            imgElement.src = img.src;
            imgElement.onload = () => {
                imageName.textContent = img.src.split('/').pop();
                imageDimensions.textContent = `${imgElement.width} x ${imgElement.height}`;
                imageSize.textContent = `${(imgElement.src.length / 1024).toFixed(2)} KB`;  // Rough estimate of size
                imageDate.textContent = new Date().toLocaleDateString();  // Fake upload date for now

                metadata.style.display = 'block';  // Show metadata
            };
        };

        img.onload = () => {
            gallery.appendChild(img);
            imageLoaded = true;
        };

        img.onerror = () => img.remove();  // Remove image if it fails to load
    }
}

// Close the overlay when clicking the close button
closeBtn.onclick = () => {
    overlay.style.display = 'none';
    metadata.style.display = 'none';  // Hide metadata when overlay is closed
};

// Close the overlay when clicking outside the image
overlay.onclick = (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
        metadata.style.display = 'none';
    }
};
