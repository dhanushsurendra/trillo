import Search from './models/Search';
import Photos from './models/Photos';
import Popup from './models/Popup';
import Maps from './models/Maps';
import { mapLink } from './config';
import * as searchView from './views/searchView';
import * as likesView from './views/likesView';
import { elements, clearImage, showResultDetails, displayNoResult, clearNoResult, showPagination } from './views/base';
import Likes from './models/Likes';
import { clearPopup, renderPopup } from './views/popupView';

const state = {};

//search control
const controlSearch = async () => {
    const query = searchView.getInput();
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

        const searchID = state.photos.getID();
        //console.log(searchID);

        //to make the id of photo same as that of search result
        state.search.results.forEach((el, index) => {
            el.id = searchID[index];
            //console.log(el.id);
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
    if (e.target.matches('.grid__search-like, .grid__search-like *')) {
        const id = e.target.closest('.grid__search-like').dataset.goto;
        controlLikes(id);
    } else if (e.target.matches('.grid__search-btn')) {
        const id = e.target.closest('.grid__search-btn').dataset.itemid;
        const newID = id.substr(0, id.length - 3);
        console.log(newID);
        controlPopup(newID);
    }
});

/*
window.addEventListener('load', () => {

    state.likes = new Likes();

    state.likes.readStorage();

    document.querySelector('.nav__fav-badge').textContent = state.likes.getNumLikes();

    if (state.likes.getNumLikes() > 0) {
       // deleteLikeItem();
    }

    state.likes.likes.forEach(el => likesView.renderLike(el));
})
*/

//CONTROL LIKES

const controlLikes = currentID => {

    if (!state.likes) state.likes = new Likes();

    console.log(state.likes.getNumLikes() + 1);

    const newID = currentID.substr(0, currentID.length - 3);
    console.log(currentID);

    if (!state.likes.isLiked(currentID)) {

        document.querySelector('.nav__fav-badge').textContent = state.likes.getNumLikes() + 1;

        const newLike = state.likes.addLike(
            currentID,
            state.photos.getCurrentImage(newID),
            state.search.getDetails(newID).name,
            `${state.search.getDetails(newID).address.street}, ${state.search.getDetails(newID).address.city}`
        )
        console.log(newLike);
        likesView.toggleLikeBtn(true, currentID);

        likesView.renderLike(newLike);

    } else {

        document.querySelector('.nav__fav-badge').textContent = state.likes.getNumLikes() - 1;

        state.likes.deleteLike(currentID);

        likesView.toggleLikeBtn(false, currentID);
        console.log(`${newID} passed from modify UI`);

        likesView.deleteLike(newID);
    }
}

elements.deleteLikeItem.addEventListener('click', e => {
    if (e.target.matches('.likes__delete, .likes__delete *')) {
       const id = e.target.closest('.likes__delete').dataset.id;
       const newID = id.substr(0, id.length - 3);

       likesView.deleteLikeItem(newID);

       document.querySelector('.nav__fav-badge').textContent = state.likes.getNumLikes() - 1;

       state.likes.deleteLike(newID.concat('a23'));

       likesView.toggleLikeBtn(false, newID.concat('a23'));
    }
});

window.r = state;
//CONTROL POPUP

const controlPopup = id => {
    const rating = document.getElementById(id + 'r99').textContent;
    const roomsAvailable = document.getElementById(id + 's99').textContent;
    const roomPrice = parseFloat(document.getElementById(id + 'p99').textContent.replace('$', ''));
    const url = document.getElementById(id + 'i99').getAttribute('src');
    const popupDetails = state.search.getDetails(id);
    state.popup = new Popup(popupDetails);
    state.popup.getPopupDetails(rating, roomsAvailable, roomPrice);
    const [latitude, longitude] = formatCordinates(
        popupDetails.location.latitude,
        popupDetails.location.longitude)
    state.maps = new Maps(
        id,
        latitude,
        longitude,
        popupDetails.name,
        mapLink);
    state.maps.getMap();
    // state.streetView = new StreetView(
    //     id,
    //     latitude,
    //     longitude);
    // state.streetView.getStreetMap();
    clearPopup();
    renderPopup(state.popup, url);
}

elements.popup.addEventListener('click', e => {
    if (e.target.matches('.popup__location, .popup__location *')) {
        document.querySelector('.popup__left--top-1').style.top = '0%';
    } else if (e.target.matches('.popup__cancel-map, .popup__cancel-map *')) {
        document.querySelector('.popup__left--top-1').style.top = '100%';
    } else if (e.target.matches('.popup__street-view, .popup__street-view *')) {
        document.querySelector('.popup__left--top-2').style.top = '0%';
    } else if (e.target.matches('.popup__cancel-street-view, .popup__cancel-street-view *')) {
        document.querySelector('.popup__left--top-2').style.top = '100%';
    } else if (e.target.matches('.popup__label-bed, .popup__label-bed *')) {
        if (e.target.checked) {
            const newPrice = state.popup.updateRoomPricing('bed');
            document.querySelector('.popup__room-price').textContent = `$${newPrice}`
        }
    } else if (e.target.matches('.popup__button-adult-increase, .popup__button-adult-increase *')) {
        if (parseInt(document.querySelector('.popup__input-adult').value) === 5) {
            document.querySelector('.popup__button-adult-increase').setAttribute('disabled', 'true')
        }
        else if (document.querySelector('.popup__input-adult').value >= 0) {
            const [noOfPeople, roomPrice] = state.popup.updatePeoplePrice('inc');
            document.querySelector('.popup__input-adult').value = noOfPeople;
            document.querySelector('.popup__room-price').textContent = `$${roomPrice}`;
        }
    }
    else if (e.target.matches('.popup__button-adult-decrease, .popup__button-adult-decrease *')) {
        if (parseInt(document.querySelector('.popup__input-adult').value) >= 2) {
            const [noOfPeople, roomPrice] = state.popup.updatePeoplePrice('dec');
            document.querySelector('.popup__input-adult').value = noOfPeople;
            document.querySelector('.popup__room-price').textContent = `$${roomPrice}`;
        } else {
            document.querySelector('.popup__button-adult-decrease').setAttribute('disabled', 'true')
        }
    }
    // } else if (e.target.matches('.popup__input-date-2')) {
    //         setTimeout(() => {
    //
    //         }, 2000);
    else if (e.target.matches('.popup__label-breakfast, .popup__label-breakfast *')) {
        if (e.target.checked) {
            const newPrice = state.popup.updateRoomPricing('breakfast');
            document.querySelector('.popup__room-price').textContent = `$${newPrice}`
        }
    } else if (e.target.matches('.popup__label-lunch, .popup__label-lunch *')) {
        if (e.target.checked) {
            const newPrice = state.popup.updateRoomPricing('lunch');
            document.querySelector('.popup__room-price').textContent = `$${newPrice}`
        }
    } else if (e.target.matches('.popup__label-dinner, .popup__label-dinner *')) {
        if (e.target.checked) {
            const newPrice = state.popup.updateRoomPricing('dinner');
            document.querySelector('.popup__room-price').textContent = `$${newPrice}`
        }
    } else if (e.target.matches('.popup__input-date-2')) {
        document.querySelector('.popup__input-date-2').click();
        setTimeout(() => {
            updatePriceDays();
        }, 2000);
    }
});

const updatePriceDays = () => {
    const checkin = new Date(document.querySelector('.popup__input-date-1').value);
    const checkout = new Date(document.querySelector('.popup__input-date-2').value);
    console.log(document.querySelector('.popup__input-date-2').value);
    if (parseInt(checkout - checkin) > 0) {
        const days = parseInt((checkout - checkin) / (24 * 3600 * 1000));
        if (document.querySelector('.popup__input-date-2')) {
            document.querySelector('.popup__values').textContent = days;
            const newPrice = state.popup.updatePriceDays(days);
            document.querySelector('.popup__room-price').textContent = `$${newPrice}`;
        } else {
            document.querySelector('.popup__values').textContent = '?';
        }
    } else {
        document.querySelector('.popup__values').textContent = '?';
    }
}


const formatCordinates = (longitude, latitude) => {
    const lngArr = longitude.toString().split('.');
    const lngShort = lngArr[1].substr(0, 6);
    const lngNew = parseFloat(`${lngArr[0]}.${lngShort}`);
    const latArr = latitude.toString().split('.');
    const latShort = latArr[1].substr(0, 6);
    const latNew = parseFloat(`${latArr[0]}.${latShort}`);
    return [lngNew, latNew];
}
