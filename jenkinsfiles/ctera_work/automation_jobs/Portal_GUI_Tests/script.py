from json2html import *

file1 = open("sonar_issues.txt","r")
cont = file1.read()
file1.close

html_cont = json2html.convert(json = cont)
file2 = open("sonar_issues.html","w")
file2.write(html_cont)
file2.close