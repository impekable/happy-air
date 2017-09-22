# Happy Air

[![Happy Air Animated Demo](https://raw.github.com/impekable/happy-air/master/happy_air_demo_v3.gif)](https://raw.github.com/impekable/happy-air/master/happy_air_demo_v3.mp4)

## Synopsis

Simulate an airplane boarding experience where a conflict of seats is raised.  Through intelligent communication of flight crew (NodeJS) and passengers (iOS), quick resolution can be reached through a plane wide auction, dramatically reducing overhead in selection and improving passenger engagement in the process.

## Motiviation

Following the public interest and outcry surrounding the [United passenger being forcibly removed from an airplane](http://www.foxnews.com/travel/2017/04/27/dragged-united-passenger-settles-with-airline-for-undisclosed-amount.html), Impekable presented Happy Air as an approach for airlines to interact with their customers more directly, bringing more involvement and making the overall process more rewarding for all involved.  This product also serves to demonstrate a use of Twilio's Sync service and generate example of Impekable's output.

## Installation

Each language base has its own supporting libraries and the instructions for each are listed below.  Additional notes may be found in each respective folder.

### NodeJS

The NodeJS utilizes React and Webpack, so requires some dependencies.  The repository does not provide a pre-built backend system, so requires an initial build for it may be served.  If you experience runtime issues, clean build artifacts, run `npm build` and then try again.  Webpack should monitor for changes while served, so content updates while be pushed automatically in most cases.

```shell
$ cd web
$ npm install
...
$ npm build
...
$ npm serve
```

### iOS

The iOS package requires references from CocoaPods for its dependencies.  Once the appropriate pods are installed, open the `xcworkspace` file and not the `xcodeproj` to properly reference these libraries.

```shell
$ cd ios/Divided
$ pod install
...
$ open -a "/Applications/Xcode.app" Divided.xcworkspace
```

## Release History

* 1.0.0:
  * Initial Release

# ![Impekable](https://impekable.com/wp-content/uploads/2017/03/impekable-logo-new.png)
[ <img src="https://impekable.com/wp-content/uploads/2016/10/favicon-32x32.png" alt="Impekable on the Web" height=24px width=24px/>](https://www.impekable.com) [<img src="https://pbs.twimg.com/profile_images/882647123602231296/vxH3PQvy_normal.jpg" alt="@BeImpekable on Twitter" height=24px width=24px/>](https://twitter.com/beimpekable) [<img alt="Impekable on Facebook" src="https://research.fb.com/wp-content/themes/fb-research/images/gui/facebook.ico" height=24px width=24px/>](https://www.facebook.com/Impekable/) [<img alt="Impekable on Dribbble" src="https://cdn.dribbble.com/assets/favicon-63b2904a073c89b52b19aa08cebc16a154bcf83fee8ecc6439968b1e6db569c7.ico" height=24px width=24px/>](http://www.dribbble.com/impekable) [<img alt="Impekable on Clutch" src="https://static2.clutch.co/sites/all/themes/clutch2/favicon.png" height=24px width=24px/>](https://clutch.co/profile/impekable) [<img alt="Impekable E-mail" src="https://www.google.com/gmail/about/images/favicon.ico" height=24px width=24px/>](mailto:sales@impekable.com)