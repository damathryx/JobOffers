/* eslint-disable new-cap */
import { PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    'md-options': [25],
    'ios-arrow-down-outline': [25],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all([
            // IconName--suffix--other-suffix is just the mapping name in iconsMap
            EvilIcons.getImageSource('search', 40),
            Ionicons.getImageSource('md-list', 30),
            Ionicons.getImageSource('ios-people', 30),
            Ionicons.getImageSource('ios-navigate-outline', 30),
            Ionicons.getImageSource('ios-navigate', 30)]
    ).then(values => {
            iconsMap.search = values[0];
            iconsMap.list = values[1];
            iconsMap.peopleIcon = values[2];
            iconsMap.iosNavigateOutline = values[3];
            iconsMap.iosNavigate = values[4];
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};