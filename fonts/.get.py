import os
import pyperclip
# fontList=[x for x in os.listdir(".") if x.endswith("tf")]
with open("../font.css") as fcss:
    fcss=fcss.read().split("\n")

fontNames=[x.split(";")[0].split(":")[-1] for x in fcss if x!=""]

fi=0
op=''''''
for i in fontNames:
    if fi==0:
        op+=f'''<fieldset>\n\t<legend>{i}</legend>\n\t<div style="font-family:{i};" class="usrtxt" id="orig" contenteditable >The quick brown fox jumps over the lazy dog.</div>\n</fieldset>\n'''
        fi=1
    else:
        op+=f'''<fieldset>\n\t<legend>{i}</legend>\n\t<div style="font-family:{i};" class="usrtxt" contenteditable ></div>\n</fieldset>\n'''

iop=input("output[y/n]?\n")
if iop.lower()=="y":
    print(op)
pyperclip.copy(op)
print("succesfully copied to clipboard!")