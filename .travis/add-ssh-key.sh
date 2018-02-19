#!/bin/bash
set -ev
eval $(ssh-agent -s)
openssl aes-256-cbc -K $encrypted_797871a259bb_key -iv $encrypted_797871a259bb_iv -in secret_files.tar.gz.enc -out secret_files.tar.gz -d
tar -zxvf secret_files.tar.gz
ssh-add github_deploy_key
