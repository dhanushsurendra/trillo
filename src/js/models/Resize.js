export const resize = (image, id) => {
    let width = image.width();
    let height = image.height();
    const maxWidth = 250;
    const maxHeight = 180;
    let ratio = 0;

    if(width > maxWidth && width > height) {
        ratio = width / height;
    }
}