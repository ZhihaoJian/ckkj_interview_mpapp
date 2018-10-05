import Taro, { Component } from '@tarojs/taro';
import './index.less';

//公共title
export default class Title extends Component {
    render() {
        const title = this.props.title;
        const banner = this.props.banner || false;
        return (
            <View className='title-wrapper'>
            {
                banner ? (<View className='banner-title' >{title}</View>) : (<View className='title' >{title}</View>)
            }
                
            </View>
        )
    }
}