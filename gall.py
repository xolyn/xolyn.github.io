import os

def generate_html(images):
    ctnt=""
    for image in images:
        ctnt += f'''<figure><img onlick="window.open(this.src, '_blank');" src="{image}"></figure>\n'''
    return ctnt

def main():
    # imgdir = "."
    # images = []
    # for filename in os.listdir(imgdir):
    #     if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
    #         images.append(filename)
    # html_content = generate_html(images)
    # with open('index.html', 'w') as file:
    #     file.write(html_content)
    # print("complied successfully.")
    imgdir=input("photos directory (relative path): ")
    if imgdir=="" or imgdir==None:
        imgdir="."
    else:
        imgdir=os.path.join(".",imgdir)
    images = []
    for filename in os.listdir(imgdir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            images.append(os.path.join(imgdir,filename))
    print(generate_html(images))

if __name__ == "__main__":
    main()
