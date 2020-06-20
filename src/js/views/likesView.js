import { elements } from './base';
import { limitHotelTitle } from './searchView';

export const toggleLikeBtn = (isLiked, id) => {
    console.log(isLiked, id);
    const domElement = document.getElementById(`${id}`);
    //console.log(domElement);
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    domElement.setAttribute('href', `img/sprite.svg#${iconString}`);
    //console.log(document.querySelector('.grid__search-like-icon use').getAttribute('id'));
    if ((document.querySelector('.grid__search-like-icon use').getAttribute('id')) === id) {
        document.querySelector('.grid__search-like-icon use').setAttribute('href', `img/sprite.svg#${iconString}`);
    }

}

/*
export const toggleLikesMenu = numLikes => {
    elements.likeIcon.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}
*/

export const renderLike = likes => {
    const id = likes.id.toString().substr(0, likes.id.length - 3);
    console.log(id);
    const markup =
    `
        <li>
            <a id="${id}a99" class="likes__link">
                <figure class="likes__fig">
                    <img src=${likes.imgUrl} alt="#" class="likes__img">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitHotelTitle(likes.title)}</h4>
                    <p class="likes__price">${likes.address}</p>
                </div>
                <svg class="likes__delete" data-id="${id}d99">
                    <use xlink:href="img/sprite.svg#icon-trash"></use>
                </svg>
            </a>
        </li>
    `

    elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    console.log(`${id} from deleteLike`);
    const index = document.querySelector(`.likes__link[id="${id}a99"]`).parentElement;
    index.parentElement.removeChild(index);
}

export const deleteLikeItem = id => {
    console.log(`${id} from deleteLike`);
    const index = document.querySelector(`.likes__link[id="${id}a99"]`).parentElement;
    index.parentElement.removeChild(index);
}


