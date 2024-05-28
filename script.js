const CLICK_MOVEMENT_THRESHOLD = 5;

function navigationDragSlideStart(e) {
    const element = e.target;
    e.preventDefault();
    element.setPointerCapture(e.pointerId);

    const width = element.getBoundingClientRect().width;

    const startX = e.offsetX;
    const startValue = parseFloat(element.style.getPropertyValue("--percentage")) || 0.5;

    let isClick = true;

    const pointermove = e => {
        e.preventDefault();
        let movement = e.offsetX - startX;
        if(Math.abs(movement) > CLICK_MOVEMENT_THRESHOLD) {
            isClick = false;
        }
        let percentage = Math.min(Math.max(movement / width + startValue, 0), 100);
        element.style.setProperty("--percentage", percentage);
    };

    const pointerup = e => {
        e.preventDefault();
        if(isClick) {
            let percentage = Math.min(Math.max(e.offsetX / width, 0), 100);
            element.style.setProperty("--percentage", percentage);
        }

        element.removeEventListener("pointermove", pointermove);
        element.removeEventListener("pointerup", pointerup);
        element.releasePointerCapture(e.pointerId);
    };

    element.addEventListener("pointermove", pointermove);
    element.addEventListener("pointerup", pointerup);
}

function navigationCustomSliderStart(e) {
    const element = e.target;
    element.setPointerCapture(e.pointerId);

    const width = element.getBoundingClientRect().width;

    const pointermove = e => {
        e.preventDefault();
        let percentage = Math.min(Math.max(e.offsetX / width, 0), 100);
        element.style.setProperty("--percentage", percentage);
    };
    pointermove(e);

    const pointerup = e => {
        e.preventDefault();
        element.removeEventListener("pointermove", pointermove);
        element.removeEventListener("pointerup", pointerup);
        element.releasePointerCapture(e.pointerId);
    };

    element.addEventListener("pointermove", pointermove);
    element.addEventListener("pointerup", pointerup);
}
