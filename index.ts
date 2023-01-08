export interface DeferredLink extends Partial<HTMLLinkElement> {
    href: string;
    onDefer?: (link: DeferredLink) => void;
}

export const deferCssData: Record<string, { total: number; loaded: number }> = {};
const ignoreKeys = ["onDefer"];

export function deferCss(
    links: string | DeferredLink | (string | DeferredLink)[],
    mountOnId = "defer-css"
) {
    if (mountOnId === void 0) mountOnId = "defer-css";
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

export function hasStyleSheet(search: string) {
    return ___getStyleSheet(search, false) as boolean;
}

export function getStyleSheetProperty<K extends keyof CSSStyleSheet>(search: string, $return: K) {
    return ___getStyleSheet(search, $return) as CSSStyleSheet[K] | undefined;
}

export function getStyleSheet(search: string) {
    return ___getStyleSheet(search, "stylesheet") as CSSStyleSheet | undefined;
}
