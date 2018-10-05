import Taro, { Component } from '@tarojs/taro'
import { AtNoticebar } from 'taro-ui'

//通知栏
export default class NoticeBar extends Component {
    render() {
        return (
            <AtNoticebar icon='volume-plus'>
                截至报名时间 2018.10.10，有意向的同学赶紧点击下方 "报名入口" 提交简历吧！
            </AtNoticebar>
        )
    }
}