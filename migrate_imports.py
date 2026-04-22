import os
import re

def replace_in_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Replace @kernel/app-kernel with @vc/core
    content = content.replace("'@kernel/app-kernel'", "'@vc/core'")
    content = content.replace('"@kernel/app-kernel"', '"@vc/core"')

    # Replace @kernel/ with @vc/core/kernel/
    content = content.replace("'@kernel/", "'@vc/core/kernel/")
    content = content.replace('"@kernel/', '"@vc/core/kernel/')

    # Replace @lib/ with @vc/core/lib/
    content = content.replace("'@lib/", "'@vc/core/lib/")
    content = content.replace('"@lib/', '"@vc/core/lib/')
    
    # Replace @themes/nativa with @vc/theme-nativa
    content = content.replace("'@themes/nativa'", "'@vc/theme-nativa'")
    content = content.replace('"@themes/nativa"', '"@vc/theme-nativa"')

    with open(file_path, 'w') as f:
        f.write(content)

def walk_and_replace(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.js', '.css', '.html')):
                replace_in_file(os.path.join(root, file))

walk_and_replace('/home/engine/project/packages/web/src')
walk_and_replace('/home/engine/project/packages/web/demo')
walk_and_replace('/home/engine/project/packages/core/src')
walk_and_replace('/home/engine/project/packages/themes/nativa/src')
