# author: lingyu zhou (zly.ch)
# build: 1.0.2
# date: 2024.7.9

import sys,os,re,time

def f(path):
    start=time.time()
    html_content = []
    def add_directory(directory, level=0):
        if '.git' in directory:
            return
        
        html_content.append(f'<details>\n')
        html_content.append(f'<summary>{os.path.basename(directory)}</summary>\n')
        html_content.append(f'<ul>\n')

        items = os.listdir(directory)
        directories = [item for item in items if os.path.isdir(os.path.join(directory, item))]
        files = [item for item in items if os.path.isfile(os.path.join(directory, item))]

        for dir_item in directories:
            add_directory(os.path.join(directory, dir_item), level + 1)

        for file_item in files:
            file_path = os.path.join(directory, file_item)
            html_content.append(f'<li><a href="{file_path}">{file_item}</a></li>\n')

        html_content.append(f'</ul>\n')
        html_content.append(f'</details>\n')

    add_directory(path)
    body=''.join(html_content)
    h1title=f"<h1>index of {path}/</h1><hr>"
    style="details{margin:0;}\nul {list-style-type: none;}\nsummary{cursor:pointer}"
    cssurl='https://xolyn.github.io/font.css'
    prefix=f'''<!DOCTYPE html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8'>\n
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n
    <link rel='stylesheet' href={cssurl}>\n
    <title>index of {path}</title>\n
    <style>{style}</style>\n</head>\n<body>\n{h1title}
    '''
    suffix="\n</body>\n</html>"

    pattern = re.compile(r'<ul>\s*</ul>', re.IGNORECASE)
    html=pattern.sub('<ul><span style="color:grey;font-style:italic">blank folder</span></ul>', prefix+body+suffix)

    with open("file_tree.html", 'w') as f:
        f.write(html)
    # return prefix+body+suffix
    return round((time.time()-start),2)

upath="."
if 1<len(sys.argv)<2:
        param = ' '.join(sys.argv[1:])
        upath=param
        te=f(path=upath)
        opdir=os.path.join(upath,"file_tree.html")
        print(f"Complied successfully in {te} second(s), see {opdir}")
elif len(sys.argv)>2:
    print("\nToo many arguments!\n")
else:
    f(path=upath)
    opdir=os.path.join(upath,"file_tree.html")
    te=f(path=upath)
    print(f"Complied successfully in {te} second(s), see {opdir}")