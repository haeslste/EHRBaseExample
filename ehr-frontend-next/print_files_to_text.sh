 #!/bin/bash

# Remove existing file if it exists
if [ -f files.txt ]; then
    rm files.txt
fi

# Find all .ts and .tsx files, excluding node_modules directories
find . -type d -name node_modules -prune -o -type f \( -name "*.tsx" -o -name "*.ts" \) -print | while read -r file; do
    echo "===== $file =====" >> files.txt
    cat "$file" >> files.txt
    echo -e "\n" >> files.txt
done
