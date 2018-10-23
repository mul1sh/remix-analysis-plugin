
# remix-analysis-plugin
remix-analysis-plugin integrates remix with analysis tools such as Slither, Manticore and  Mythril. The sooner a solidity developer learns of an issue, the sooner they can understand it and make a correct fix. This plugin reduced the friction in running separate tools by adding a button to run them from within the remix-ide website.

The remix plugin API is based from https://github.com/yann300/remix-plugin


## Usage

* Use http://remix-alpha.ethereum.org/
* Go to Settings, Under plugins fill out this info:
```
{
    "title": "remix-analysis-plugin",
    "url": "http://18.218.104.113/remix-analysis"
}
```
* Click the Load button and you should see remix-plugin-8000 button appear
* Click the remix-plugin-8000 button to load the plugin into a small window
* Now click on the button you would like to perform the analysis

## Setup
If you would like to run the analysis software on your own computer instead of the public one, follow the directions below
* Clone this repository to a server and change directory to it
* `git clone https://github.com/trailofbits/slither`
* `sudo pip3 install mythril`
