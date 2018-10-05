import Taro, { Component } from '@tarojs/taro'
import { AtListItem, AtList } from 'taro-ui'
import './index.less';
import { navigateTo } from '../../util';

//卡片列表，显示教师信息
export default class CardList extends Component {
    //跳转到教师详情
    handleListItemClick = (idx) => {
        navigateTo('/pages/TeacherDetail/index', {
            index: idx
        });
    }

    render() {
        const data = this.props.data;
        return (
            <AtList hasBorder={false} className='card-list' >
                {
                    data.map((v, idx) => (
                        <AtListItem
                            key={idx}
                            title={v.title}
                            note={v.note}
                            arrow='right'
                            thumb={v.thumb}
                            onClick={this.handleListItemClick.bind(this, idx)}
                        />
                    ))
                }
            </AtList>
        )
    }
}