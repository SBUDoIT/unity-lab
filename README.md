## About Unity Lab
The purpose of this project is to provide a set of flexible and reusable UI components designed to work across browsers, devices and screen sizes. This project is meant to be platform agnostic, meaning it should work equally well across different CMS platforms as well as on static sites.

The project is maintained by DoIT Communications staff, primiarly for use on projects we manage, but we see value in sharing our work and collaborating with the University at large as such we will make regular releases and keep the source code available through our GitHub.

We use a variety of open source technologies and methodologies to help keep us inline with industry and design trends. These technologies include: SASS, GULP, Pattern Lab, Web Fonts and several opensource CSS and JS Libraries including Bootstrap, AnimateCSS, and Breakpoint.

## Demo
You can learn more about the Unity Project, play with our Pattern Lab and get links to sites using it at: https://unity.it.stonybrook.edu

## Requirements

* GIT
* NodeJS v5.7.1
* NPM 3.6.0

## Getting Started

* Clone Repository
* Run NPM Install in main folder
* Run gulp serve



## Project Layout

### .cert
Self signed cert to allow the pattern lab to be delivered over HTTPS. Certs may need to be added to certificate store
### config
Pattern Lab Configuration Files. Do not edit
### core
Pattern Lab Core Files. Do not edit
### extras
Pattern Lab Folder. Not Required. Do not edit
### node_modules
Dependencies loaded from running npm install. No need to edit
### public
This is where the compiled HTML, CSS and JS gets copied / served. Do not edit the files in here.
### releases
When a new release is cut, the compiled assets get copied here in a versioned folder
### source
* \_data -- Folder that contains sample data and other json objects used to generate SASS and the library.
* \_patterns -- Folder that contains the HTML/Mustache Templates used to generate Pattern Lab
* placeholders -- Images, video and other media used in templates but not meant to be included in library.
* src_fonts -- Web Fonts / Icon Sets Included in Project
* src_images -- Images that are meant to be included and distributed in library. Typically logos, favicons, backgrounds, textures, icons and other common UI imagery
* src_js -- Javascript files and libraries split into header/footer sub folders based on where the JS can be included.
* src_scss -- SASS based CSS files and libraries
### vendor
Composer based folder for downloading required PHP Libraries. Do Not Edit. May not be included.

## Important Files

* gulpfile.js -- This is the gulp script that compiles our SASS to CSS, aggregates our JS, minifies our production files and acts as our build process. You shouldn't edit this.
* gulp.config.json / gulp.config.local.json -- Editable configuration that feeds into gulp process
* composer.json -- Node Packages and versions required for this project. Don't edit.
* .gitignore -- Configured to not include compiled assets into repository.
