import os
import re

def fix_theme_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Replace both imports with a single one
    pattern = r"import '@kernel/themes/nativa\.css';\s*import '@kernel/themes/themes/nativa\.theme';"
    new_content = re.sub(pattern, "import '@themes/nativa';", content)
    
    # Also handle single imports just in case
    new_content = re.sub(r"import '@kernel/themes/nativa\.css';", "import '@themes/nativa';", new_content)
    new_content = re.sub(r"import '@kernel/themes/themes/nativa\.theme';", "import '@themes/nativa';", new_content)
    
    # Remove duplicate imports of @themes/nativa if they occurred
    lines = new_content.split('\n')
    new_lines = []
    seen_themes_nativa = False
    for line in lines:
        if "import '@themes/nativa';" in line:
            if not seen_themes_nativa:
                new_lines.append(line)
                seen_themes_nativa = True
        else:
            new_lines.append(line)
    new_content = '\n'.join(new_lines)

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
                if fix_theme_imports(file_path):
                    print(f"Fixed theme imports in {file_path}")

if __name__ == "__main__":
    main()
