// @ts-check

let deferCssData = {};

/**
 * @param {*[]|string} links
 * @param {string|object} [mountOnId]
 */
const deferCss = function (links, mountOnId) {
    // Setup Config default Values.
    if (mountOnId === undefined) mountOnId = 'defer-css';
    if (typeof links === 'string') links = [links];

    deferCssData[mountOnId] = {
        total: links.length,
        loaded: 0
    };

    for (let i = 0; i < links.length; i++) {
        let linkData = links[i];

        // if link change to object
        if (typeof linkData === 'string')
            linkData = {href: linkData};

        let newLink = document.createElement('link');

        newLink.rel = 'stylesheet';

        // Functions
        // Setup Onload Function
        if (typeof linkData['onload'] === "function") {
            // Load User defined function after incrementing loaded

            newLink.onload = function () {
                deferCssData[mountOnId].loaded++;
                linkData.onload(linkData);
            };
        } else {
            // Increment loaded after each load
            newLink.onload = function () {
                deferCssData[mountOnId].loaded++;
            }
        }

        const ignoreKeys = ['onload'];

        // Other Properties
        let linkDataKeys = Object.keys(linkData);
        for (let j = 0; j < linkDataKeys.length; j++) {
            let scriptKey = linkDataKeys[j];

            // crossorigin spelt with lowercase helper.
            if (scriptKey === 'crossorigin') {
                newLink['crossOrigin'] = linkData[scriptKey];
            } else {
                if (!ignoreKeys.includes(scriptKey)) {
                    newLink[scriptKey] = linkData[scriptKey];
                }
            }

        }

        // Check if mountOnId Element Exists
        let firstLink = document.getElementById(mountOnId);

        if (firstLink === null) {
            // Log Error if not exists.
            return console.error('DEFER-CSS: no link element with id: <' + mountOnId + '> found in DOM');
        }
        // @ts-ignore
        firstLink.parentNode.insertBefore(newLink, firstLink);
    }

    const mountOnIdElement = document.getElementById(mountOnId);
    if (mountOnIdElement !== null) mountOnIdElement.remove();
};

/**
 *  Check if style sheet exists in dom.
 * @param {string} search - string to search
 * @param {boolean|string} [$return] - What to return (Default: Boolean)
 */
const hasStyleSheet = function (search, $return) {
    if ($return === undefined) $return = false;

    const allStyles = document.styleSheets;
    for (let i = 0; i < allStyles.length; i++) {
        let styleSheet = allStyles[i];
        if (styleSheet.href !== null) {
            let hasStyle = styleSheet.href.includes(search);

            // if has style and $return is string
            if (hasStyle) {
                if (typeof $return === 'string') {
                    // if $return is all we return the CSSStyleSheet Object
                    if ($return === 'all') {
                        return styleSheet;
                    } else {
                        // else we assume $return is a key and return that key if exists.
                        if (typeof styleSheet[$return] !== "undefined")
                            return styleSheet[$return];
                    }
                } else {
                    // else we return the results.
                    return hasStyle;
                }
            }
        }
    }

    return false;
};

window['deferCss'] = deferCss;
window['deferCssData'] = deferCssData;
window['hasStyleSheet'] = hasStyleSheet;