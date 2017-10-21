VERSION=$(prettier -v)

if [[ $(git --no-pager grep "\"prettier\":\s\+\"$VERSION\"" package.json) ]]
then
  echo "prettier@$VERSION is up-to-date."
  exit
else
  echo "prettier@$VERSION is outdated! Run \`npm install\` to get the correct version."
  exit 1
fi
