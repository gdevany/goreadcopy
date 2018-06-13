#!/bin/bash
# Usage: update_env.sh COMMIT GIT_DIR
# Ex: update_env.sh master ~/src/goread-frontend

if [ -z $1 ]; then
    COMMIT="master"
else
    COMMIT="$1"
fi

if [ -z $2 ]; then
    GIT_DIR="."
else
    GIT_DIR="$2"
fi

if [[ "$COMMIT" == "master" ]]; then
    DEPLOY_NAME="appcloud"
else
    DEPLOY_NAME="$COMMIT"
fi

function fetch_code {
    if [ ! -d "$GIT_DIR" ]; then
        echo "cloning repo"
        git clone git@gitlab.readerslegacy.com:RL/goread-frontend.git "$GIT_DIR"
    else
        echo "fetching repo"
        git fetch origin "$COMMIT"
        git reset --hard "origin/$COMMIT"
    fi
}

function install_packages {
    yarn --cwd "$GIT_DIR" install
}

function build_bundle {
    INIT_CWD="$GIT_DIR" npm run build:"$DEPLOY_NAME"
}

function fix_static_hash {
    index_file="index.html"
    code_dir="$GIT_DIR/public/"
    bundle_files=("vendor" "main" "runtime")
    exts=("js" "css")
    
    hex_hash=$(echo $(date +"%s") | md5sum | awk '{print $1}')

    cd "$code_dir" || exit 1

    for ext in "${exts[@]}"; do
        for bundle_file in "${bundle_files[@]}"; do
            if [ "$bundle_file" != "runtime" || "$ext" != "css" ]; then
                file_to_find="$bundle_file.*.$ext"
                file_to_change=$(ls -t "$file_to_find" | head -1)

                if [ -e "$file_to_change" ]; then
                    new_file_name="$bundle_file.$hex_hash.$ext"
                    mv "$file_to_change" "$new_file_name"
                    sed -i -- 's/$file_to_change/$new_file_name/g' "$index_file"
                fi

                if [ "$bundle_file" != "runtime" ]; then
                    gzip_ext="$ext.gz"
                    gzip_file_to_find="$bundle_file.*.$gzip_ext"
                    gzip_file_to_change=$(ls -t "$gzip_file_to_find" | head -1)

                    if [ -e "$gzip_file_to_change" ]; then
                        gzip_new_file_name="$bundle_file.$hex_hash.$gzip_ext"
                        mv "$gzip_file_to_change" "$gzip_new_file_name"
                    fi
                fi

                #Cleaning old bundle files
                find "$bundle_file*.$ext*" \
                     ! -iname "$new_file_name" ! -iname "$gzip_new_file_name" \
                     -delete
            fi
        done
    done
    
    directory_to_find="icons-"
    new_directory_name="$directory_to_find$hex_hash"
    directory_to_change=$(ls -dt "$directory_to_find*" | head -1)

    mv "$directory_to_change" "$new_directory_name"
    sed -i -- 's/$directory_to_change/$new_directory_name/g' "$index_file"
    find "$directory_to_find*" -type d ! -iname "$new_directory_name" -delete
}

function restart_express {
    sudo supervisorctl stop express:*
    sudo supervisorctl start express:*
}

fetch_code
# install_packages
# build_bundle
# fix_static_hash
# restart_express

exit 0
