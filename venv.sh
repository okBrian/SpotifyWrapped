#!/bin/bash

# Create a Python virtualenv if it hasn't already been created
if [ ! -f "$(pwd)/build/venv/bin/activate" ]; then
    if ! python3 -m venv "$(pwd)/build/venv"; then
        echo "Failed to create a$MAGENTA Python$COLOR_RESET virtual environment. Delete the build/venv folder and try again."

        exit 1
    fi

    echo "Created a$MAGENTA Python$COLOR_RESET virtual environment (venv)."

    rm "$(pwd)/build/requirements.txt" > /dev/null 2>&1 || true
fi

# Activate the Python venv
source "$(pwd)/build/venv/bin/activate"
echo "(venv) Entered the $MAGENTA$(python3 --version)$COLOR_RESET virtual environment."

# Install Python dependencies if, either:
# - This script is running for the first time
# (or)
# - The requirements.txt file has changed
if ! cmp "$(pwd)/requirements.txt" "$(pwd)/build/requirements.txt" > /dev/null 2>&1; then
    echo "(venv) (Re)Installing FoodReviewWebsite's Python dependencies (via Pip)."

    next_arg=0
    nthreads=1
    for arg in "$@"; do
        if [ "$next_arg" == 1 ]; then
            next_arg=0
            nthreads=$arg
            continue
        fi
    done

    if ! PIP_DISABLE_PIP_VERSION_CHECK=1 MAKEFLAGS=$nthreads pip3 install -r "$(pwd)/requirements.txt"; then
        echo "(venv) Installation failed."

        echo   "(venv) Exiting the$MAGENTA Python$COLOR_RESET virtual environment."
        deactivate

        exit 1
    fi

    echo "(venv) Installation succeeded."

    # Save the new/current requirements.txt
    cp "$(pwd)/requirements.txt" "$(pwd)/build/"
fi