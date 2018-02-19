#!/bin/sh
set -ev
ssh-add - <<< ${GITHUB_DEPLOY_KEY}
