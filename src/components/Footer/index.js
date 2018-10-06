import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less';

export default class Footer extends Component{
    render(){
        return(
            <View className='footer' >
                2018 @copyright 版权归 创客空间103工作室所有
            </View>
        )
    }
}