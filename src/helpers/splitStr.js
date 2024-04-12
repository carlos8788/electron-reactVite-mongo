import { toCapitalize } from "./capitalizeStr";

export const splitStr = (str='') => {
    if (str.includes(' ')){
        return str.split(' ').map(data => toCapitalize(data)).join(' ');
    }
    return toCapitalize(str)
}