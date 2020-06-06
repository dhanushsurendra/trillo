import axios from 'axios';
import { key, proxy } from '../config';

export default class Photos {
    constructor() {
        this.queryImage = 'hotel rooms';
    }

    async getImage() {
        try {
            //Images from unsplash api
            const res = await axios(`${proxy}https://api.unsplash.com/search/photos/?page=1&query=${this.queryImage},hotels&orientation=portrait&per_page=40&client_id=${key}`);
            this.results = res.data.results;
            console.log(this.results);
        } catch (error) {
            alert('Something went wrong');
            console.log(error);
        }
    }

    getUrl() {
        return this.results.map(el => el.urls.small);
    }
}