import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'
import { navigateTo } from '../../util/index'
import './index.less'

//根据索引返回跳转参数
function switchBanner(idx) {
    const data = { type: idx }
    switch (idx) {
        case '0':
            return { ...data, value: '前端' }
        case '1':
            return { ...data, value: '后端' }
        case '2':
            return { ...data, value: '大数据' }
        case '3':
            return { ...data, value: '移动开发' }
        case '4':
            return { ...data, value: 'VR' }
        case '5':
            return { ...data, value: '人工智能' }
    }
}

/**
 *  首页轮播图
 */
export default class IndexSwiper extends Component {

    handleSwiperClick = (idx) => {
        const data = switchBanner(idx.toString());
        console.log(data);
        navigateTo('/pages/direction/index', data);
    }

    render() {
        const imgs = this.props.imgs;

        return (
            <Swiper
                className='swiper'
                indicatorDots
                indicatorActiveColor={'#fff'}
                autoplay
            >
                {
                    imgs.map((v, idx) => (
                        <SwiperItem key={idx} onClick={this.handleSwiperClick.bind(this, idx)} >
                            <image src={v} />
                        </SwiperItem>
                    ))
                }
            </Swiper>
        )
    }
}