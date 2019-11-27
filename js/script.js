const apiLink = 'https://randomuser.me/api/?results=12&nat=US';
const gallery = document.getElementById('gallery');
const cards = document.querySelectorAll('card');
const searchContainer = document.querySelector('.search-container');


fetch(apiLink)
	.then( response => response.json() )
	.then( data => generateUsers(data.results))

	


const generateUsers = data => {
		
		data.forEach(employee => {
			const cardContainer = document.createElement("div");
		    cardContainer.classList.add("card");
		    gallery.appendChild(cardContainer);
			cardContainer.innerHTML = `
	            <div class="card-img-container">
	                <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
	            </div>
	            <div class="card-info-container">
	                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
	                <p class="card-text">${employee.email}</p>
	                <p class="card-text cap">${employee.location.city} ${employee.location.state}</p>
	            </div>
	        `;
	        cardContainer.addEventListener('click', e => {
	        	modalWindow(employee)
	        })
		})
}




const modalWindow = (employee) => {
		const modalContainer = document.createElement('div');
		modalContainer.className = 'modal-container';
		const body = document.querySelector('body');
		body.appendChild(modalContainer);

		
			const html = `
				<div class="modal">
	                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
	                <div class="modal-info-container">
	                    <img class="modal-img" src="${employee.picture.thumbnail}" alt="profile picture">
	                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
	                    <p class="modal-text">${employee.email}</p>
	                    <p class="modal-text cap">${employee.location.city}</p>
	                    <hr>
	                    <p class="modal-text">${employee.phone}</p>
	                    <p class="modal-text">
	                    	${employee.location.street.number} 
	                    	${employee.location.street.name}, 
	                    	${employee.location.state} 
	                    	${employee.location.postcode} 
	                    </p>
	                    <p class="modal-text">Birthday: ${employee.dob.date}</p>
	                </div>
	            </div>
			`;
			modalContainer.innerHTML = html;

		const closeButton = document.getElementById('modal-close-btn');
		closeButton.addEventListener('click', e => {
			modalContainer.remove()
		})	
}

const searchBox = () => {
	const searchHTML = `
		<form action="#" method="get">
	        <input type="search" id="search-input" class="search-input" placeholder="Search...">
	        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
	    </form>`;
	searchContainer.innerHTML = searchHTML;
}

searchBox();


const searchFunctionality = () => {
	const searchInput = document.getElementById('search-input');
	const searchButton = document.getElementById('search-submit');
	 
	searchButton.addEventListener('click', e => {
		cards.forEach(card => {
			console.log('hello')
		})
	})
}

searchFunctionality();







	


