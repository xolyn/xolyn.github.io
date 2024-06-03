import os
fl= os.listdir(os.path.join(".","fonts"))
ct=""
for i in fl:
    ct+='''@font-face {font-family:'''+i.split(".")[0]+'''; src:url("fonts/'''+i+'''");}\n'''
with open('font.css', 'w') as file:
    file.write(ct)
    print("complied successfully.")
# print(ct)