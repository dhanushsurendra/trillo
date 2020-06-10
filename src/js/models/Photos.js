import axios from 'axios';
import { key, proxy } from '../config';

export default class Photos {
    constructor(pageNumber) {
        this.pageNumber =  pageNumber;
        this.queryImage = 'hotel rooms';
    }

    async getImage() {
        try {
            //Images from unsplash api
            const res = await axios(`https://api.unsplash.com/search/photos/?page=${this.pageNumber}&rel=next&query=${this.queryImage},hotels&per_page=9&orientation=portrait&order_by=relavant &client_id=${key}`);
            this.results = res.data.results;
            console.log(res);
            console.log(res.data.results);
            //console.log(this.pageNumber);
        } catch (error) {
            alert('Something went wrong');
            console.log(error);
        }
    }

    getUrl() {
        return this.results.map(el => el.urls.small);
    }

    getCurrentImage(id) {
        const index = this.results.findIndex(el => el.id === id);
        const urls = this.getUrl();
        return urls[index];
    }
}