export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, imgUrl, title, address) {
        const like = {
            id,
            imgUrl,
            title,
            address
        }
        this.likes.push(like);
        console.log(this.likes.length);
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) != -1;
    }

    getNumLikes() {
        //console.log(this.likes.length);
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
   }

   readStorage() {
       const storage = JSON.parse(localStorage.getItem('likes'));
       if(storage) this.likes = storage;
   }
}