const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const apiKey = 'be68ac13f0d19bb81a965b8623fe37a1';
    let search = document.getElementById('search').value;
    let gallery = document.getElementById('gallery');
    let loader = document.querySelector('.loader');

    gallery.innerHTML = '';

    if (search === '') {
        alert('please make a valid search');
        return;
    } else {
        loader.style.display = 'block';
        fetch(
            `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&text=${search}&per_page=20&format=json&nojsoncallback=1&safe_search=1'`
        )
            .then(res => res.json())
            .then(data => data.photos.photo)
            .then(photos =>
                photos.forEach(photo => {
                    loader.style.display = 'none';
                    // console.log(photo);
                    let output = '';
                    output += `
                        <img id="photo" src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
                    `;
                    // console.log(output);
                    gallery.innerHTML += output;
                    document.getElementById('search').value = '';
                    // let photo = document.querySelector('#photo');
                })
            )
            .catch(err => {
                console.group(err);
                loader.style.display = 'none';
                gallery.innerHTML = `
                    <p class="error">Something went wrong ;(</p>
                `;
            });
    }
});

gallery.addEventListener('click', e => {
    let photos = Array.from(document.querySelectorAll('#photo'));
    photos.forEach(photo => {
        if (e.target === photo) {
            // console.log(photo.src);
            let div = document.createElement('div');
            div.innerHTML = `
            <img src="${photo.src}" >
            `;
            document.body.appendChild(div);
            div.className = 'lightbox';
            div.addEventListener('click', () => {
                document.body.removeChild(div);
            });
        }
    });
});
