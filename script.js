const CLICK_MOVEMENT_THRESHOLD = 5;

function navigationDragSlidePointerStart(e) {
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
        element.setAttribute("aria-valuenow", percentage);
    };

    const pointerup = e => {
        e.preventDefault();
        if(isClick) {
            let percentage = Math.min(Math.max(e.offsetX / width, 0), 100);
            element.style.setProperty("--percentage", percentage);
            element.setAttribute("aria-valuenow", percentage);
        }

        element.removeEventListener("pointermove", pointermove);
        element.removeEventListener("pointerup", pointerup);
        element.releasePointerCapture(e.pointerId);
    };

    element.addEventListener("pointermove", pointermove);
    element.addEventListener("pointerup", pointerup);
}

function navigationDragSliderKeyboard(e) {
    if(e.key === "ArrowLeft") {
        const element = e.target;
        const currentValue = parseFloat(element.style.getPropertyValue("--percentage")) || 0.5;
        const nextValue = Math.max(currentValue - 0.1, 0);
        element.style.setProperty("--percentage", nextValue);
        element.setAttribute("aria-valuenow", nextValue);
    } else if(e.key === "ArrowRight") {
        const element = e.target;
        const currentValue = parseFloat(element.style.getPropertyValue("--percentage")) || 0.5;
        const nextValue = Math.min(currentValue + 0.1, 1);
        element.style.setProperty("--percentage", nextValue);
        element.setAttribute("aria-valuenow", nextValue);
    }
}

function navigationCustomSliderPointerStart(e) {
    const element = e.target;
    element.setPointerCapture(e.pointerId);

    const width = element.getBoundingClientRect().width;

    const pointermove = e => {
        e.preventDefault();
        let percentage = Math.min(Math.max(e.offsetX / width, 0), 100);
        element.style.setProperty("--percentage", percentage);
        element.setAttribute("aria-valuenow", percentage);
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

function navigationCustomDynamicSliderPointerStart(e) {
    const element = e.target;
    element.setPointerCapture(e.pointerId);

    const width = element.getBoundingClientRect().width;

    let pointermove;
    let pointerup;

    if(width > 250) {
        pointermove = e => {
            e.preventDefault();
            let percentage = Math.min(Math.max(e.offsetX / width, 0), 100);
            element.style.setProperty("--percentage", percentage);
            element.setAttribute("aria-valuenow", percentage);
        };
        pointermove(e);

        pointerup = e => {
            e.preventDefault();
            element.removeEventListener("pointermove", pointermove);
            element.removeEventListener("pointerup", pointerup);
            element.releasePointerCapture(e.pointerId);
        };
    } else {
        const startX = e.offsetX;
        let value = parseFloat(element.style.getPropertyValue("--percentage")) + 0.001;
        let startValue;
        if(isNaN(value)) {
            startValue = 0.5;
        } else {
            startValue = value;
        }
        let isClick = true;

        pointermove = e => {
            e.preventDefault();
            let movement = startX - e.offsetX;
            if(Math.abs(movement) > CLICK_MOVEMENT_THRESHOLD) {
                isClick = false;
            }
            let percentage = Math.min(Math.max(movement / width + startValue, 0), 1);
            element.style.setProperty("--percentage", percentage);
            element.setAttribute("aria-valuenow", percentage);
        };

        pointerup = e => {
            e.preventDefault();
            if(isClick) {
                let percentage = Math.min(Math.max(e.offsetX / width + startValue - 0.5, 0), 1);
                element.style.setProperty("--percentage", percentage);
                element.setAttribute("aria-valuenow", percentage);
            }

            element.removeEventListener("pointermove", pointermove);
            element.removeEventListener("pointerup", pointerup);
            element.releasePointerCapture(e.pointerId);
        };
    }

    element.addEventListener("pointermove", pointermove);
    element.addEventListener("pointerup", pointerup);
}

function navigationCustomSliderKeyboard(e) {
    if(e.key === "ArrowLeft") {
        const element = e.target;
        const currentValue = parseFloat(element.style.getPropertyValue("--percentage")) || 0.5;
        const nextValue = Math.max(currentValue - 0.1, 0);
        element.style.setProperty("--percentage", nextValue);
        element.setAttribute("aria-valuenow", nextValue);
    } else if(e.key === "ArrowRight") {
        const element = e.target;
        const currentValue = parseFloat(element.style.getPropertyValue("--percentage")) || 0.5;
        const nextValue = Math.min(currentValue + 0.1, 1);
        element.style.setProperty("--percentage", nextValue);
        element.setAttribute("aria-valuenow", nextValue);
    }
}
