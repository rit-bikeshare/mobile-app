# Travis
We use travis for our CI for our build and deploy. Every deploy made with a version number will automatically deploy on travis.

## Making a new version
Making a new version of the bike share app is easy. All you have to do is use the `version` command.
```bash
$ yarn version
```
This will prompt you to input a new version number.

### The difference between major and minor versions
Major versions should be changes that add new features or make large changes to existing features.

Minor versions should be all other changes like bug fixes and the like.

## Testing
Tests will run on all prs and master.
