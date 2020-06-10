import Search from './models/Search';
import Photos from './models/Photos';
import * as searchView from './views/searchView';
import * as likesView from './views/likesView';
import { elements, clearImage, showResultDetails, displayNoResult, clearNoResult, showPagination } from './views/base';
import Likes from './models/Likes';

const state = {};

//search control
const controlSearch = async () => {
    //const query = searchView.getInput();
    const query = 'singapore';
    searchView.clearResults();
    clearNoResult();
    //hideResultDetails();

    if (query) {
        //creating a new object
        state.search = new Search(query);

        //clear the input field
        searchView.clearInput();

        //remove the default image
        clearImage();

        //show pagination
        showPagination();

        //get the results for particular query
        try {
            await state.search.getResults(query);
        } catch (error) {
            alert('Something went wrong!')
        }

        //show heading
        showResultDetails(state.search.query, state.search.getSearchLength());

        state.photos = new Photos(1);

        try {
            await state.photos.getImage();
        } catch (error) {
            console.log(error);
        }

        const searchID = state.search.getID();

        //to make the id of photo same as that of search result
        state.photos.results.forEach((el, index) => {
            el.id = searchID[index];
        });

        //get the image url
        const urls = state.photos.getUrl();
        //console.log(urls);

        //console.log(state.photos.results);

        //render the search results in UI
        if (state.search.results === 0) {
            displayNoResult();
        } else {
            searchView.renderResults(
                state.search.results,
                urls)
                //state.likes.isLiked(searchID));
        }
        //state.search.results.forEach((el, index) => searchView.renderHotels(el, urls[index]));

    } else {
        displayNoResult();
    }
}

elements.searchForm.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

//On pressing the enter key on the keyboard
window.addEventListener('keydown', e => {
    if (e.keyCode === 13 || e.which === 13) {
        controlSearch();
    }
});

elements.searchResPages.addEventListener('click', async e => {
    const btn = e.target.closest('.btn-inline');
    const pageNumber = parseInt(btn.dataset.goto, 10);
    console.log(state.photos.getUrl());
    state.photos = new Photos(pageNumber);
    try {
        await state.photos.getImage();
    } catch (error) {
        console.log(error);
    }
    const urls = state.photos.getUrl();
    if (btn) {
        const goToPage = pageNumber;
        searchView.clearResults();
        searchView.renderResults(state.search.results, urls, goToPage);
    }
});

elements.gridSearch.addEventListener('click', e => {
    const id = e.target.closest('.grid__search-item').dataset.goto;
    controlLikes(id);
});

//state.likes = new Likes();
//Likes controller
const controlLikes = currentID => {
    if (!state.likes) state.likes = new Likes();

    //const id = window.location.hash.replace('#', '');
    //console.log(typeof(currentID));
    //console.log(currentID);


    //the hotel is not liked, a new like is added
    if (!state.likes.isLiked(currentID)) {
        const newLike = state.likes.addLike(
            currentID,
            state.photos.getCurrentImage(currentID),
            state.search.title,
            state.search.address
        )

        /*
        const icons = Array.from(document.querySelectorAll('.grid__search-like-icon use'));
        icons.forEach(el => {
            const ID = el.getAttribute('id');
            if(ID === currentID) {

            }
        });
        */

        likesView.toggleLikeBtn(true, currentID);

        //likesView.renderLike(newLike);
    } else {
        //already liked, remove the like

        //removes from array
        state.likes.deleteLike(currentID);

        likesView.toggleLikeBtn(false, currentID);

        //remove from Ui
        //likesView.deleteLike(currentID);
    }
}

//['hashchange'].forEach(event => window.addEventListener(event, controlLikes()));

window.r = state;

/*
window.addEventListener('load', () => {
    state.likes = new Likes();

    state.likes.readStorage();

    likesView.toggleLikeMenu(state.likes.getNumLikes());

   // state.likes.likes.forEach(like => likesView.renderLike(like));
});


*/