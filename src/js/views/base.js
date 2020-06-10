export const elements = {
    searchInput: document.querySelector('.nav__search-input'),
    searchForm: document.querySelector('.nav__button'),
    searchResults: document.querySelector('.grid__search'),
    searchResPages: document.querySelector('.results__pages'),
    navLinks: document.querySelectorAll('.nav__link--left'),
    searchDetails: document.querySelector('.section-search'),
    gridSearch: document.querySelector('.grid__search'),
    gridSearchItem: document.querySelector('.grid__search-item'),
    likeIconToggle: document.querySelector('.grid__search-like-icon'),
    likeIcon: document.querySelector('.nav__fav'),
    likesList: document.querySelector('.likes__list'),
    navigation: document.querySelector('.nav')

}

export const elementStrings = {
    activeClass: 'nav__active',
    searchResultsHeading: '.search__results-heading',
    searchDetails: '.section-search',
    toggleImage: '.pre-search__box'
}

function toggleLink() {
    //Toogle the nav between home and contact
    const links = Array.from(document.querySelectorAll('.nav__link--left'));

    //remove the active class and add a new active class
    function selectItem(e) {
        removeActive();
        this.classList.add(elementStrings.activeClass);
    }

    //remove the active class
    function removeActive() {
        links.forEach(link => link.classList.remove(elementStrings.activeClass));
    }

    //listen for click
    links.forEach(link => link.addEventListener('click', selectItem));
}

toggleLink();

export const showImage = () => {
    const markup =
        `
        <div class="pre-search__box">
            <img src="img/pre-search.svg" alt="pre search" class="pre-search__img">
            <h2 class="heading-2 heading-2--light text-center u-margin-top-small">Your search results will appear here!</h2>
        </div>
    `

    elements.searchDetails.insertAdjacentHTML('afterbegin', markup);
}

export const clearImage = () => {
    const image = document.querySelector(elementStrings.toggleImage);
    if(image) {
        image.parentElement.removeChild(image);
    }
}

export const showResultDetails = (searchKeyword, searchLength) => {
    const markup =
        `
        <div class="search__results-heading">
            <h2 class="heading-2 heading-2--light text-left">Search results for "${searchKeyword}"</h2>
            <p class="search__results-no u-margin-top-smallest">${searchLength} results</p>
         </div>
        `

    elements.searchDetails.insertAdjacentHTML('afterbegin', markup)
}

export const hideResultDetails = () => {
    const result = document.querySelector(elementStrings.searchResultsHeading);
    result.parentElement.removeChild(result);
    //const result = document.querySelector(elementStrings.searchResultsHeading);
   // result.innerHTML = '';
    //elements.searchDetails.innerHTML = '';
    //elements.hideSearchDetails.parentElement.removeChild(hideSearchDetails);
}

export const displayNoResult = () => {
    clearImage();
    hideResultDetails();
    clearPagination();
    document.querySelector('.search-no__result').style.display = 'block';
}

export const clearNoResult = () => {
    document.querySelector('.search-no__result').style.display = 'none';
}

const clearPagination = () => {
    elements.searchResPages.style.visibility = 'hidden';
}

export const showPagination = () => {
    elements.searchResPages.style.visibility = 'visible';
}