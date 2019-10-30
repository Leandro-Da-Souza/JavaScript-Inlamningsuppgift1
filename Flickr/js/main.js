const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const apiKey = 'be68ac13f0d19bb81a965b8623fe37a1';
    let search = document.getElementById('search').value;
    let gallery = document.getElementById('gallery');

    if (search === '') {
        alert('please make a valid search');
        return;
    } else {
        fetch(
            `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&text=${search}&per_page=20&format=json&nojsoncallback=1'`
        )
            .then(res => res.json())
            .then(data => data.photos.photo)
            .then(photos =>
                photos.forEach(photo => {
                    console.log(photo);
                    let output = '';
                    output += `
                        <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
                    `;
                    // console.log(output);
                    gallery.innerHTML += output;
                })
            );
    }
});
