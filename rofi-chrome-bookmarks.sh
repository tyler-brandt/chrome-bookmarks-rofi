#!/usr/bin/env bash

parse-chrome-bookmarks "$1" \
  | rofi -i -dmenu \
  | awk '{print $2}' \
  | sed 's/"//g' \
  | xargs google-chrome
