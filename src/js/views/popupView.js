import { elements } from "./base"

export const clearPopup = () => {
    elements.popup.innerHTML = '';
}

export const renderPopup = (popupDetails, image) => {

    const markup =
        `
    <div class="popup" id="${popupDetails.popupDetails.id}a99">
        <div class="popup__container">
            <div class="popup__left">
                <div class="popup__left--bottom">
                    <img src=${image} alt="" class="popup__img">

                    <a class="popup__location">
                        <svg class="popup__icon">
                            <use xlink:href="img/sprite.svg#icon-location"></use>
                        </svg>
                    </a>

                    <a class="popup__street-view">
                        <svg class="popup__icon-street-view">
                            <use xlink:href="img/sprite.svg#icon-street-view"></use>
                        </svg>
                    </a>

                    <ul class="popup__social-icons">
                        <li>
                            <a href=${popupDetails.popupDetails.social.instagram} target="_blank">
                                <svg class="popup__social-icon">
                                    <use xlink:href="img/sprite.svg#icon-twitter"></use>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="${popupDetails.popupDetails.social.facebook}" target="_blank">
                                <svg class="popup__social-icon">
                                    <use xlink:href="img/sprite.svg#icon-facebook"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>

                    <div class="popup__details">

                        <div class="popup__rating popup__icon-box">
                            <svg class="popup__icon">
                                <use xlink:href="img/sprite.svg#icon-star-full"></use>
                            </svg>
                            <p class="popup__text">${popupDetails.rating}</p>
                        </div>

                        <div class="popup__rating popup__icon-box">
                            <svg class="popup__icon">
                                <use xlink:href="img/sprite.svg#icon-phone"></use>
                            </svg>
                            <p class="popup__text">${popupDetails.popupDetails.phone}</p>
                        </div>

                        <div class="popup__ac popup__icon-box">
                            <svg class="popup__icon">
                                <use xlink:href="img/sprite.svg#icon-air"></use>
                            </svg>
                            <p class="popup__text">${popupDetails.acRoom} of ${popupDetails.popupDetails.totalrooms}</p>
                        </div>

                        <div class="popup__no-ac popup__icon-box">
                            <svg class="popup__icon">
                                <use xlink:href="img/sprite.svg#icon-cross"></use>
                            </svg>
                            <p class="popup__text">${popupDetails.nonAcRoom} of ${popupDetails.popupDetails.totalrooms}</p>
                        </div>

                        <div class="popup__no-ac popup__icon-box">
                        <svg class="popup__icon">
                            <use xlink:href="img/sprite.svg#icon-add-to-list"></use>
                        </svg>
                        <p class="popup__text">${popupDetails.popupDetails.totalrooms}</p>
                    </div>
                    </div>
                </div>

                <div class="popup__left--top-1">
                    <div class="popup__img" id="popup__img-1"></div>
                    <div class="popup__cancel popup__cancel-map">
                            <a>
                                <svg class="popup__cancel-icon">
                                    <use xlink:href="img/sprite.svg#icon-cross"></use>
                                </svg>
                            </a>
                    </div>
                </div>

                <div class="popup__left--top-2">
                    <div class="popup__img" id="popup__img-2"></div>
                    <div class="popup__cancel popup__cancel-street-view">
                        <a>
                            <svg class="popup__cancel-icon">
                                <use xlink:href="img/sprite.svg#icon-cross"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="popup__right" id="popup__right">
                <h3 class="heading-3 heading-3--popup">${popupDetails.popupDetails.name}</h3>
                <div class="popup__cancel">
                    <a href="#close">
                        <svg class="popup__cancel-icon">
                            <use xlink:href="img/sprite.svg#icon-cross"></use>
                        </svg>
                    </a>
                </div>

                <div class="popup__row">
                    <div class="popup__adults">
                        <h4 class="heading-4">No of People:</h4>
                        <div class="popup__adult-details">
                            <button class="popup__buttons popup__button-adult-decrease">
                                <svg>
                                    <use xlink:href="img/sprite.svg#icon-minus"></use>
                                </svg>
                            </button>
                            <input type="number" class="popup__input popup__input-adult" value="1" readonly min="1" max="5">
                            <button class="popup__buttons popup__button-adult-increase" disabled>
                                <svg>
                                    <use xlink:href="img/sprite.svg#icon-plus"></use>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="popup__checkbox">
                        <label class="popup__label popup__label-bed heading-4 popup__align">Extra bed
                            <input type="checkbox" class="popup__checkbox-input">
                            <span class="popup__checkmark"></span>
                        </label>
                    </div>
                </div>

                <div class="popup__row popup__dates">
                    <div class="popup__checkin">
                        <h4 class="heading-4">Check in:</h4>
                        <input type="date" class="popup__input-date popup__input-date-1">
                    </div>

                    <div class="popup__checkout">
                        <h4 class="heading-4">Check out:</h4>
                        <input type="date" class="popup__input-date popup__input-date-2">
                    </div>

                    <div class="popup__noOfDays">
                        <h3 class="heading-4 heading-4--down">No of days: <span
                                class="heading-4 heading-4--light popup__values">1</span></h3>
                    </div>
                </div>

                <div class="popup__row popup__food">
                    <h4 class="heading-4">Food:</h4>
                    <div class="popup__checkboxes">
                        <div class="popup__checkbox">
                            <label class="popup__label popup__label-breakfast">breakfast
                                <input type="checkbox" class="popup__checkbox-input">
                                <span class="popup__checkmark"></span>
                                </label>
                        </div>
                        <div class="popup__checkbox">
                            <label class="popup__label popup__label-lunch">lunch
                                <input type="checkbox" class="popup__checkbox-input">
                                <span class="popup__checkmark"></span>
                                </label>
                        </div>
                        <div class="popup__checkbox popup__label-dinner">
                            <label class="popup__label">dinner
                                <input type="checkbox" class="popup__checkbox-input">
                                <span class="popup__checkmark"></span>
                                </label>
                        </div>
                    </div>
                </div>

                <div class="popup__row">
                    <svg class="popup__icon">
                        <use xlink:href="img/sprite.svg#icon-price-tags"></use>
                    </svg>
                    <h4 class="heading-4">Price: <span class="heading-4 heading-4--light popup__room-price">$${popupDetails.roomPrice}</span>
                    </h4>
                    <h4 class="popup__max"><sup>*</sup>Max 5 in room</h4>
                </div>

                <div class="popup__row">
                    <a href="#close" class="btn btn--pink popup__btn">Book Now</a>
                </div>
            </div>
        </div>
    </div>

    `

    elements.popup.insertAdjacentHTML('afterbegin', markup);
}

export const updatePrice = () => {
    const checkin = new Date(document.querySelector('.popup__input-date-1').value);
    const checkout = new Date(document.querySelector('.popup__input-date-2').value);
    if (parseInt(checkout - checkin) > 0) {
        const days = parseInt((checkout - checkin) / (24 * 3600 * 1000));
        console.log(days);
        if (document.querySelector('.popup__input-date-2')) {
            document.querySelector('.popup__values').textContent = days;
            const newPrice = state.popup.updatePriceDays(days);
            document.querySelector('.popup__room-price').textContent = newPrice;
        } else {
            document.querySelector('.popup__values').textContent = '?';
        }
    } else {
        document.querySelector('.popup__values').textContent = '?';
    }
}
/*
const openMap = () => {
    document.querySelector('#popup__img').style.transform = 'translateY(-100%)';
}
*/

//AIzaSyA-plNVe_BISlUPKPzZYpJTWXhGJWaVgbM