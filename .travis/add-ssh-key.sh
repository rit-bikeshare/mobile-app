#!/usr/bin/expect
set -ev
eval $(ssh-agent -s)
set cmd [ssh-add - <<< "${GITHUB_DEPLOY_KEY}"]
eval spawn $cmd
expect "Enter passphrase for (stdin):"
send "\r"
interact
