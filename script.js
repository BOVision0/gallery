const folderPath = './images';  // Set this to your image folder path
const gallery = document.getElementById('gallery');
const maxImages = 999;  // Set to 80 to load all images
const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'jfif']; // Added WebP and JFIF support

// Overlay elements
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const closeBtn = document.getElementById('closeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const metadata = document.getElementById('imageMetadata');
const imageName = document.getElementById('imageName').querySelector('span');
const imageDimensions = document.getElementById('imageDimensions').querySelector('span');

// Loop to dynamically add images to the gallery with immediate loading
for (let i = 1; i <= maxImages; i++) {
    let imageLoaded = false;

    for (let ext of extensions) {
        if (imageLoaded) break;

        const img = document.createElement('img');
        img.src = `${folderPath}/image${i}.${ext}`;
        img.classList.add('gallery-image');
        img.loading = "eager";  // Disable lazy loading for now

        // Set up click event to open overlay
        img.onclick = () => {
            overlay.style.display = 'flex';
            overlayImage.src = img.src;
            
            // Set download link and filename
            const filename = img.src.split('/').pop();
            downloadBtn.href = img.src;
            downloadBtn.setAttribute('download', filename);

            // Get and display metadata
            const imgElement = new Image();
            imgElement.src = img.src;
            imgElement.onload = () => {
                imageName.textContent = filename;
                imageDimensions.textContent = `${imgElement.width} x ${imgElement.height}`;
                metadata.style.display = 'block';  // Show metadata
            };
        };

        img.onload = () => {
            gallery.appendChild(img);
            imageLoaded = true;
            console.log(`Image ${i} loaded successfully: ${img.src}`);
        };

        img.onerror = () => {
            console.error(`Image ${i} failed to load: ${img.src}`);
            img.remove();  // Remove image if it fails to load
        };
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
