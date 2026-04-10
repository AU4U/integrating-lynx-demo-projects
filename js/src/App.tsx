import { useEffect, useRef, useState } from '@lynx-js/react';
import './App.css';
import type {
  BaseTouchEvent,
  ScrollEndEvent,
  ScrollEvent, Target,
  TouchStartProps
} from '@lynx-js/types';

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
  const [currentKey, setCurrentKey] = useState<number>(1);
  const [touchStart, setTouchStart] = useState(0);

  const handleTounchMove = (event: any) => {
    console.log('handleTouchMove');
    // console.log('>>>' + JSON.stringify(event));
  };
  const handleTouchEnd = (event: any) => {
    console.log('handleTouchEnd');
    // console.log('>>>' + JSON.stringify(event));
  };
  function scrollIntoView(foo: number) {
    lynx
      .createSelectorQuery()
      .select('#k' + foo)
      .invoke({
        method: 'scrollIntoView',
        params: {
          scrollIntoViewOptions: {
            block: 'center', // 纵向对齐方式: “start" 顶对齐 | "center" 居中对齐 | "end" 底对齐
            inline: 'start', // 横向对齐方式： "start" 左对齐 | "center" 居中对齐 | "end" 右对齐
            behavior: 'smooth', // 'smooth', // "smooth" | "none" 可选，指顶滚动是否带有动画
          },
        },
        success: (res) => {
          console.log('scrollIntoView success:' + JSON.stringify(res));
        },
        fail: (err) => {
          console.log('scrollIntoView error:' + JSON.stringify(err));
        },
      })
      .exec();
  }
  useEffect(() => {
    scrollIntoView(currentKey);
  }, [currentKey]);
  const handleClickBtn = () => {
    setCurrentKey(currentKey + 1);
  };
  // useEffect(() => {
  //   console.log('effect interpolation:' + interpolation);
  //   // if (interpolation > 100) {
  //   //   const foo = currentKey + 1;
  //   //   console.log(' 大于100 /' + foo);
  //   //   scrollIntoView(foo);
  //   // } else if (interpolation < -100) {
  //   //   console.log(' 小于-100');
  //   //   setCurrentKey(currentKey - 1);
  //   // } else {
  //   //   console.log('小于 100 大于 -100');
  //   // }
  const onTouchStart = (event: BaseTouchEvent<Target>) => {
    console.log(event);
  };

  // }, [interpolation]);
  return (
    <view style={styles.page}>
      <text className="text-white">{currentKey}</text>
      <scroll-view
        id="scroll"
        style={styles.swiper}
        scroll-x={true}
        // bindscroll={handleScroll}
        // bindscrollend={handleScrollEnd}
        bindtouchstart={onTouchStart}
        bindtouchmove={handleTounchMove}
        bindtouchend={handleTouchEnd}
      >
        <view style={styles.track}>
          {bannerList.map((item) => (
            <view id={'k' + item.id} style={styles.slideWrap}>
              <view style={{ ...styles.slideCard, background: item.bg }}>
                <text style={styles.slideTitle}>{item.title}</text>
                <text style={styles.slideSubtitle}>{item.subtitle}</text>
              </view>
            </view>
          ))}
        </view>
      </scroll-view>
      <text
        className="items-center flex justify-center border text-white w-24 h-16"
        bindtap={handleClickBtn}
      >
        {'btn' + currentKey}
      </text>
    </view>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    marginTop: '24px',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#f8fafc',
  },
  swiper: {
    width: '100%',
    maxWidth: '360px',
    height: '220px',
  },
  track: {
    display: 'flex',
    flexDirection: 'row',
    height: '220px',
  },
  slideWrap: {
    width: '360px',
    height: '220px',
    paddingRight: '8px',
    boxSizing: 'border-box',
    flexShrink: '0',
  },
  slideCard: {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  slideTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '8px',
  },
  slideSubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  dotRow: {
    marginTop: '14px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    backgroundColor: 'rgba(148, 163, 184, 0.6)',
  },
  dotActive: {
    width: '20px',
    backgroundColor: '#f8fafc',
  },
  desc: {
    marginTop: '16px',
    fontSize: '15px',
    color: '#cbd5e1',
  },
} as const;
