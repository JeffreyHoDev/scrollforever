const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

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

// On load
getPhotos();