const gallery = document.getElementById('gallery');
const queryInput = document.getElementById('query');
const ACCESS_KEY = 'pBZC_yrCrw6QbTmY3f846xxzAzGd6rV_p3Ft2tZuRpc';

function displayImages(photos) {
    gallery.innerHTML = '';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.small;
        img.alt = photo.alt_description || 'Unsplash photo';
        gallery.appendChild(img);
    });
}

document.getElementById('xhrBtn').addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    const query = queryInput.value || 'nature';
    xhr.open('GET', `https://api.unsplash.com/search/photos?query=makkah&client_id=pBZC_yrCrw6QbTmY3f846xxzAzGd6rV_p3Ft2tZuRpc`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayImages(data.results);
        } else {
            alert('XHR Error loading images');
        }
    };
    xhr.send();
});

document.getElementById('fetchBtn').addEventListener('click', () => {
    const query = queryInput.value || 'nature';
    fetch(`https://api.unsplash.com/search/photos?query=makkah&client_id=pBZC_yrCrw6QbTmY3f846xxzAzGd6rV_p3Ft2tZuRpc`)
        .then(res => res.json())
        .then(data => displayImages(data.results))
        .catch(() => alert('Fetch (promises) error'));
});

document.getElementById('asyncBtn').addEventListener('click', async () => {
    const query = queryInput.value || 'nature';
    try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=makkah&client_id=pBZC_yrCrw6QbTmY3f846xxzAzGd6rV_p3Ft2tZuRpc`);
        const data = await res.json();
        displayImages(data.results);
    } catch {
        alert('Fetch (async/await) error');
    }
});
