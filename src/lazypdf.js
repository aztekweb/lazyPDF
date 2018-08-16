import "babel-polyfill";

(function () {
    const lazyPdfs = Array.from(document.getElementsByClassName('lazypdf'));
    if (!lazyPdfs.length) return true;

    lazyPdfs.forEach(asyncSetupLazyPdf);

    async function asyncSetupLazyPdf(lp) {
        const dataSrcAttr = lp.dataset.src || "";
        const origSrc = lp.src;

        if (typeof dataSrcAttr !== typeof undefined && dataSrcAttr !== false && dataSrcAttr.length) {
            const isSuccess = await asyncloadLazyPDF(lp, dataSrcAttr);
            if (!isSuccess && origSrc.length) {
                lp.setAttribute('src', origSrc);
            }
        }
    }

    async function asyncloadLazyPDF(el, src) {
        try {
            return await handleImageLoad(el, src);
        } catch (err) {
            return false;
        }
    }

    function handleImageLoad(el, src) {
        return new Promise((resolve, reject) => {
            el.addEventListener('load', () => { resolve(true); });
            el.addEventListener('error', reject);
            el.setAttribute('src', src);
        });
    };
})();