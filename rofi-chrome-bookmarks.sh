#!/usr/bin/env bash

SELECTED=$(parse-chrome-bookmarks "$1")

# doesn't work - it's like rofi doesn't wait for selection to happen
# if [[ -z "$SELECTED" ]]; then
#     echo 'No selection was made'
#     exit 1
# fi
# echo "selected: $SELECTED"

echo "$SELECTED" \
  | rofi -i -dmenu -p 'bookmarks' \
  | awk '{print $2}' \
  | sed 's/"//g' \
  | xargs google-chrome
