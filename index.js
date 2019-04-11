// @ts-check

let deferCssData = {};

/**
 * @param {*[]} links
 * @param {string|object} [mountOn]
 */
const deferCss = function (links, mountOn) {
    // Setup Config default Values.
    if (mountOn === undefined) mountOn = 'defer-css';

    deferCssData[mountOn] = {
        total: links.length,
        loaded: 0
    };

    for (let i = 0; i < links.length; i++) {
        let linkData = links[i];

        // if link change to object
        if (typeof linkData === 'string')
            linkData = {href: linkData};

        let linkDataKeys = Object.keys(linkData);
        let newLink = document.createElement('link');

        newLink.rel = 'stylesheet';

        for (let j = 0; j < linkDataKeys.length; j++) {
            let scriptKey = linkDataKeys[j];

            // crossorigin spelt with lowercase helper.
            if (scriptKey === 'crossorigin') {
                newLink['crossOrigin'] = linkData[scriptKey];
            } else {
                newLink[scriptKey] = linkData[scriptKey];
            }

        }

        // Setup Onload Function
        if (typeof linkData['onload'] === "function") {
            // Load User defined function after incrementing loaded
            newLink.onload = function () {
                deferCssData[mountOn].loaded++;
                linkData.onload(linkData)
            }
        } else {
            // Increment loaded after each load
            newLink.onload = function () {
                deferCssData[mountOn].loaded++;
            }
        }

        // Check if mountOn Element Exists
        let firstLink = document.getElementById(mountOn);

        if (firstLink === null) {
            // Log Error if not exists.
            return console.error('DEFER-CSS: no link element with id: <' + mountOn + '> found in DOM');
        }
        // @ts-ignore
        firstLink.parentNode.insertBefore(newLink, firstLink);
    }

    const mountOnElement = document.getElementById(mountOn);
    if (mountOnElement !== null) mountOnElement.remove();
};

window['deferCss'] = deferCss;
window['deferCssData'] = deferCssData;

