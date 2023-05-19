import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AppHeader from "../Component/AppHeader";
import AppFooter from "../Component/Footer";
import {NoteList} from "../Component/Content/NoteList";
import {AppContent} from "../Component/AppContent";
import {useNavigate} from "react-router-dom";
import {doGet} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import SearchBar from "../Component/SearchBar";

const HomeView = (props) => {
    // const [Notes,setNotes]=useState([]);
    // useEffect(async () => {
    //     let notesInfo = await doGet('/Travelogue');
    //     setNotes(resp2Json(notesInfo));
    //     console.log("notesInfo"+JSON.stringify(notesInfo));
    // },[])
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notesInfo = await doGet('/Travelogue');
                // console.log("notesInfo111111111" + JSON.stringify(notesInfo));
                const parsedNotes = resp2Json(notesInfo);
                console.log("notesInfo" + JSON.stringify(notesInfo.data));
                setNotes(parsedNotes.data);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };

        fetchData();
    }, []);

    // const notes = [
    //     {
    //         title: '西湖印象',
    //         summary: '西泠印社坐落于孤山南麓、西泠桥畔，于方寸中藏万千气象，堪称西湖园林艺术的精华。',
    //         imageUrl: 'https://pic3.zhimg.com/v2-d348949f4f1b98d153aaef1a1d01d0c2_b.webp?consumer=ZHI_MENG',
    //         author: { name: '山川游客', avatarUrl: 'https://img.wxcha.com/m00/12/db/594dd9fb43029a58df9acc0e4591d94b.jpg' },
    //         views: 100,
    //         likes: 10,
    //     },
    //     {
    //         title: '西泠印社',
    //         summary: '西泠印社是个很静谧的地方，只是在饭点的时候，隔壁“楼外楼”炒菜声烟火气就传了进来' ,
    //         imageUrl: 'https://pic3.zhimg.com/v2-27eadbc73a98670ccc08e9712b4aa0ee_b.webp?consumer=ZHI_MENG',
    //         author: { name: '上海徐霞客', avatarUrl: 'https://img.wxcha.com/m00/65/4e/89433954b6fdfacab88ffcdb8e84158e.jpg' },
    //         views: 200,
    //         likes: 20,
    //     },
    //     {
    //         title: '巴厘岛游记',
    //         summary: '是没想到，提笔写此篇 巴厘岛 之行的回忆时，是此番境况。\n' +
    //             '\n' +
    //             '19年时久居龙目岛，想要去 巴厘岛 只需买一张100多块钱的机票，不到一个小时便可抵达那个热闹的小岛。\n' +
    //             '\n' +
    //             '那时候总觉得去一趟周围的岛屿是很容易的事，所以拖了又拖才动了身。',
    //         imageUrl: 'https://dimg04.c-ctrip.com/images/01019120008gm9rczEEBF_R_1024_10000_Q90.jpg?proc=autoorient',
    //         author: { name: '交大彭于晏', avatarUrl: 'https://img.wxcha.com/m00/90/a5/d1d167451213c94da52f7ddf31d8da3b.jpg' },
    //         views: 200,
    //         likes: 20,
    //     },
    //     {
    //         title: '库塔 | 寻一处小众海滩，去看岩石和海浪',
    //         summary: '库塔的交通还是非常方便的，在这里可以选择出租车、网约车（grab）或者包车。\n' +
    //             '\n' +
    //             '为了方便我们提前预定了一天包车，不得不说 巴厘岛 的包车价格真的不算贵，10个小时之内不超区的价格是200一车，我们两个人相当于人均100元。\n' +
    //             '\n' +
    //             '只需要自己规划好行程路线，确定好出发日期与时间，司机当天就会按时来接。\n' +
    //             '\n' +
    //             '当天早晨的天气非常晴朗，大朵大朵云团自在的飘在空中，此番天气总是令人雀跃。\n' +
    //             '\n' +
    //             'Pantai Tegal Beach在一座悬崖下，站在高处眺望可以看到这儿的海岸线是绵长的， 和龙 目岛一样，巴厘岛 的南部也有着许多独特的的地形',
    //         imageUrl: 'https://dimg04.c-ctrip.com/images/0106k120008gm9uwm86F1_R_1024_10000_Q90.jpg?proc=autoorient',
    //         author: { name: '巴山夜雨秋池宿', avatarUrl: 'https://dimg04.c-ctrip.com/images/01043120008gm9q7931F2_R_800_10000_Q90.jpg?proc=autoorient' },
    //         views: 223,
    //         likes: 200,
    //     },
    //     {
    //         title: '库塔 | 寻一处小众海滩，去看岩石和海浪',
    //         summary: '库塔的交通还是非常方便的，在这里可以选择出租车、网约车（grab）或者包车。\n' +
    //             '\n' +
    //             '为了方便我们提前预定了一天包车，不得不说 巴厘岛 的包车价格真的不算贵，10个小时之内不超区的价格是200一车，我们两个人相当于人均100元。\n' +
    //             '\n' +
    //             '只需要自己规划好行程路线，确定好出发日期与时间，司机当天就会按时来接。\n' +
    //             '\n' +
    //             '当天早晨的天气非常晴朗，大朵大朵云团自在的飘在空中，此番天气总是令人雀跃。\n' +
    //             '\n' +
    //             'Pantai Tegal Beach在一座悬崖下，站在高处眺望可以看到这儿的海岸线是绵长的， 和龙 目岛一样，巴厘岛 的南部也有着许多独特的的地形',
    //         imageUrl: 'https://dimg04.c-ctrip.com/images/01018120008gm9zo3262C_R_1024_10000_Q90.jpg?proc=autoorient',
    //         author: { name: '巴山夜雨秋池宿', avatarUrl: 'https://dimg04.c-ctrip.com/images/01043120008gm9q7931F2_R_800_10000_Q90.jpg?proc=autoorient' },
    //         views: 223,
    //         likes: 200,
    //     },
    //     {
    //         title: '库塔 | 寻一处小众海滩，去看岩石和海浪',
    //         summary: 'Pantai Tegal Beach的游玩受潮汐影响比较大，若是涨潮，海水会一直漫过礁石，行人几乎无从下脚，这种情况下基本上就是无法游览了。\n' +
    //             '\n' +
    //             '若是退潮，沙滩上由岩石形成的一个个凹陷处都像是天然浴缸，在这儿拍照也是很有意思的。\n' +
    //             '\n' +
    //             '时间段不同，潮汐也不同，如果想要有好的游玩体验可以提前查看潮汐表。\n' +
    //             '\n' +
    //             '值得一提的是，有时这儿的浪非常大也非常猛，在拍照游玩时一定要注意安全，带小朋友的也一定要时刻盯着他们。',
    //         imageUrl: 'https://dimg04.c-ctrip.com/images/0106o120008gm9u6sD07C_R_1024_10000_Q90.jpg?proc=autoorient',
    //         author: { name: '波奇今天要加油', avatarUrl: 'https://img.wxcha.com/m00/39/43/e6ae8ffa55fb94cb153dc68478f34487.jpg' },
    //         views: 223,
    //         likes: 200,
    //     },
    //     {
    //         title: '库塔 | 寻一处小众海滩，去看岩石和海浪',
    //         summary: 'Pantai Tegal Beach绝不是单调的沙滩，这里散落着许多岩石，而沙滩背靠的大岩石给这里增添了一份阴凉，若是带上浴巾躺在这儿吹海风纳凉也是极舒服的。',
    //         imageUrl: 'https://dimg04.c-ctrip.com/images/01043120008gm9q7931F2_R_1024_10000_Q90.jpg?proc=autoorient',
    //         author: { name: '面朝大海春暖花开', avatarUrl: 'https://dimg04.c-ctrip.com/images/0100z120008gm9snr1250_R_800_10000_Q90.jpg?proc=autoorient' },
    //         views: 223,
    //         likes: 200,
    //     },
    //     // ...
    // ];
        return(
            <Layout>
                <AppHeader />

                    <AppContent children={<NoteList notes={notes} />}/>
                <AppFooter/>
            </Layout>
        )

}
export default HomeView;