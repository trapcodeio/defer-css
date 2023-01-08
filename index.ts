export interface DeferredLink extends Partial<HTMLLinkElement> {
    href: string;
    onDefer?: (link: DeferredLink) => void;
}

export const deferCssData: Record<string, { total: number; loaded: number }> = {};
const ignoreKeys = ["onDefer"];

/**
 * Defer Css Function
 * @param links - Array of links to defer
 * @param mountOnId - Id of the element to mount the links on
 *
 * @example
 * ```javascript
 * deferCss(['main-css-1.css', 'main-css-2.css'], 'main-css');
 * deferCss([
 *     { href: 'other-css-1.css', crossorigin: 'anonymous'},
 *     'other-css-2.css'
 * ], 'other-css');
 * ```
 *
 * This will result to.
 * ```html
 * <link rel="stylesheet" href="main-css-1.css">
 * <link rel="stylesheet" href="main-css-2.css">
 * <style>
 *     .some-style-before-other-css{
 *         background: teal;
 *     }
 * </style>
 * <link rel="stylesheet" href="other-css-1.css" crossorigin="anonymous">
 * <link rel="stylesheet" href="other-css-2.css">
 * ```
 */
export function deferCss(
    links: string | DeferredLink | (string | DeferredLink)[],
    mountOnId = "defer-css"
) {
    if (!Array.isArray(links)) links = [links];
    deferCssData[mountOnId] = { total: links.length, loaded: 0 };

    for (const link of links) {
        let linkData = typeof link === "string" ? { href: link } : link;
        let newLink = document.createElement("link");

        newLink.rel = "stylesheet";

        newLink.onload = function () {
            deferCssData[mountOnId].loaded++;
            if (typeof linkData.onDefer === "function") linkData.onDefer(linkData);
        };

        for (const $scriptKey of Object.keys(linkData)) {
            if (ignoreKeys.includes($scriptKey)) continue;
            const scriptKey = $scriptKey as keyof HTMLLinkElement;
            if ($scriptKey === "crossorigin") {
                newLink.crossOrigin = linkData[scriptKey] as string;
            } else {
                // @ts-ignore
                newLink[scriptKey] = linkData[scriptKey];
            }
        }

        let firstLink = document.getElementById(mountOnId);
        if (firstLink === null) {
            return console.error(
                "DEFER-CSS: no link element with id: <" + mountOnId + "> found in DOM"
            );
        }

        firstLink.parentNode!.insertBefore(newLink, firstLink);
    }
    const mountOnIdElement = document.getElementById(mountOnId);
    if (mountOnIdElement !== null) mountOnIdElement.remove();
}

function ___getStyleSheet(
    search: string,
    $return: "stylesheet" | boolean | keyof CSSStyleSheet = false
) {
    const allStyles = document.styleSheets;
    for (let styleSheet of allStyles) {
        if (styleSheet.href !== null) {
            const hasStyle = styleSheet.href.includes(search);
            if (hasStyle) {
                if (typeof $return === "string") {
                    if ($return === "stylesheet") {
                        return styleSheet;
                    } else {
                        if (typeof styleSheet[$return] !== "undefined") return styleSheet[$return];
                    }
                } else {
                    return hasStyle;
                }
            }
        }
    }
    return false;
}

/**
 * hasStyleSheet - Check if a stylesheet is loaded
 * @param search
 */
export function hasStyleSheet(search: string) {
    return ___getStyleSheet(search, false) as boolean;
}

/**
 * getStyleSheetProperty - Get a stylesheet property, if not found returns undefined
 * @param search
 * @param $return
 */
export function getStyleSheetProperty<K extends keyof CSSStyleSheet>(search: string, $return: K) {
    return ___getStyleSheet(search, $return) as CSSStyleSheet[K] | undefined;
}

/**
 * getStyleSheet - Get a stylesheet, if not found returns undefined
 * @param search
 */
export function getStyleSheet(search: string) {
    return ___getStyleSheet(search, "stylesheet") as CSSStyleSheet | undefined;
}
