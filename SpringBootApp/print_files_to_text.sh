#!/bin/bash

# Remove existing file if it exists
if [ -f files.txt ]; then
    rm files.txt
fi

# Find all .java and .properties files and print filename and contents to files.txt
find . -type f \( -name "*.java" -o -name "*.properties" \) | while read -r file; do
    echo "===== $file =====" >> files.txt
    cat "$file" >> files.txt
    echo -e "\n" >> files.txt
done
