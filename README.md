## modern-promoted-links

This is a promoted links web part for the Modern SharePoint experience built with React and the Office-UI-Fabric.  This web part is compatible with both the Modern and Classic SharePoint experience.  

### Features
* Wrapped promoted link tiles.
* Promoted Links list picker dropdown in the property pane panel (uses @pnp/spfx-property-controls).
* Placeholder and Spinner elements to handle unconfigured web parts and empty lists.
* Links configured to open in current window or in new tab based on Launch Behavior selection in the Promoted Links list. 
  * "Dialog" selections will open in a new tab. 

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

### Demos

#### Adding Web Part to a Modern Page
![Full Demo of the Modern Promoted Links](/src/assets/ModernPromotedLinks.gif)

---

#### Adding Web Part to a Classic Page
![Full Demo of the Modern Promoted Links in a classic page](/src/assets/ModernPromotedLinksClassic.gif)


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

