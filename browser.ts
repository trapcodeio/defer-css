import {
    deferCss,
    deferCssData,
    getStyleSheetProperty,
    getStyleSheet,
    hasStyleSheet
} from "./index.js";

// add properties to window
declare global {
    interface Window {
        deferCss: typeof deferCss;
        deferCssData: typeof deferCssData;
        getStyleSheetProperty: typeof getStyleSheetProperty;
        getStyleSheet: typeof getStyleSheet;
        hasStyleSheet: typeof hasStyleSheet;
    }
}

window.deferCss = deferCss;
window.deferCssData = deferCssData;
window.getStyleSheetProperty = getStyleSheetProperty;
window.getStyleSheet = getStyleSheet;
window.hasStyleSheet = hasStyleSheet;
