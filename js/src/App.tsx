import { useEffect, useState } from '@lynx-js/react';
import './App.css';
import type {
  BaseTouchEvent,
  ScrollEndEvent,
  ScrollEvent,
  Target,
} from '@lynx-js/types';
import { nearestMultiple } from './lib/tools';

type BannerItem = {
  id: number;
  title: string;
  subtitle: string;
  bg: string;
};

const bannerList: BannerItem[] = [
  {
    id: 1,
    title: '1海边假日',
    subtitle: '精选海岛酒店低至 5 折',
    bg: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  },
  {
    id: 2,
    title: '2城市周末',
    subtitle: '本地热门玩乐一站购齐',
    bg: 'linear-gradient(135deg, #f97316 0%, #fb7185 100%)',
  },
  {
    id: 3,
    title: '3山野露营',
    subtitle: '露营装备限时满减',
    bg: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
  },
];

export function App() {
  // const [isScrolling, setIsScrolling] = useState(false);
  function handleScrollEnd(e: ScrollEndEvent) {
    console.log('scrollend/left', e.detail.scrollLeft);
    // 如果正在自动调整中，跳过
    // if (isScrolling) {
    //   setIsScrolling(false);
    //   return;
    // }
    if (e.detail.scrollLeft < 0) {
      return;
    }
    if (e.detail.scrollLeft % 1280 === 0) {
      return;
    }
    const foo = nearestMultiple(e.detail.scrollLeft, 1280);
    console.log('>>>>' + foo);
    // 设置滚动状态为正在调整
    // setIsScrolling(true);
    // lynx
    //   .createSelectorQuery()
    //   .select(`#scroll`)
    //   .invoke({
    //     method: 'scrollTo',
    //     params: {
    //       offset: foo, // offset 设置内容偏移量绝对值
    //       smooth: true, // smooth 设置是否平滑滚动
    //     },
    //   })
    //   .exec();
  }

  return (
    <view class="flex   relative" style={styles.page}>
      <scroll-view
        id="scroll"
        class=" h-[800px] w-[1280px]"
        style={styles.page}
        scroll-x={true}
        bounces={false}
        bindscrollend={handleScrollEnd}
      >
        <view class="flex w-[3840px] h-[800px] border ">
          {bannerList.map((item) => (
            <view
              id={'k' + item.id}
              class=""
              style={{ ...styles.page, background: item.bg }}
            >
              <view style={{ background: item.bg }}>
                <text>{item.title}</text>
              </view>
            </view>
          ))}
        </view>
      </scroll-view>
      <text class="border bg-black z-50 text-red-600 absolute top-0 right-0 w-24">
        BTN
      </text>
    </view>
  );
}

const styles = {
  page: {
    height: '800px',
    width: '1280px',
  },
} as const;
