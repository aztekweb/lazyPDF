import "babel-polyfill";

/* Aztek Internal script for lazy loading images servered from https://github.com/dampee/ImageProcessor.Plugins.Pdf/ */
(function () {
'use strict';
    const lazyPdfs = Array.from(window.document.getElementsByClassName('lazypdf'));
    if (!lazyPdfs.length) return true;

    lazyPdfs.forEach(lp => {
        const dataSrcAttr = lp.getAttribute('data-src');
        if (typeof dataSrcAttr !== typeof undefined && dataSrcAttr !== false) {
            loadImageFromPDF(lp, dataSrcAttr);
        }
    });
    
    async function loadImageFromPDF(el, src) {
        await asyncloadLazyPDF(el, src);
    }

    function asyncloadLazyPDF(el, src) {
        return new Promise((resolve, reject) => {    
        		el.addEventListener('load', () => { resolve(true); });           
            el.addEventListener('error', reject);
            el.setAttribute('src', src);
        });
    };
})();