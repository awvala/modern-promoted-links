## modern-promoted-links

This is a promoted links web part for the Modern SharePoint experience built with React and the Office-UI-Fabric.  

### SPFx Add-ons and tools
* spfx-property-controls
    * PropertyFieldListPicker
    * PropertyFieldListPickerOrderBy
* spfx-controls-react
    * Placeholder control
* office-ui-fabric-react
    * Spinner, SpinnerSize
    * Image, IImageProps, ImageFit
* SPHttpClient

### Demo

![Full Demo of the Modern Promoted Links](/src/assets/ModernPromotedLinks.gif)

### Building the code

```bash
git clone https://github.com/awvala/modern-promoted-links.git
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
