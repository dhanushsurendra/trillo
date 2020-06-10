import { elements } from './base';

export const toggleLikeBtn = (isLiked, id) => {
    const domElement = document.getElementById(`${id}a23`);
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    domElement.setAttribute('href', `img/sprite.svg#${iconString}`);

    /*

    console.log(document.querySelector('.grid__search-like-icon use').getAttribute('id'));
    if ((document.querySelector('.grid__search-like-icon use').getAttribute('id')) === id) {
        document.querySelector('.grid__search-like-icon use').setAttribute('href', `img/sprite.svg#${iconString}`);
    }
    */

}

/*
export const toggleLikesMenu = numLikes => {
    elements.likeIcon.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}
*/

/*
export const renderLike = likes => {
    const markup =
        `
        <li>
            <a href=${likes.id} class="likes__link">
                <figure class="likes__fig">
                    <img src="img/adventure-1.jpg" alt="#" class="likes__img">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${likes.name}</h4>
                    <p class="likes__price">$1500</p>
                </div>
                <svg class="likes__delete">
                    <use xlink:href="img/sprite.svg#icon-trash"></use>
                </svg>
            </a>
        </li>
    `

    elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    const index = document.querySelector(`.likes__link[href="${id}a23"]`).parentElement;
    index.parentElement.removeChild(index);
}
*/