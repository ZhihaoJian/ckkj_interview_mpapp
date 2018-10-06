import Taro, { Component } from '@tarojs/taro'
import { Picker, View, Text, Textarea } from '@tarojs/components'
import { AtInput, AtTextarea, AtButton, AtRadio, AtToast } from 'taro-ui'
import { getStorage, setStorage, hasNetWork, connectToDB } from '../../util/index'
import './index.less'
import Title from '../Title';
import NoticeBar from '../Notice';

//本地缓存字段
const INTERVIEW_INFO = 'interview_info'

//格式化指定的简历信息
//参数是state里面的字段
function formatData({ username, phone, gender, majorChecked, directionChecked, myKnowledge, myPlan, gradeChecked, type }) {
    return [{
        key: 'username',
        value: username
    }, {
        key: 'phone',
        value: phone
    },
    {
        key: 'gender',
        value: gender
    }, {
        key: 'majorChecked',
        value: majorChecked
    },
    {
        key: 'directionChecked',
        value: directionChecked
    },
    {
        key: 'myKnowledge',
        value: myKnowledge
    },
    {
        key: 'myPlan',
        value: myPlan
    },
    {
        key: 'gradeChecked',
        value: gradeChecked
    },
    {
        key: 'type',
        value: type
    },
    {
        key: 'disabled',
        value: true
    }];
}

//将格式化后的简历信息本地持久化
function setToLocalData(data, disabled) {
    //根据网络状态判断是否禁止重复提交
    //如果disabled = true(网络良好)，可以发送请求然后禁止编辑、重复提交
    //否则disblaed = false,（未联网、或者其他原因），将数据缓存到本地，便于日后打开回填
    const disabledObj = data.filter(v => v.key === 'disabled')[0];
    disabledObj.value = disabled;
    setStorage(INTERVIEW_INFO, JSON.stringify(data));
}

//检查表单是否合法
//合法才能提交简历
function isFormValidate(data) {
    const { username, phone, myKnowledge, myPlan } = data;
    if (!username || !phone || !myKnowledge || !myPlan) {
        return false;
    }
    if (!(/^1[3|4|5|7|6|8]\d{9}$/.test(phone))) {
        return false;
    }
    return true;
}

//简历编写
export default class MePage extends Component {

    state = {
        username: '',
        phone: '',
        gender: '男',
        type: '技术入驻',
        grade: [2015, 2016, 2017, 2018],
        gradeChecked: 2018,
        major: [
            ['旅游学院', '外国语学院', '金融学院', '电子商务管理学院', '会计学院', '信息技术与工程学院', '继续教育学院', '国际学院', '艺术设计学院', '法学院'],
            ['旅游管理', '酒店管理', '电子商务及法律', '法学', '视觉传达设计', '数字媒体艺术', '产品设计', '环境设计', '软件工程', '计算机科学与技术', '信息管理与信息系统', '物联网工程', '智能科学与技术', '数据科学与大数据技术', '会计学', '财务管理', '审计学', '市场营销专业', '物流管理', '电子商务', '国际经济与贸易', '互联网金融', '金融学', '投资学', '英语', '日语', '德语', '商务英语', '其他']
        ],
        majorChecked: '信息技术与工程学院 - 计算机科学与技术',
        direction: ['前端', '后端', '大数据', '人工智能', '移动开发', 'vr', '其他'],
        directionChecked: '其他',
        myKnowledge: "",
        myPlan: "",
        loading: false,
        disabled: false,
        feedbackIsOpen: false,
        errorToastShow: false,
        errorToast: {
            title: '错误',
        }
    }

    componentDidMount() {
        if (this.isExpired()) {
            this.setState({ disabled: true })
        } else {
            //获取历史简历信息，回填
            //根据用户过去是否提交过简历判断是否禁止多次提交
            getStorage(INTERVIEW_INFO).then(data => {
                const newData = JSON.parse(data);
                const obj = {};
                for (let i = 0; i < newData.length; i++) {
                    const el = newData[i];
                    obj[el.key] = el.value;
                }
                this.setState({ ...obj })
            })
        }
    }

    //判断当前日期是否超过2018.10.10 中午12 点，过期的话，禁止提交简历
    isExpired = () => {
        const date = new Date();
        const expire = new Date(2018, 10, 10, 12);
        return date > expire;
    }

    //下面是各种表单绑定
    handleUserNameChange = (username) => {
        this.setState({ username })
    }

    handlePhoneChange = (phone) => {
        this.setState({ phone })
    }

    handleGradeChange = (e) => {
        const idx = e.detail.value;
        const gradeChecked = this.state.grade[idx];
        this.setState({ gradeChecked })
    }

    handleMajorChange = (e) => {
        const selectedKeys = e.detail.value; // [1,1]
        const majorsAndDirections = this.state.major;
        const selectedMajor = majorsAndDirections[0][selectedKeys[0]];  //选中的学院
        const selectedDirection = majorsAndDirections[1][selectedKeys[1]];//选中的专业

        const majorChecked = `${selectedMajor}-${selectedDirection}`
        this.setState({ majorChecked })
    }

    handleMyKnowledgeChange = (e) => {
        const val = e.detail.value;
        this.setState({ myKnowledge: val })
    }

    handleMyPlanChange = (e) => {
        const val = e.detail.value;
        this.setState({ myPlan: val })
    }

    handleDirectionChange = (e) => {
        const val = e.detail.value;
        const directionChecked = this.state.direction[val];
        this.setState({ directionChecked });
    }

    handleGenderChange = (gender) => {
        this.setState({ gender })
    }

    handleTypeChange = (type) => {
        this.setState({ type })
    }

    //展示错误的toast
    showErrorToast(title) {
        const errorToast = this.state.errorToast;
        errorToast.title = title;
        this.setState({ errorToastShow: true, errorToast, loading: false }, () => {
            setTimeout(() => {
                this.setState({ errorToastShow: false })
            }, 1200)
        });
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        //判断是否联网
        hasNetWork().then(isConnect => {
            let newData = formatData(this.state);
            if (isConnect) {
                //判断表单的必填项是否合法
                if (!isFormValidate(this.state)) {
                    this.showErrorToast('请认真填写每一项哦')
                    setToLocalData(newData, false);
                    return;
                }
                //提交简历 记录用户的简历信息到本地缓存以便二次访问回填
                setToLocalData(newData, true);
                //发送ajax请求
                connectToDB(this.state);
                //设置应用状态
                this.setState({ loading: false, disabled: true, feedbackIsOpen: true });
            } else {
                //保存用户填写数据到本地
                setToLocalData(newData, false);
                this.showErrorToast('尚未连接网络');
            }
        })

    }

    render() {
        const { disabled } = this.state;
        return (
            <View className='interview-wrapper' >
                <Title title='填写个人简历' />
                <NoticeBar />
                <View className='page' >
                    <View className='page-section' >
                        <AtInput
                          name='username'
                          title='姓名'
                          type='text'
                          disabled={disabled}
                          placeholder='Riot'
                          value={this.state.username}
                          onChange={this.handleUserNameChange.bind(this)}
                        />
                    </View>
                    <View className='page-section'>
                        <AtInput
                          name='phone'
                          title='手机号码'
                          type='phone'
                          disabled={disabled}
                          placeholder='15612343005'
                          value={this.state.phone}
                          onChange={this.handlePhoneChange.bind(this)}
                        />
                    </View>
                    <View className='page-section t g' >
                        <Text className='form-title' >性别</Text>
                        <AtRadio
                          options={[
                                { label: '男', value: '男', disabled: disabled },
                                { label: '女', value: '女', disabled: disabled },
                            ]}
                          value={this.state.gender}
                          onClick={this.handleGenderChange}
                        />
                    </View>
                    <View className='page-section t g' >
                        <Text className='form-title' >入驻类型</Text>
                        <AtRadio
                          options={[
                                { label: '技术入驻', value: '技术入驻', disabled: disabled },
                                { label: '创业入驻', value: '创业入驻', disabled: disabled },
                            ]}
                          value={this.state.type}
                          onClick={this.handleTypeChange}
                        />
                    </View>
                    <View className='page-section p'>
                        <Text className='form-title' >年级</Text>
                        <View className='picker-wrapper' >
                            <Picker mode='selector' disabled={disabled} range={this.state.grade} onChange={this.handleGradeChange}>
                                <View className='picker'>
                                    {this.state.gradeChecked}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='page-section p'>
                        <Text className='form-title'>专业</Text>
                        <View className='picker-wrapper' >
                            <Picker mode='multiSelector' disabled={disabled} range={this.state.major} onChange={this.handleMajorChange}>
                                <View className='picker'>
                                    {this.state.majorChecked}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='page-section p'>
                        <Text className='form-title'>预选方向</Text>
                        <View className='picker-wrapper' >
                            <Picker mode='selector' disabled={disabled} range={this.state.direction} onChange={this.handleDirectionChange}>
                                <View className='picker'>
                                    {this.state.directionChecked}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='page-section t'>
                        <AtTextarea disabled={disabled}
                          value={this.state.myKnowledge}
                          onChange={this.handleMyKnowledgeChange}
                          maxlength='200'
                          placeholder='您现在所掌握的知识或者技能'
                        />
                    </View>
                    <View className='page-section t' >
                        <AtTextarea disabled={disabled}
                          value={this.state.myPlan}
                          onChange={this.handleMyPlanChange}
                          maxlength='200'
                          placeholder='您未来的学习计划或者创业计划'
                        />
                    </View>
                    <View className='page-section t'>
                        <AtButton
                          type='secondary'
                          disabled={disabled}
                          loading={this.state.loading}
                          onClick={this.handleSubmit}
                        >{disabled ? '已提交' : '提交'}</AtButton>
                    </View>
                </View>

                {/* 提交简历反馈 */}
                <AtToast text='提交成功' icon='check' status='success' isOpened={this.state.feedbackIsOpen} hasMask />
                {
                    this.state.errorToastShow ? (
                        <AtToast
                          text={this.state.errorToast.title}
                          icon='error'
                          status='error'
                          isOpened={this.state.errorToastShow}
                          hasMask
                        />
                    ) : null
                }
            </View>
        )
    }
}