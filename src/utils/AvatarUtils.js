import { USER_IMAGE_URL } from "settings/constant";

const avatarDefault = `https://i.pinimg.com/564x/6c/d7/fe/6cd7fe3d3a9952e5667e13af9fff0c17.jpg`;

export const userAvatar = (user) => {
    if (user != null) {
        if (user.id != null && user.avatarImage.avatarUrl != null) {
            const avatar = `${USER_IMAGE_URL}/${user.id}/${user.avatarImage.avatarUrl}`
            return avatar
        } else {
            return avatarDefault;
        }
    } else {
        return avatarDefault;
    }
}

export const userBackground = (user) => {
    if (user != null) {
        if (user.id != null && user.avatarImage.backgroundUrl != null) {
            const avatar = `${USER_IMAGE_URL}/${user.id}/${user.avatarImage.backgroundUrl}`
            return avatar
        } else {
            return avatarDefault;
        }
    } else {
        return avatarDefault;
    }
}

export const userAvatarUrl = (id, path) => {
    if (path != null) {
        const avatar = `${USER_IMAGE_URL}/${id}/${path}`
        return avatar
    } else {
        return avatarDefault;
    }
}