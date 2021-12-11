import { APARTMENT_IMAGE_URL } from "settings/constant";

const imageDefault = `https://i.pinimg.com/564x/6c/d7/fe/6cd7fe3d3a9952e5667e13af9fff0c17.jpg`;

export const apartmentImageFisrt = (apartment) => {
    if (apartment != null) {
        if (apartment.images != null) {
            const image = `${APARTMENT_IMAGE_URL}/${apartment.images[0]}`
            return image
        } else {
            return imageDefault;
        }
    } else {
        return imageDefault;
    }
}

export const getImagePath = (path) => {
    if(path != null) {
        return `${APARTMENT_IMAGE_URL}/${path}`;
    } else {
        return imageDefault
    }
} 