## Welcome to BikeShare!

BikeShare is a react native application which allows us to build the same code base into both native Android and IOS applications. If you aren't already familiar with react native, the [official docs](https://facebook.github.io/react-native/) are a good place to start.

### Cloning the repository
If you haven't already set up your github account to authenticate with an ssh key, now is a good time to do it; [here's a guide](https://help.github.com/articles/connecting-to-github-with-ssh/).

Once you have your ssh up and running, run this in the dir you want to work in:
```bash
$ git clone git@github.com:rit-bikeshare/mobile-app.git
```

### Installing deps
You'll have to do this any time the project deps change. If you just cloned the repo, you need to run this to fetch all of the deps.

**intermediary step:** [Install yarn](https://yarnpkg.com/lang/en/docs/install/), 
it's a lot faster than npm and helps us keep our dependencies correctly synced.

```bash
$ cd mobile-app
$ yarn install
```

### Running

It's simple:
```bash
$ yarn start
```
this should start `exp` (exponents cli tool) and give you a qr code to scan with their client app:
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [IOS](https://itunes.apple.com/app/apple-store/id982107779)

It also may request that you create an account, go ahead and do that.
