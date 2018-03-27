rm -f ../.git/hooks/pre-commit
rm -f ../.git/hooks/pre-push
prepush -c package.json remove && node node_modules/husky/bin/install
