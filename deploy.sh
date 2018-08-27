#!/bin/bash
# Usage: deploy.sh master

set -eo pipefail

ENVS=("master" "staging" "staging2")
ERR="Error: XXX environment. It should be: ${ENVS[@]}"

USER=deploy
FRONTEND_DIR=/home/deploy/frontend

APP01="35.226.50.203"
APP02="104.197.236.197"
STAGING="35.188.195.108"
STAGING2="35.224.202.55"
MASTER=("$APP01" "$APP02")

if [ -z $1 ]; then
    echo "${ERR/XXX/Missing}"
    exit 1
elif [[ ! "${ENVS[@]}" =~ "${1}" ]]; then
    echo "${ERR/XXX/Invalid}"
    exit 1
fi

COMMIT="$1"
HOSTS="${COMMIT^^}[@]"

for HOST in "${!HOSTS}"; do
    echo "Deploying $COMMIT to $HOST."
    ssh $USER@$HOST 'bash -s' < update_env.sh "$COMMIT" "$FRONTEND_DIR"
done

exit 0
