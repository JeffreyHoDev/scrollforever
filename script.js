// Unsplash API
const count = 10;
const apiKey = 'bqleAhOwth2XjSPXhWT7mkfj-FbcZTDHAKPwavsF1Ww';
const UnsplashAPIUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API, note the request made
async function getPhotos(){
    try{
        const response = await fetch(UnsplashAPIUrl);
        const data = await response.json();
        console.log(data);
    }catch(error){
        // Catch Error
    }
}

// On load
getPhotos();