function fetchDogs() {
  fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(res => res.json())
    .then(data => {
      document.getElementById('dogCarousel').innerHTML = data.message.map(img => `<img src="${img}" class="slide">`).join('');
      new SimpleSlider('.slider');
    });
}

function loadBreeds() {
  fetch('https://dogapi.dog/api/v2/breeds')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('breedButtons');
      data.data.forEach(breed => {
        const btn = document.createElement('button');
        btn.textContent = breed.attributes.name;
        btn.className = 'css-button';
        btn.onclick = () => showBreed(breed);
        container.appendChild(btn);
      });
    });
}

function showBreed(breed) {
  const info = document.getElementById('breedInfo');
  info.style.display = 'block';
  info.innerHTML = `
    <h3>${breed.attributes.name}</h3>
    <p>${breed.attributes.description}</p>
    <p>Min Life: ${breed.attributes.min_life}</p>
    <p>Max Life: ${breed.attributes.max_life}</p>
  `;
}

if (annyang) {
  annyang.addCommands({
    'load dog breed *breed': name => {
      fetch('https://dogapi.dog/api/v2/breeds')
        .then(res => res.json())
        .then(data => {
          const breed = data.data.find(b => b.attributes.name.toLowerCase() === name.toLowerCase());
          if (breed) showBreed(breed);
        });
    }
  });
}

fetchDogs();
loadBreeds();
