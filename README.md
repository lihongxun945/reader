## 打包发布的问题：
'''
sencha create jsb -a debug.html -p app.jsb3
sencha build -p app.jsb3 -d .
'''
以上命令会生成一个app-all.js的文件，但是在压缩的时候会出错，在手动压缩即可
'''
yuic app-all.js -o app-all.min.js
'''

使用compass编译压缩css
'''
cd resources/sass
compass compile
'''

##注意，对sencha源码进行了一点修改
把默认的滚动条加速度改为10:
sdk/src/scroll/Scroller.js
'''
acceleration: 10
'''
pullrefresh插件进行了修改

##添加脚本
在bashrc中添加如下代码
'''
alias reader="cd ~/zhihu/zhihu/static/reader"
alias readercompile="cd ~/zhihu/zhihu/static/reader && sencha create jsb -a debug.html -p app.jsb3 && sencha build -p app.jsb3 -d . && yuic app-all.js -o app-all.min.js && cd resources/sass && compass compile" #编译压缩前端
'''
=======
reader
======
