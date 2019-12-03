const apiLink = 'https://randomuser.me/api/?results=12&nat=US';
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const searchContainer = document.querySelector('.search-container');
let users = [];

fetch(apiLink)
	.then( response => response.json() )
	.then( data => generateUsers(data.results))
	.catch( error => {gallery.innerHTML = `<h2>Something went wrong<h2>`});

	

/**
uses data from api and html template to create and show cards on the page
adds click event for every created card
@param{object} data from the APi
**/
const generateUsers = data => {
		users = data;
		users.forEach((user, i) => {
			const cardContainer = document.createElement("div");
		    cardContainer.classList.add("card");
		    gallery.appendChild(cardContainer);
			cardContainer.innerHTML = `
	            <div class="card-img-container">
	                <img class="card-img" src="${users[i].picture.thumbnail}" alt="profile picture">
	            </div>
	            <div class="card-info-container">
	                <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
	                <p class="card-text">${users[i].email}</p>
	                <p class="card-text cap">${users[i].location.city} ${users[i].location.state}</p>
	            </div>
	        `;
	        cardContainer.addEventListener('click', e => {
	        	modalWindow(i)
	        })
		})
}


/**
creates modal window
@param{number} users array index
**/

const modalWindow = (i) => {
		
		const modalContainer = document.createElement('div');
		modalContainer.className = 'modal-container';
		const body = document.querySelector('body');
		body.appendChild(modalContainer);

		
			const html = `
				<div class="modal">
	                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
	                <div class="modal-info-container">
	                    <img class="modal-img" src="${users[i].picture.thumbnail}" alt="profile picture">
	                    <h3 id="name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
	                    <p class="modal-text">${users[i].email}</p>
	                    <p class="modal-text cap">${users[i].location.city}</p>
	                    <hr>
	                    <p class="modal-text">${users[i].phone}</p>
	                    <p class="modal-text">
	                    	${users[i].location.street.number} 
	                    	${users[i].location.street.name}, 
	                    	${users[i].location.state} 
	                    	${users[i].location.postcode} 
	                    </p>
	                    <p class="modal-text">Birthday: ${users[i].dob.date}</p>
	                </div>
	                <div class="modal-btn-container">
	                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
	                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                	</div>
	            </div>
			`;
			modalContainer.innerHTML = html;

		closeModal(modalContainer);
		nextWindow(modalContainer, i);
		prevWindow(modalContainer, i);
}


/**
closes modalwindow
@param{html element} element to remove
**/
const closeModal = window => {
	const closeButton = document.getElementById('modal-close-btn');
		closeButton.addEventListener('click', e => {
			window.remove()
		})
}

/**
displays next modal window onclick
if window is last, next will be displayed first one
@param{html element}
@param{number} index of users array
**/
 const nextWindow = (window, i) => {
 	const nextButton = document.getElementById('modal-next');
	nextButton.addEventListener('click', e => {
		window.remove()
		if (i < users.length - 1) {
			modalWindow(i+1)
			console.log('something')
		} else {
			modalWindow(0)
		}
	})
 }

const prevWindow = (window, i) => {
	const prevButton = document.getElementById('modal-prev');
		prevButton.addEventListener('click', e => {
			window.remove();
			if (i > 0) {
				modalWindow(i-1);
			} else {
				modalWindow(users.length -1)
			}
		})
}


                         
                         /////SEARCH/////


// adds search html to the page
const searchBox = () => {
	const searchHTML = `
		<form action="#" method="get">
	        <input type="search" id="search-input" class="search-input" placeholder="Search...">
	        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
	    </form>`;
	searchContainer.innerHTML = searchHTML;
}

// adds functionality to the search form
const searchFunctionality = () => {
	const searchInput = document.getElementById('search-input');
	const searchButton = document.getElementById('search-submit');
	
	//onclick for every card(person) check if cards name includes input.vale and display or hide card
	searchButton.addEventListener('click', e => {
		for (let i = 0; i < cards.length; i++) {
			const name = cards[i].querySelector('#name').textContent.toLowerCase();
			if (name.includes(searchInput.value.toLowerCase())) {
				cards[i].style.display = 'flex';
			} else {
				cards[i].style.display = 'none'
			}
		}
		searchInput.value= '';
	})
}



searchBox();
searchFunctionality();







	


