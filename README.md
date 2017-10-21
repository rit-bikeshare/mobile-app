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
