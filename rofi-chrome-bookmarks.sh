#!/usr/bin/env bash

./parse.js "$1" \
  | rofi -i -dmenu \
  | awk '{print $2}' \
  | sed 's/"//g' \
  | xargs google-chrome