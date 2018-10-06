import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/direction/index',
      'pages/TeacherDetail/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '创客103网申平台',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {

    if (process.env.TARO_ENV === 'weapp') {
      require('taro-ui/dist/weapp/css/index.css')
    } else if (process.env.TARO_ENV === 'h5') {
      require('taro-ui/dist/h5/css/index.css')
    }

    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
