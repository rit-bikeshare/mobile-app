#!/bin/bash
set -ev
eval $(ssh-agent -s)
echo -ne '\n' | ssh-add - <<< "${GITHUB_DEPLOY_KEY}"
