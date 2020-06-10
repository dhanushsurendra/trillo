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

    getID() {
        return this.results.map(el => el.id);
    }

    getSearchLength() {
        if(this.results.length === 0) {
            displayNoResult();
        }

        return this.results.length;
    }
}
