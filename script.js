const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Unsplash API
const count = 10;
const apiKey = 'bqleAhOwth2XjSPXhWT7mkfj-FbcZTDHAKPwavsF1Ww';
const UnsplashAPIUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Utility function to set attributes on DOM
function setAttributes(element, attributes) {
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links & photos to the DOM
function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        // Create <a>
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        })

        // Create <i>
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put inside container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get Photos from Unsplash API, note the request made
async function getPhotos(){
    try{
        const response = await fetch(UnsplashAPIUrl);
        photosArray = await response.json();
        displayPhotos()
    }catch(error){
        // Catch Error
    }
}

// Check to see if scrolling near bottom of page
// window innerHeight is browser height that is viewing
// window scrollY is height from top until the view now, so it will keep increase when scroll down
// body.offset is the height of everything, including that is not in view
// 1000px is just offset so before it goes to very bottom, we do something
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
})

// On load
getPhotos();