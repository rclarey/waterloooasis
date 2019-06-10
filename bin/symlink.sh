#!/usr/bin/env bash
set -euo pipefail

PACKAGES="client shared web_service"

for package in $PACKAGES; do
    ln -s -f ../$package node_modules/
done
