import axios from 'axios'
import uniqid from 'uniqid';
import { proxy } from '../config';

export default class search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        try {
            const res = await axios(`${proxy}https://api.jael.ee/datasets/hotels?country=${query}`);

            this.results = res.data;

            this.results.forEach(el => {
                el.id = uniqid();
            });

            console.log(this.results);

        } catch (error) {
            console.log(error);
        }
    }

    getID() {
        return this.results.map(el => el.id);
    }
}
