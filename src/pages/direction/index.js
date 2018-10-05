import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Title from '../../components/Title';
import './index.less';

import AI_IMG from '../../assests/images/ai.png';
import FE_IMG from '../../assests/images/fe.jpg';
import BE_IMG from '../../assests/images/be.jpg';
import BIG_DATA_IMG from '../../assests/images/big_data.jpg';
import MOBILE_DEV_IMG from '../../assests/images/mobile_dev.jpg';

//根据点击的索引加载不同的banner
function switchBanner(idx) {
    switch (idx) {
        case '0':
            return {
                banner: FE_IMG,
                detail: 'web前端对于网站来说，通常是指，网站的前台部分包括网站的表现层和结构层。因此前端技术一般分为前端设计和前端开发，前端设计一般可以理解为网站的视觉设计，前端开发则是网站的前台代码实现，包括基本的HTML和CSS以及JavaScript/ajax.现在新的高级版本HTML5、CSS3，以及SVG等。那么如果你想学好web前端必须学会的3个基础技能：HTML、CSS、JavaScript.这三个是前端开发中基本也是必须的三个技能。在前端的开发中，在页面的布局时，HTML将元素进行定义，CSS对展示的元素进行定位，再通过JavaScript实现相应的效果和交互。虽然表面看起来很简单，但这里面需要掌握的东西绝对不少。在进行开发前，需要对这些概念弄清楚、弄明白，这样在开发的过程中才会得心应手。'
            }
        case '1':
            return {
                banner: BE_IMG,
                detail: '根据正在处理的应用程序的大小和范围，后端开发人员要做的事情有很大的不同。在我是一个后端开发人员时，我做了很多工作，工作于应用程序中的业务逻辑，以及从前端提取和检索数据。在Web开发世界中，大多数后端开发人员从事于构建他们正在工作的应用程序背后的实际逻辑。通常，前端开发人员构建用户界面，而后端开发人员编写代码，使其工作。例如，前端开发人员在应用程序中创建一个界面，上面有一个按钮，按下按钮来获取客户的数据。后端开发人员写可使得按钮工作的代码，通过指出从数据库中提取哪些数据并将其传回到前端（并最终显示在那里）。后端开发人员也可能会大量参与系统架构，决定如何组织系统的逻辑，以便能够正常维护和运行。他可能会参与构建框架或系统架构，以便于更容易编写程序。后端开发人员比前端开发人员花费更多的时间在实现算法和解决问题上。我一直都很喜欢后端开发工作，因为它更像一个挑战。这并不是说前端开发人员不解决难题，但通常前端开发工作更多的是关于创建用户界面和与之相关的内容，而不是实现实际的业务逻辑，使应用程序工作。'
            }
        case '2':
            return {
                banner: BIG_DATA_IMG,
                detail: '大数据技术的战略意义不在于掌握庞大的数据信息，而在于对这些含有意义的数据进行专业化处理。换言之，如果把大数据比作一种产业，那么这种产业实现盈利的关键，在于提高对数据的“加工能力”，通过“加工”实现数据的“增值”。从技术上看，大数据与云计算的关系就像一枚硬币的正反面一样密不可分。大数据必然无法用单台的计算机进行处理，必须采用分布式架构。它的特色在于对海量数据进行分布式数据挖掘，但它必须依托云计算的分布式处理、分布式数据库和云存储、虚拟化技术。随着云时代的来临，大数据（Big'
            }
        case '3':
            return {
                banner: MOBILE_DEV_IMG,
                detail: '我理解的移动开发，是以移动设备（比如手机）为媒介为设备的方式，进行的开发工作。移动设备吧，除了我平常工作接触的iphone ipad，我的同事们接触的各种android手机，还有很多比如手表呀，天猫精灵呀等等，通俗点说，就是便携的那些个东西。我门通常做出来的成果或者说作品，就是用户在app store或者一些公司官网上面看到的各种app，android的同事们做的app还有各种定制机中的内置app等等。从事移动开发的语言，ios这里就是oc swift，android是java。当然，现在有很多多端解决方案，比如rn，weex。语言的选择，有时候和公司的现状有关系的。有些公司或者部门在初期的时候，为了快速搭建应用，会选择rn weex这样的多端解决方案，当然性能方面吧，看程序员了。后期，再用原生建议的语言（有些部门还是会保留多端解决方案）。相比于服务端，移动开发很多时候在考虑mvc中的v层面，也就是交互，视觉等方面的事情。当然会有考虑业务数据的时候，但相比于数据端，移动端的业务数据很多时候是为了展示服务的。对于开发的日常，大多数时候，在做好了相应的业务之后，通常会考虑一下下页面的卡顿，异常情况的处理，有时候会从网络方面和电池损耗（其实也是性能啦）想办法优化一下下。移动开发，相对于服务端的开发，还是比较轻松的，因为我们面对的是单个用户的使用情况。但是，在开发中， 一定一定要注意，所有对于前端的校验都不要去相信，尤其是比较核心的部分，必须要有服务端介入校验。比较优秀的移动开发，很多时候在和产品经理聊需求的时候，给出较为明晰的技术解决方案，说出方案的各种优缺点，甚至于关心app的DAU，成交量等等数据，和产品经理共同商议出产品方向。'
            }
        case '4':
            return {
                banner: '',
                detail: `
                VR不是一项新技术，它只是变得可及。— Jeremy Bailenson(Stanford VHIL)

                随着VR的火热，越来越多的人有机会体验VR，该技术也越来越清楚应如何在更大范围内抵达消费者。
                
                那么，VR技术到底是什么？如何学习VR？\n
                
                下载一个游戏引擎，如Unity或Unreal Engine，并开始黑客式攻击。如果你以前开发过游戏，就会注意到这个过程非常熟悉，除了你的耳机被安装到与游戏机相应的摄像机之处(in-game camera)。\n
                
                更普遍地说，这些游戏引擎的设计非常直观且容易学习。它们只需要基本的脚本，并且可以使用浅层次学习曲线接口(例如：拖放可视化脚本)。
        
                了解图形流水线(the Graphics Pipeline)将帮助你欣赏VR的限制性和可能性\n
        
                从根本上说，VR是用头部跟踪在你眼前展现出的场景并进行渲染的酷炫应用。了解3D几何以及呈现方式，你将更好地了解VR的限制性和可能性。\n
                
                
                当然，VR涉及的是实实在在的技术问题
                
                比如，没有像VR这种天然成型的东西……只有跟踪，渲染和显示。跟踪是在3D空间中记录用户的位置和方向。渲染是为用户构建适当的图像。而显示器则是指硬件可以显示所渲染图像的保真度。
                
                我们需要用心解决这些问题直到用户不会感到不适或不舒服。
                
                所以在未来，我们要去面对和解决这些问题，才能促进技术的不断发展和创新。加油吧！
                
                `
            }
        case '5':
            return {
                banner: AI_IMG,
                detail: 'AI，也就是人工智能，并不仅仅包括机器学习。曾经，符号与逻辑被认为是人工智能实现的关键，而如今则是基于统计的机器学习占据了主导地位。最近火热的深度学习正是机器学习中的一个子项。目前可以说，学习AI主要的是学习机器学习。但是，人工智能并不等同于机器学习，这点在进入这个领域时一定要认识清楚。关于AI领域的发展历史介绍推荐看周老师写的《机器学习简介》。下面一个问题是：AI的门好跨么？其实很不好跨。我们以机器学习为例。在学习过程中，你会面对大量复杂的公式，在实际项目中会面对数据的缺乏，以及艰辛的调参等。如果仅仅是因为觉得这个方向未来会“火”的话，那么这些困难会容易让人放弃。'
            }
        default:
            return "";
    }
}

//方向详情页
export default class Direction extends Component {
    render() {

        if (process.env.TARO_ENV === 'weapp') {
            require('taro-ui/dist/weapp/css/index.css')
        } else if (process.env.TARO_ENV === 'h5') {
            require('taro-ui/dist/h5/css/index.css')
        }

        //获取路由参数
        //形式如: {type:"1",value:"前端"}
        const routeParams = this.$router.params;
        const content = switchBanner(routeParams.type);

        return (
            <View className='direction-wrapper'>
                <View className='at-article'>
                    <Image
                        className='at-article__img'
                        src={content.banner}
                        mode='widthFix' />
                    <View className='at-article__h1'>
                        <Title title={routeParams.value} />
                    </View>
                    <View className='at-article__content'>
                        <View className='at-article__p'>
                            {content.detail}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}