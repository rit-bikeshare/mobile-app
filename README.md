## RIT BikeShare mobile app
This is the react native BikeShare mobile app.
It uses Expo for the build system which allows for surprisingly easy testing.

### Setup
you need yarn for this so if you don't have it already, install it globally:
```
$ sudo npm install -g yarn
```

install deps:
```
$ yarn install
```
and that's it.

### Run
To run the application just run:
```
$ yarn start
```
This will output a qr code that you scan with the expo app:

- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

- [IOS](https://itunes.apple.com/app/apple-store/id982107779)

### Tests
We use jest and enzyme to run our tests. Just run them with:
```
$ yarn test
```

### Dev
It might be a good idea to also get the XDE from Expo for all your debugging needs.

You can get it at [expo.io/tools](https://expo.io/tools)

#### debugging
This is where things get a bit tricky. However, you should be able to get a nice debugging setup up and running with just a few commands. This guide is osx specific, trying this on windows will not work. You might be able to get somewhere with linux. Unfortunately that's really just the world we live in when it comes to front-end programming.

- Make sure you installed the XDE from expo.

- Open the project in XDE with the `Open existing project...` button.

- Install `react-native-debugger`:
```
$ brew update && brew cask install react-native-debugger
```

Things split off on a per device basis here.

##### IOS
This one is actually really easy.
- Download and install xcode from the mac app store.

Yes you have to be on a mac to use this.

Once that is finished
- Run the project in XDE and select `Device` on the top right of the app and select `Open on iOS simulator` from the dropdown.

This should run an ios simulator and install the expo app on the device.

If the app doesn't show up on it's own, find and launch the expo app.

Now we need to connect our debugger. Starting with XDE.
- Click the gear icon next to the input that has something like `exp://zs-fqm.<username>.bikeshare.exp.direct:80` in it
- In the host flyout in the dropdown that appears, select `LAN`
- Make sure that `Development Mode` has a check mark next to it (it's in the same dropdown)

Now over to the emulator.
- Open the dev menu if you haven't already with `cmd-d`
- Select `Debug Remote JS`
- If a browser window/tab opens, close it
- run the command `open "rndebugger://set-debugger-loc?host=localhost&port=19001"`

If you follow those steps, react-native-debugger should open and connect to the ios emulator.

From here, if you want to click on and inspect elements, you can open the dev menu and select `Toggle Element Inspector`.

Unfortunately there's not a good way to test on an actual device.

##### Android
###### Physical Device
This one is easyish.

- Install the [expo app](https://play.google.com/store/apps/details?id=host.exp.exponent) on your device
- Run the project in XDE and select `Share` on the top right of the app.
- Open the Expo app on your device
- Scan the barcode from XDE with the `Scan QR Code` option on your device.

This should get the package to build and get the app running on your device.

Now to connect the debugger. Starting with XDE.
- Click the gear icon next to the input that has something like `exp://zs-fqm.<username>.bikeshare.exp.direct:80` in it
- In the host flyout in the dropdown that appears, select `LAN`
- Make sure that `Development Mode` has a check mark next to it (it's in the same dropdown)

Now over to your device.
- Make sure the Expo app with the compiled app is still running
- Shake the device side to side. Not back and forth, side to side.
- Observe the dev menu
- Select `Debug Remote JS`

Back to your computer
- If a browser window/tab opens, close it
- run the command `open "rndebugger://set-debugger-loc?host=localhost&port=19001"`

If you follow those steps, react-native-debugger should open and connect to your android device. If you are having trouble, I've found that closing XDE and the app and starting from scratch is really the only way to get it to start working.

From here, if you want to tap on and inspect elements, you can open the dev menu and select `Toggle Element Inspector`.
