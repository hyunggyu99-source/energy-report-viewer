#!/bin/bash
MSG=$(cat)
case "$MSG" in
  *"蹂닿퀬"*|*"먮꼫"*|*"쒓컖"*)
    echo "Initial commit: energy report comparison dashboard and 3D energy viewer"
    ;;
  *"怨듭쑀"*|*"珥덉븞"*)
    echo "docs: add Discord sharing message draft"
    ;;
  *"곕え"*|*"Pages"*"留곹겕"*)
    echo "docs: add GitHub Pages demo link to Discord message"
    ;;
  *)
    echo "$MSG"
    ;;
esac
