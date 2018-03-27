GIT_ROOT="$(git rev-parse --show-toplevel)"
PACKAGE_JSON="$GIT_ROOT/package.json"
VERSION=$("$GIT_ROOT/node_modules/prettier/bin-prettier.js" --version)

if [[ $(git --no-pager grep "\"prettier\":\s\+\"$VERSION\"" $PACKAGE_JSON) ]]
then
  echo "prettier@$VERSION is up-to-date."
  exit
else
  echo "prettier@$VERSION is outdated! Run the following to get the correct version:"
  echo
  echo "    cd $GIT_ROOT && yarn install"
  exit 1
fi
