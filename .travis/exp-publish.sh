#!/bin/bash
set -ev
exp login -u $EXPO_USERNAME -p $EXPO_PASSWORD
exp publish
