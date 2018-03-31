GIT_ROOT="$(git rev-parse --show-toplevel)"
PRECOMMIT_HOOK="$GIT_ROOT/.git/hooks/pre-commit"

if [ -f $PRECOMMIT_HOOK ]; then
  echo "Githooks are installed! 👌";
  exit 0;
else
  echo;
  echo "😱  😱  😱";
  echo;
  echo "Githooks aren't installed. Run \`yarn install\` or \`yarn fix-githooks\` from $GIT_ROOT to proceed!";
  echo;
  echo "😱  😱  😱";
  echo;
  exit 1;
fi
