'use strict';
//NASA API
const count = 12;
const API_KEY = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;
const nav = document.getElementById('resultsNav');
const fav = document.getElementById('favNav');
const articlesContainer = document.querySelector('.card-container');
const saveConfirmed = document.querySelector('.saved-items');
const loader = document.querySelector('.loader');

let results = [];
let favs = {};

//Create Card
function createCard(item) {
	const card = document.createElement('article');
	const link = document.createElement('a');
	const image = document.createElement('img');
	const content = document.createElement('div');
	const titleCard = document.createElement('h5');
	const saveToFavorites = document.createElement('button');
	const text = document.createElement('p');
	const footerCard = document.createElement('small');
	const dateArticle = document.createElement('strong');
	const copyright = document.createElement('span');
	card.classList.add('card');
	link.href = item.hdurl;
	link.title = 'View Full Image';
	link.target = '_blank';
	image.src = item.url;
	image.alt = item.title;
	image.classList.add('card-img-top');
	content.classList.add('card-content');
	titleCard.textContent = item.title;
	saveToFavorites.textContent = 'Add to favorites';
	text.textContent = item.explanation;
	dateArticle.textContent = item.date;
	copyright.textContent = item.copyright ?? '';
	content.append(titleCard, saveToFavorites, text, footerCard);
	footerCard.append(dateArticle, copyright);
	if (item.media_type === 'image') {
		link.appendChild(image);
	}
	card.append(link, content);

	return card;
}

// Update DOM
function updateDOM(results) {
	results.forEach((result) => {
		const card = createCard(result);
		articlesContainer.append(card);
	});
}

// fetch
async function render() {
	try {
		const response = await fetch(apiURL);
		results = await response.json();
		updateDOM(results);
	} catch (error) {
		console.log(error);
	}
}

render();
