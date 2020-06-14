export default class Popup {
    constructor(popupDetails) {
        this.popupDetails = popupDetails;
    }

    getPopupDetails(rating, roomsAvailable, roomPrice) {
        this.acRoom = this.acRooms(this.popupDetails.totalrooms);
        this.nonAcRoom = this.nonAcRooms();
        this.rating = rating;
        this.roomsAvailable = roomsAvailable;
        this.roomPrice = roomPrice;
        this.noOfPeople = 1;
        this.days = 1;
    }

    updateRoomPricing(key) {
        if (key === 'bed') {
            const updateRoomPricing = (0.1 * this.roomPrice) + parseFloat(this.roomPrice, 10);
            this.roomPrice = updateRoomPricing;
            return this.roomPrice.toFixed(2);
            //this.price.push(updateRoomPricing);
        } if (key === 'breakfast') {
            const price = 10;
            const totalBreakfast = (price * this.noOfPeople) + parseFloat(this.roomPrice, 10);
            this.roomPrice = totalBreakfast;
            return this.roomPrice.toFixed(2);
            //const lunch =
        } else if (key === 'lunch' || key === 'dinner') {
            const price = 15;
            const totalFood = (price * this.noOfPeople) + parseFloat(this.roomPrice, 10);
            this.roomPrice = totalFood;
            return this.roomPrice.toFixed(2);
        }

        /* else if (key === 'bed' && state === 'unchecked') {
            this.price.splice(0, 1);
            //this.roomPrice = this.roomPrice - this.price[0];
        } else if (key === 'lunch' && state === 'checked') {
            const updateRoomPricing = (0.1 * this.roomPrice) + this.roomPrice;
            this.roomPrice = updateRoomPricing;
            this.price.push(updateRoomPricing);
        } else if (key === 'lunch' && state === 'unchecked') {
            this.price.splice(1, 1);
            //this.roomPrice = this.roomPrice - this.price[1];
        }
        const price =  this.price.reduce((acc, cur) => { acc + cur }, this.roomPrice);
        console.log(price);


        // if (key === 'bed' && state === 'checked') {
        //     const updateRoomPricing = (0.1 * this.roomPrice) + this.roomPrice;
        //     this.roomPrice = updateRoomPricing;
        //     price.push(updateRoomPricing);
        //     price.splice(1, 1);
        // } else if (key === 'bed' && state === 'unchecked') {
        //     this.roomPrice = this.roomPrice - price[0];
        //     price.splice(0, 1);
        // } else if (key === 'lunch' && state === 'checked') {
        //     const updateRoomPricing = (0.1 * this.roomPrice) + this.roomPrice;
        //     this.roomPrice = updateRoomPricing;
        //     price.push(updateRoomPricing);
        //     price.splice(1, 1);
        // } else if (key === 'lunch' && state === 'unchecked') {
        //     this.roomPrice = this.roomPrice - price[1];
        //     price.splice(0, 1);
        // }
        /*
        case 'breakfast': {
            const updateRoomPricing = ((0.1 * this.roomPrice) + this.roomPrice).toFixed(2);
            this.roomPrice = updateRoomPricing;
            return updateRoomPricing;
        }
        case 'dinner': {
            const updateRoomPricing = ((0.1 * this.roomPrice) + this.roomPrice).toFixed(2);
            this.roomPrice = updateRoomPricing;
            return updateRoomPricing;
        }
        */
    }

    acRooms(totalRooms) {
        const random = Math.round(Math.random().toFixed(2) * 100);
        const number = Math.ceil((random / 100) * totalRooms);
        return number;
    }

    nonAcRooms() {
        return (this.popupDetails.totalrooms - this.acRoom);
    }

    updatePriceDays(days) {
        this.days = days;
        return this.roomPrice = (this.roomPrice * days).toFixed(2);
    }

    updatePeoplePrice(type) {
        if (type === 'inc') {
            this.noOfPeople += 1;
            this.roomPrice += 10;
        } else {
            this.noOfPeople -= 1;
            this.roomPrice -= 10;
        }
        const split = parseFloat(this.roomPrice).toFixed(2);
        //console.log(type === 'inc' ? this.noOfPeople + 1 : this.noOfPeople - 1);
        return [this.noOfPeople.toString(), split];
    }
}

/*

popup = {
                    id: id,
                    phone: el.phone,
                    location: `${el.address.street}, ${el.address.city}`,
                    name: el.name,
                    location: {
                        latitude: el.location.latitude,
                        longitude: el.location.longitude
                    },
                    social: {
                        instagram: el.social.instagram,
                        facebook: el.social.facebook
                    },
                    totalRooms: el.totalrooms,
                    rating: this.rating(),
                    roomsAvailable: this.roomsAvailable(el.totalrooms),
                    roomPricing: this.roomPricing(this.rating(),
                                                  this.roomsAvailable(el.totalrooms),
                                                  el.totalrooms),
                    acRoom: this.acRooms(el.totalrooms),
                    nonAcRooms: function() {
                       return (this.totalRooms - this.acRoom);
                    }

                    */