import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import IndexSwiper from '../Swiper/index'
import CardList from '../CardList/index'
import './index.less'
import Title from '../Title';
import NoticeBar from '../Notice';
import { navigateTo } from '../../util';
import { teachers, recruitmentDirections, swiperImgs } from '../../mock/local_data';

//首页
export default class IndexPage extends Component {

    //招新方向点击
    handleGridClick = (item, index) => {
        navigateTo('/pages/direction/index', {
            type: index,
            value: item.value
        })
    }

    render() {
        return (
            <View className='index-page' >

                {/* 通知 */}
                <NoticeBar />

                {/*轮播图*/}
                <IndexSwiper imgs={swiperImgs} />

                {/* 招新方向 */}
                <View className='recruitment-direction container' >
                    <Title title='招新方向' />
                    <AtGrid mode='rect' data={recruitmentDirections} onClick={this.handleGridClick} />
                </View>

                {/*指导老师*/}
                <View className='container teacher-list'>
                    <Title title='指导老师' />
                    <CardList data={teachers} />
                </View>
            </View>
        )
    }
}