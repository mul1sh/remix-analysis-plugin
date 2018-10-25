
# remix-analysis-plugin
remix-analysis-plugin integrates remix with analysis tools such as Slither and  Mythril. The sooner a solidity developer learns of an issue, the sooner they can understand it and make a correct fix. This plugin reduced the friction in running separate tools by adding a button to run them from within the remix-ide website.

The remix plugin API is based from https://github.com/yann300/remix-plugin


## Usage

* Use http://remix-alpha.ethereum.org/
* Go to Settings, Under plugins fill out this info:
```
{
    "title": "Analysis Plugin",
    "url": "http://52.14.164.58"
}
```
* Click the Load button and you should see `Analysis Plugin` button appear
* Click the `Analysis Plugin` button to load the plugin into a small window
* Now click on the button you would like to perform the analysis

## Setup
If you would like to run the analysis software on your own computer instead of the public one, follow the directions below
* Install the solidity compiler in your platform as detailed [here](https://solidity.readthedocs.io/en/latest/installing-solidity.html#)
* Then install python 3.6 and above and also install the [slither](https://github.com/trailofbits/slither#how-to-install) and [mythril](https://github.com/trailofbits/slither#how-to-install) python packages in your system.
*  Finally installed the required node dependencies via `npm i` and then replace the URL of the plugin above, with the URL of where you're hosting the plugin i.e. `http:localhost:3000` . Also make sure there are no paths in the URL as this might prevent the plugin from working correctly
