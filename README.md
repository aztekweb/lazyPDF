# Aztek Lazy PDF Cover Image Loader
Aztek Internal script for lazy loading images served from [Pdf fileformat for ImageProcessor](https://github.com/dampee/ImageProcessor.Plugins.Pdf)

What is ImageProcessor Plugin?
>The ImageProcessor Plugin gives you the ability to preview the first page of a PDF file on your web page.  It uses [GhostScript.Net](https://github.com/jhabjan/Ghostscript.NET) as a managed wrapper for [GhostScript](https://ghostscript.com/).  

Why use Lazy PDF
> ...Ghostscript does not handle requests from multiple processes.

Pages with multiple PDF images will throw 500 Internal errors if Ghostscript is processing another file.  This script will async/await functions to load only 1 image at a time.

----

## Contents
| **File** | **Use** |
| -------- | ------- |
| src/lazypdf.js | ES2017 code, includes import for [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill/) to fill in missing `regeneratorRuntime` generated from babel transpiling |
| dist/lazypdf.min.js | Minified version of ES2017 source - manually created and moved via VS Code [JS & CSS Minifier](https://github.com/olback/es6-css-minify.git) |
| dist/lazypdf.bundle.min.js | Full bits, minified, Babel transpiled and Webpack built.  Use this for full cross browser support |

## Usage / Examples
The following examples will use a sample application structure like
```
site
-assets
|--placeholder-pdf.png

-content
|--Brochure1.pdf
|--Brochure2.pdf
|--Brochure3.pdf

-scripts
|--lazypdf.min.js
|--lazypdf.bundle.min.js
```

### Requirements
- Set the image `data-src` to pdf resource with the `format` query string
- Add the `lazypdf` class

### Simple View
- Set a default placeholder image to prevent an empty image while loading/in the event of an error
- Reference the full bundled script
```
<div class="brochure-listing">
    <div class="col-md-3 col-sm-6 text-center mb-5">
        <a href="/content/Brochure1.pdf" target="_blank">
            <img data-src="/content/Brochure1.pdf?format=jpg&width=300" class="lazypdf" src="/assets/placeholder-pdf.png" alt="PDF Brochure"/>
        </a>
    </div>
    <div class="col-md-3 col-sm-6 text-center mb-5">
        <a href="/content/Brochure1.pdf" target="_blank">
            <img data-src="/content/Brochure2.pdf?format=jpg&width=300" class="lazypdf" src="/assets/placeholder-pdf.png" alt="PDF Brochure"/>
        </a>
    </div>
        <div class="col-md-3 col-sm-6 text-center mb-5">
        <a href="/content/Brochure1.pdf" target="_blank">
            <img data-src="/content/Brochure3.pdf?format=jpg&width=300" class="lazypdf" src="/assets/placeholder-pdf.png" alt="PDF Brochure"/>
        </a>
    </div>
</div>

<script type="text/javascript" src="/scripts/lazypdf.bundle.min.js"></script>
```

#### Feature detection loading
The polyfilled file will come in fairly sizeable at 230KB and 91KB minified.  In order to avoid the overhead on browsers that are currently supporting async/await, use a [custom modernizr script](https://modernizr.com/download/?generators-promises-setclasses) to detect ES6 Generators and ES6 Promises and load appropriately

** Be sure to remove `import "babel-polyfill";` if including the _lazypdf.min.js_ file in your project

```
[View Code]

<script type="text/javascript" src="/scripts/modernizr-custom.js"></script>

<script>
//relies on jQuery to dyanmically load a script
(function () {
    if ((Modernizr.promises && Modernizr.generators)) {
        $.getScript("/scripts/lazypdf.min.js", () => { });
    } else {
        $.getScript("/scripts/lazypdf.bundle.min.js", () => { });
    }
})();
</script>
```

---
## Using, Updating, Contributing to this project in VS Code

#### Initial Machine Setup
1. **Install [Node 6 or newer](https://nodejs.org)**. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
2. **Clone this repository.** - `git clone https://github.com/aztekweb/lazyPdf.git` or [download the zip](https://github.com/aztekweb/lazyPdf/archive/master.zip)
3. **Make sure you're in the directory you just created.** - `cd lazyPdf`
4. **Install Node Packages.** - `npm install`

#### Updates
**Build a new lazypdf.bundle.min.js** - `npm run build`

## Technologies
> Disclaimer, I borrowed these descriptions and links from [Cory House](https://github.com/coryhouse/react-slingshot)

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](https://webpack.js.org) | Bundles npm packages and our JS into a single file. | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)|
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction), [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |

## Development Dependencies
| **Dependency**                    | **Use**                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| babel-cli                         | Babel Command line interface                                                                              |
| babel-core                        | Babel Core for transpiling the new JavaScript to old                                                      |
| babel-loader                      | Adds Babel support to Webpack                                                                             |
| babel-plugin-transform-runtime    |                                                                                                           |
| babel-polyfill                    | Polyfill for Babel features that cannot be transpiled                                                     |
| babel-preset-env                  | Babel preset for running all the latest standardized JavaScript features                                  |
| npm-run-all                       | Display results of multiple commands on single command line                                               |
| uglifyjs-webpack-plugin           |                                                                                                           |
| webpack                           | Bundler with plugin system and integrated development server                                              |
| webpack-cli                       |                                                                                                           |
