# ckkj_interview_mpapp
创客103网申小程序

* 安装 [yarn](https://yarnpkg.com/zh-Hans/)
* 更换 yarn的镜像源，命令行下输入
    
        yarn config set registry https://registry.npm.taobao.org -g
        
* 进入项目根目录下，打开命令行输入以下命令，安装依赖，等待一会儿...

        yarn install

* 安装完成后，输入以下命令启动小程序开发服务器

        yarn run dev:weapp

* 或者打包发布

        yarn run build:weapp
    
* **注意：** 将项目导入微信开发者工具前，请将`appid`填入根目录下的 `project.config.json`的`appid`字段中，否则微信开发者工具无法预览