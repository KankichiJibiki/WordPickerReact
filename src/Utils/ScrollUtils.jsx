import { scroller } from 'react-scroll';

export const scrollToEle = (element, durationTime = 800, delayTime = 0) => {
    scroller.scrollTo(element, {
        duration: durationTime,
        delay: delayTime,
        smooth: 'easeInOutQuart'
    });
};
