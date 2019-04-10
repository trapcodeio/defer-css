// @ts-check

let deferCssData = {};

/**
 * @param {object[]} links
 * @param {string|object} config
 */
const deferCss = function (links, config) {
    // Setup Config default Values.
    if (config === undefined) config = 'link';
    if (typeof config !== "object") config = {mountOn: config};
    if (typeof config.name === "undefined") config.name = "default";

    deferCssData[config.name] = {
        total: links.length,
        loaded: 0
    };

    links.reverse();

    for (let i = 0; i < links.length; i++) {
        let linkData = links[i];
        let linkDataKeys = Object.keys(linkData);
        let newLink = document.createElement('link');

        newLink.rel = 'stylesheet';

        for (let j = 0; j < linkDataKeys.length; j++) {
            let scriptKey = linkDataKeys[j];
            newLink[scriptKey] = linkData[scriptKey];
        }

        // Setup Onload Function
        if (typeof linkData['onload'] === "function") {
            // Load User defined function after incrementing loaded
            newLink.onload = function () {
                deferCssData[config.name].loaded++;
                linkData.onload(linkData)
            }
        } else {
            // Increment loaded after each load
            newLink.onload = function () {
                deferCssData[config.name].loaded++;
            }
        }

        // Check if mountOn Element Exists
        let firstLink = document.getElementsByTagName(config.mountOn);

        if (!firstLink.length) {
            // Log Error if not exists.
            return console.error('DEFER-CSS: no element <' + config.mountOn + '> found in DOM');
        }

        firstLink = firstLink[0];

        // @ts-ignore
        firstLink.parentNode.insertBefore(newLink, firstLink);
    }
};

window['deferCss'] = deferCss;
window['deferCssData'] = deferCssData;