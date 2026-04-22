import os

def replace_in_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # If the file is in entry-points, fix page imports
    if 'entry-points' in file_path:
        content = content.replace("'@vc/core/kernel/pages/", "'../pages/")
        content = content.replace('"@vc/core/kernel/pages/', '"../pages/')
        
    with open(file_path, 'w') as f:
        f.write(content)

def walk_and_replace(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.js')):
                replace_in_file(os.path.join(root, file))

walk_and_replace('/home/engine/project/packages/web/src/entry-points')
