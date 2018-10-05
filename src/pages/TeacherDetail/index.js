import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { AtTag, AtTimeline, AtList, AtListItem } from 'taro-ui'
import Title from '../../components/Title';
import { teachers } from '../../mock/local_data';
import './index.less';

export default class TeacherDetail extends Component {
    render() {

        if (process.env.TARO_ENV === 'weapp') {
            require('taro-ui/dist/weapp/css/index.css')
        } else if (process.env.TARO_ENV === 'h5') {
            require('taro-ui/dist/h5/css/index.css')
        }

        //提取教师的索引，取出相关数据
        const dataIndex = parseInt(this.$router.params.index);
        const teacherData = teachers[dataIndex];
        return (
            <View className='teacher-detail'>
                <View className='at-article'>
                    <View className='at-article__h1' >
                        <Title title={teacherData.title} />
                    </View>
                    <Image src={teacherData.thumb} className='at-article__img' mode='widthFix' />
                    <View className='at-article__content'>
                        <View>
                            <View className='at-article__h3 title'>简介</View>
                            <View className='at-article__p'>{teacherData.detail}</View>
                        </View>
                        <View>
                            <View className='at-article__h3 title'>标签</View>
                            <View className='at-article__p'>
                                {
                                    teacherData.tags.map((v, idx) => (
                                        <View className='tag' key={idx}>
                                            <AtTag size='small' type='primary' circle>{v}</AtTag>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View>
                            <View className='at-article__h3 title'>研究方向</View>
                            <View className='at-article__p'>
                                {
                                    teacherData.major.map((v,idx) => (
                                        <View className='tag' key={idx}>
                                            <AtTag size='small' type='primary' circle>{v}</AtTag>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        {
                            teacherData.timeline.length ? (
                                <View>
                                    <View className='at-article__h3  title'>职业生涯</View>
                                    <View className='at-article__p'>
                                        {/* {teacherData.detail} */}
                                        <AtTimeline items={teacherData.timeline} />
                                    </View>
                                </View>
                            ) : null
                        }
                        {
                            teacherData.prizes.length ? (
                                <View>
                                    <View className='at-article__h3 title'>荣誉奖项</View>
                                    <View className='at-article__p' >
                                        <AtTimeline items={teacherData.prizes} />
                                    </View>
                                </View>
                            ) : null
                        }
                        {
                            teacherData.project.length ? (
                                <View>
                                    <View className='at-article__h3 title'>主持项目</View>
                                    <View className='at-article__p'>
                                        <AtTimeline items={teacherData.project} />
                                    </View>
                                </View>
                            ) : null
                        }
                    </View>
                </View>
            </View>
        )
    }
}