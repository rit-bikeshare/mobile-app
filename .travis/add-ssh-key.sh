#!/bin/sh
set -ev
ssh-add - <<< ${GITHUB_DEPLOY_KEY}
expect "Enter passphrase"
send "\r"
expect eof
