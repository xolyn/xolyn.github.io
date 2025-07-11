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

# add a customized js script
jsURL='<script src="../widgets/a11y-m-customized.js"></script>'
for mdFile in [x for x in os.listdir(relativeDir) if x.strip().endswith('.md') and not x.strip().startswith('.')]:
    with open(mdFile, 'r', encoding='utf-8') as file:
        content = file.read()
        if jsURL not in content:
            with open(mdFile, 'a') as file:
                    file.write(f'\n{jsURL}')
                    
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
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'>
<link rel="stylesheet" href="index.css">
<title>posts</title>
</head>
<body>
<div style="width:100%; text-align: right; border-bottom: 1px solid #eee; padding: .5rem 0; position: sticky; top: 0; background: white;">
<button id="sort-btn" style=" color:inherit; border:none; border-radius:.5rem; background:transparent;">&udarr;</button>
</div>
<div id='posts'>
'''

tempelateContent=''

# sort post based on date 
allPosts.sort(key=lambda x:x['date'],reverse=True)

for post in allPosts:
    _dir=post['dir']
    content=f'''<a href='{post['dir']}' class='title'>{post['title']}</a>'''+'\n'+ f'''<div class='date' data-date='{str(post['date'])}' >{datetime.strptime(str(post['date']), '%Y%m%d').strftime('%b %d, %Y')}</div>'''+'\n'
    content=f'''<div class='post'>{content}</div>'''+'\n'
    # print(content)
    tempelateContent+=content

tempelateEnd=\
'''
</div>
<script src="index.js"></script>
<script src="../widgets/a11y-m.js"></script>
</body>
</html>
'''

with open(outputDir, 'w',encoding="utf-8") as opHTML:
    opHTML.writelines(tempelateStart+'\n'+tempelateContent+'\n'+tempelateEnd)
    opHTML.close()

print('Success')