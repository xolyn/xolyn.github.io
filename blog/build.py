import os
# import markdown
import sys
from datetime import datetime
import re

def parseTitle(origTitle):
    pass

def parseHTML(abbr, content):
    match = re.match(r'([^{.#]+)(?:#([^.#]+))?(?:\.([^.#]*))?', abbr)
    tag, id, classes = match.groups()
    html = f'<{tag}'
    if id:
        html += f' id="{id}"'
    if classes:
        html += f' class="{classes.replace(".", " ")}"'
    html += f'>{content}</{tag}>'
    return html

relativeDir = sys.argv[1] or '.'
outputDir=os.path.join(relativeDir, 'index.html')

allPosts=[]

for mdFile in [x for x in os.listdir(relativeDir) if x.strip().endswith('.md') and not x.strip().startswith('.')]:
    with open(mdFile, 'a') as file:
            file.write('\n<script src="../widgets/a11y-m-customized.js"></script>')
    file.close()

    postRelDir=os.path.join(relativeDir, mdFile)
    postTitle=mdFile.rsplit('.md',maxsplit=1)[0].strip()
    postDate=int(datetime.fromtimestamp(os.path.getctime(postRelDir)).strftime('%Y%m%d'))

    # if user set date:
    if postTitle[0]=='[' and postTitle[9]==']':
        # postDate=datetime.strptime(postTitle[1:9], '%Y%m%d').strftime('%b %d, %Y')
        try:
            postDate=int(postTitle[1:9])
        except:
            print('Error: Cant parse user defined date, use format: "yyyymmdd" in pure numbers!')
        postTitle=postTitle[10:]

    allPosts.append({
        'title':postTitle,
        'date':postDate,
        'dir':postRelDir.rsplit('.md',maxsplit=1)[0]
    })

# print(allPosts)

tempelateStart=\
'''
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<link rel='stylesheet' href='https://xolyn.github.io/font.css'>
<link rel="stylesheet" href="index.css">
<title>posts</title>
</head>
<body>
'''

tempelateContent=''

# sort post based on date 
allPosts.sort(key=lambda x:x['date'],reverse=True)

for post in allPosts:
    _dir=post['dir']
    content=f'''<a href='{post['dir']}' class='title'>{post['title']}</a>'''+'\n'+ f'''<div class='date'>{datetime.strptime(str(post['date']), '%Y%m%d').strftime('%b %d, %Y')}</div>'''+'\n'
    content=f'''<div class='post'>{content}</div>'''+'\n'
    # print(content)
    tempelateContent+=content

tempelateEnd=\
'''
<script src="index.js"></script>
</body>
</html>
'''

with open(outputDir, 'w',encoding="utf-8") as opHTML:
    opHTML.writelines(tempelateStart+'\n'+tempelateContent+'\n'+tempelateEnd)
    opHTML.close()

print('Success')