import axios from 'axios'
import uniqid from 'uniqid';
import { proxy } from '../config';
import { displayNoResult } from '../views/base';

export default class search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        try {
            const res = await axios(`https://api.jael.ee/datasets/hotels?country=${query}`);

            this.results = res.data;

            this.results.forEach(el => {
                el.id = uniqid();
                this.title = el.name;
                this.address = `${el.address.street},${el.address.city}`
            });

            console.log(this.results);

            //this.title = res.results.name;
            //this.address = `${res.results.address.street},${res.results.address.city}`

        } catch (error) {
            console.log(error);
        }
    }

    getDetails(id) {
        const res = this.results.find(el => el.id === id);
        return res;
    }

    getID() {
        return this.results.map(el => el.id);
    }

    getSearchLength() {
        if (this.results.length === 0) {
            displayNoResult();
        }

        return this.results.length;
    }

    popupDetails(id) {
        var popup;
        this.results.forEach(el => {
            if (el.id === id) {
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
                }
            }
        });
        return popup;
    }

    rating() {
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

    roomsAvailable(totalRooms) {
        const random = Math.round((Math.random() * 100) + 1);
        const availableRooms = Math.floor((random / 100) * totalRooms);
        return availableRooms;
    }

    roomPricing(rating, availableRooms, totalRooms) {
        const price = (availableRooms / totalRooms) + (rating * 25);
        const tax = 0.18 * price;
        return Math.floor(price + tax);
    }

    acRooms(totalRooms) {
        const random = Math.round(Math.random().toFixed(2) * 100);
        const number = Math.ceil((random / 100) * totalRooms);
        return number;
    }
}
