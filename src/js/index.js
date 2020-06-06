import Search from './models/Search';
import Photos from './models/Photos';
import * as searchView from './views/searchView'
import { elements } from './views/base';

const state = {};

const controlSearch = async () => {
    const query = 'singapore';
    searchView.clearResults();

    if (query) {
        //creating a new object
        state.search = new Search(query);

        //clear the input field
        searchView.clearInput();

        //get the results for particular query
        try {
            await state.search.getResults(query);
        } catch (error) {
            alert('Something went wrong!')
        }

        state.photos = new Photos();

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
        console.log(urls);

        console.log(state.photos.results);

        //render the search results in UI
        searchView.renderResults(state.search.results, urls);
        //state.search.results.forEach((el, index) => searchView.renderHotels(el, urls[index]));

    }
}

elements.searchForm.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    const urls = state.photos.getUrl();
    if (btn) {
        const gotoToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, urls, gotoToPage);
    }
});
