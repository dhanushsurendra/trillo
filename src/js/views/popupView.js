export const renderPopup = () => {

    const markup =
     `
        <div class="popup__container">
        <div class="popup__left">
            <div class="popup__left--bottom">
                <img src="img/adventure-3.jpg" alt="" class="popup__img">

                <a class="popup__location" href="#popup__right">
                    <svg class="popup__icon">
                        <use xlink:href="img/sprite.svg#icon-location"></use>
                    </svg>
                </a>

                <ul class="popup__social-icons">
                    <li>
                        <a href="#">
                            <svg class="popup__social-icon">
                                <use xlink:href="img/sprite.svg#icon-twitter"></use>
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a href="#">
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
                        <p class="popup__text">4.5</p>
                    </div>

                    <div class="popup__rating popup__icon-box">
                        <svg class="popup__icon">
                            <use xlink:href="img/sprite.svg#icon-phone"></use>
                        </svg>
                        <p class="popup__text">+91 9108735100</p>
                    </div>

                    <div class="popup__ac popup__icon-box">
                        <svg class="popup__icon">
                            <use xlink:href="img/sprite.svg#icon-air"></use>
                        </svg>
                        <p class="popup__text">5000 rooms of 8000 available</p>
                    </div>

                    <div class="popup__no-ac popup__icon-box">
                        <svg class="popup__icon">
                            <use xlink:href="img/sprite.svg#icon-cross"></use>
                        </svg>
                        <p class="popup__text">3000 rooms of 8000 available</p>
                    </div>
                </div>
            </div>

            <div class="popup__left--top">
                <img src="img/google-maps.jpg" alt="Maps" class="popup__img">
                <div class="popup__cancel">
                    <a href="#">
                        <svg class="popup__cancel-icon">
                            <use xlink:href="img/sprite.svg#icon-cross"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="popup__right" id="popup__right">
            <h3 class="heading-3 heading-3--popup">JW Marriot</h3>
            <div class="popup__cancel">
                <a href="#close">
                    <svg class="popup__cancel-icon">
                        <use xlink:href="img/sprite.svg#icon-cross"></use>
                    </svg>
                </a>
            </div>

            <div class="popup__row">
                <div class="popup__adults">
                    <h4 class="heading-4">Adults:</h4>
                    <div class="popup__adult-details">
                        <button class="popup__buttons">
                            <svg>
                                <use xlink:href="img/sprite.svg#icon-minus"></use>
                            </svg>
                        </button>
                        <input type="number" class="popup__input" value="2" readonly>
                        <button class="popup__buttons">
                            <svg>
                                <use xlink:href="img/sprite.svg#icon-plus"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="popup__children">
                    <h4 class="heading-4">Children:</h4>
                    <div class="popup__adult-details">
                        <button class="popup__buttons">
                            <svg>
                                <use xlink:href="img/sprite.svg#icon-minus"></use>
                            </svg>
                        </button>
                        <input type="number" class="popup__input" value="2" readonly>
                        <button class="popup__buttons">
                            <svg>
                                <use xlink:href="img/sprite.svg#icon-plus"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="popup__checkbox">
                    <label class="popup__label heading-4 popup__align">Extra bed
                        <input type="checkbox" class="popup__checkbox-input">
                        <span class="popup__checkmark"></span>
                        </label>
                </div>
            </div>

            <div class="popup__row">
                <div class="popup__checkin">
                    <h4 class="heading-4">Check in:</h4>
                    <input type="date" class="popup__input-date">
                </div>

                <div class="popup__checkout">
                    <h4 class="heading-4">Check out:</h4>
                    <input type="date" class="popup__input-date">
                </div>

                <div class="popup__noOfDays">
                    <h3 class="heading-4 heading-4--down">No of days:<span
                            class="heading-4 heading-4--light">3</span></h3>
                </div>
            </div>

            <div class="popup__row popup__food">
                <h4 class="heading-4">Food:</h4>
                <div class="popup__checkboxes">
                    <div class="popup__checkbox">
                        <label class="popup__label">breakfast
                            <input type="checkbox" class="popup__checkbox-input">
                            <span class="popup__checkmark"></span>
                            </label>
                    </div>
                    <div class="popup__checkbox">
                        <label class="popup__label">lunch
                            <input type="checkbox" class="popup__checkbox-input">
                            <span class="popup__checkmark"></span>
                            </label>
                    </div>
                    <div class="popup__checkbox">
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
                <h4 class="heading-4">Price:
                    <span class="heading-4 heading-4--light">$1500 (3 days)</span>
                </h4>
                <h4 class="popup__max"><sup>*</sup>Max 5 in room</h4>
            </div>

            <div class="popup__row">
                <a href="#" class="btn btn--pink popup__btn">Book Now</a>
            </div>
        </div>
    </div>

    `
}