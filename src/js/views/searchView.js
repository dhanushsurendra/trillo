import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResults.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitHotelTitle = (title, limit = 24) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

export const renderHotels = (hotels, image) => {
    const markup =
        `
                <div class="grid__search-item" id="${hotels.id}">
                    <img src=${image} alt="${hotels.name}"" class="grid__search-img">
                    <svg class="grid__search-like">
                        <use xlink:href="img/sprite.svg#icon-heart"></use>
                    </svg>
                    <h3 class="grid__search-name">${limitHotelTitle(hotels.name)}</h3>
                    <div class="grid__search-location">
                        <svg class="grid__search-icon">
                            <use xlink:href="img/sprite.svg#icon-location"></use>
                        </svg>
                        <p>${hotels.address.street}, <b>${hotels.address.city}</b></p>
                    </div>
                    <div class="grid__search-description">
                        <svg class="grid__search-icon">
                            <use xlink:href="img/sprite.svg#icon-description"></use>
                        </svg>
                        <p>${roomsAvailable(hotels.totalrooms)} available</p>
                    </div>
                    <div class="grid__search-rating">
                        <svg class="grid__search-icon">
                            <use xlink:href="img/sprite.svg#icon-star-full"></use>
                        </svg>
                        <p>${rating()}</p>
                    </div>
                    <div class="grid__search-price">
                        <svg class="grid__search-icon">
                            <use xlink:href="img/sprite.svg#icon-price-tags"></use>
                        </svg>
                        <p>$${roomPricing(rating(), roomsAvailable(hotels.totalrooms), hotels.totalrooms)}</p>
                    </div>
                </div>
    `

    elements.searchResults.insertAdjacentHTML('beforeend', markup);

}

const rating = () => {
    const random = (Math.random() * 5) + 1;
    const arrSplit = random.toString().split('.');
    if (parseInt(arrSplit[0]) === 0) {
        random *= 10 + 1;
    }
    if (random >= 5) {
        const newRandom = random - 3;
        return newRandom.toFixed(1);
    }
    return random.toFixed(1);
}

const roomsAvailable = totalRooms => {
    const random = Math.round((Math.random() * 100) + 1);
    const availableRooms = Math.floor((random / 100) * totalRooms);
    return availableRooms;
}

const roomPricing = (rating, availableRooms, totalRooms) => {
    const price = (availableRooms / totalRooms) + (rating * 25);
    const tax = 0.18 * price;
    return Math.floor(price + tax);
}

const createButton = (page, type) =>
    `
    <button class="btn btn--pink btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
            <use xlink:href="img/sprite.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    `

const renderButton = (page, numResult, resPerPage) => {
    const pages = Math.ceil(numResult / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `${createButton(page, 'prev')}
                  ${createButton(page, 'next')}`;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('beforeend', button);
}

export const renderResults = (hotels, urls, page = 1, resPerPage = 9) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    hotels.slice(start, end).forEach((el, index) => renderHotels(el, urls[index]));
    renderButton(page, hotels.length, resPerPage);
}