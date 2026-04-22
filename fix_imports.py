import os
import re

def fix_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Replace @lib/*.js with relative paths (simplified for now)
    # Actually, let's just remove .js extension from all imports first
    new_content = re.sub(r"from '(@\w+/[^']+\.js)'", lambda m: m.group(0).replace('.js', ''), content)
    new_content = re.sub(r'import\("(\.\./lib/[^"]+\.js)"\)', lambda m: m.group(0).replace('.js', ''), new_content)
    
    # Also fix imports from @lib, @kernel, etc.
    # But wait, if tsc isn't picking up the paths from tsconfig, 
    # maybe I should just use relative paths.
    
    # For now, let's just try removing .js and see if tsc with --project . likes it.
    new_content = re.sub(r"from '(\.\.?/[^']+\.js)'", lambda m: m.group(0).replace('.js', ''), new_content)

    if content != new_content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        return True
    return False

def main():
    base_dir = '/home/engine/project/packages/web/demo/vanilla-cards'
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.ts'):
                file_path = os.path.join(root, file)
                if fix_imports(file_path):
                    print(f"Fixed imports in {file_path}")

if __name__ == "__main__":
    main()
