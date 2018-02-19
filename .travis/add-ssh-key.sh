#!/bin/bash
set -ev
eval $(ssh-agent -s)
ssh-add - <<< "${GITHUB_DEPLOY_KEY}"
expect "Enter passphrase for (stdin): "
send "\r"
expect eof
