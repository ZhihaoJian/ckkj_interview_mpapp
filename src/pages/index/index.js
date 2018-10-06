import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import IndexPage from '../../components/IndexPage/index'
import MePage from '../Me/index'
import './index.less'
import Footer from '../../components/Footer';

export default class Index extends Component {


    state = {
        current: 0
    }

    onTabBarClick = (index) => {
        this.setState({ current: index })
    }

    render() {

        const tabList = [
            { title: '首页', iconType: 'eye' },
            { title: '报名入口', iconType: 'user' }
        ];

        const current = this.state.current;

        return (
            <View className='index'>
                {
                    current === 0 ? <IndexPage /> : <MePage />
                }
                <Footer />
                <AtTabBar
                  fixed
                  tabList={tabList}
                  current={this.state.current}
                  onClick={this.onTabBarClick}
                />
            </View>
        )
    }
}

