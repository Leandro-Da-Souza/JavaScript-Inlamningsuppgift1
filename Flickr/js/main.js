// Global variabel där jag hämtat formuläret för att lägga en lyssnare
const form = document.getElementById('form');

form.addEventListener('submit', e => {
    // Förhindra att formuläret försöker skickas till en server
    e.preventDefault();

    // Variabler = ApiNyckel, sökvärde, galleriet, loader och en header
    const apiKey = 'be68ac13f0d19bb81a965b8623fe37a1';
    let search = document.getElementById('search').value;
    let gallery = document.getElementById('gallery');
    let loader = document.querySelector('.loader');
    let header = document.querySelector('#galleryHeader');

    // gömma headern och galleriet när en sökning görs för att sedan fadea in dem.
    header.style.display = 'none';
    gallery.style.border = 'none';

    // se till all galleriet är tomt på innehåll när en sökning görs
    gallery.innerHTML = '';

    // en enkel validering för att se till formuläret inte är tomt
    if (search === '') {
        alert('please make a valid search');
        return;
    } else {
        // en loader som sätts när en sökning görs
        loader.style.display = 'block';
        // hämta data från API
        fetch(
            `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&text=${search}&per_page=20&format=json&nojsoncallback=1&safe_search=3'`
        )
            // konvertera JSON data från responset
            .then(res => res.json())
            // Komma åt fotona i objektet vi får tillbaka ovanför
            .then(data => data.photos.photo)
            .then(photos =>
                // forEach funktion för definera logik för varje iteration (foto) vi får tillbaka från ovanstående objekt.
                photos.forEach(photo => {
                    // Göm loader
                    loader.style.display = 'none';

                    // Lägg tillbaka header och sätt en border på galleriet
                    header.style.display = 'block';
                    gallery.style.border = '3px solid #000';

                    // Skapa en output variabel
                    let output = '';

                    // "appenda" varje foto iteration till output variabel
                    output += `
                        <img id="photo" src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
                    `;

                    // Lägg in output med foton i gallieret
                    gallery.innerHTML += output;

                    // Ta bort sökvärdet
                    document.getElementById('search').value = '';
                    // let photo = document.querySelector('#photo');
                })
            )
            // Fånga fel
            .catch(err => {
                console.log(err);
                // Göm loadern
                loader.style.display = 'none';
                // sätt in ett felmeddelande i dokumentet
                let div = document.createElement('div');
                div.classList.add('error');
                div.innerHTML = `
                    <p class="error">Something went wrong ;(</p>
                `;
                document.body.appendChild(div);
            });
    }
});

// Lightbox logik
gallery.addEventListener('click', e => {
    // skapa en array för alla foton
    let photos = Array.from(document.querySelectorAll('#photo'));
    // använd en foreach för alla foton
    photos.forEach(photo => {
        // se till att följande logik händer endast ifall kliket är ett foto
        if (e.target === photo) {
            // skapa en div som innehåller fotot
            let div = document.createElement('div');
            div.innerHTML = `
            <img src="${photo.src}" >
            `;
            document.body.appendChild(div);
            div.className = 'lightbox';

            // lägg en lyssnare på diven för att ta bort den från kroppen
            div.addEventListener('click', () => {
                document.body.removeChild(div);
            });
        }
    });
});
