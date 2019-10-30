const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const apiKey = 'be68ac13f0d19bb81a965b8623fe37a1';
    let search = document.getElementById('search').value;
    let gallery = document.getElementById('gallery');

    gallery.innerHTML = '';

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
                    // console.log(photo);
                    let output = '';
                    output += `
                        <img id="photo" src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
                    `;
                    // console.log(output);
                    gallery.innerHTML += output;
                    // let photo = document.querySelector('#photo');
                })
            );
    }
});

gallery.addEventListener('click', e => {
    let photos = Array.from(document.querySelectorAll('#photo'));
    photos.forEach(photo => {
        if (e.target === photo) {
            console.log(photo.src);
            let div = document.createElement('div');
            div.innerHTML = `
            <img src="${photo.src}">
            `;
            document.body.appendChild(div);
            div.classList.toggle('lightbox');
        }
    });
});

if (document.body.hasChildNodes('div[class="lightbox"]')) {
    document.body.setAttribute('style', 'overflow:hidden');
    // let lightBox = document.querySelector('.lightbox');

    // lightBox.addEventListener('click', () => {
    //     console.log(123);
    // });
}
