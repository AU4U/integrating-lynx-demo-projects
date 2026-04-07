import { useEffect, useState } from '@lynx-js/react';
import './App.css';
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

const CARD_WIDTH = 360;
const CARD_GAP = 8;
const STEP = CARD_WIDTH + CARD_GAP;

export function App() {
  const [current, setCurrent] = useState(0);

  const scrollLeft = current * STEP;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevState) => {
        return (prevState + 1) % 3;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (event: { detail?: { scrollLeft?: number } }) => {
    const left = event.detail?.scrollLeft ?? 0;
    const idx = Math.round(left / STEP);
    const next = Math.max(0, Math.min(idx, bannerList.length - 1));
    if (next !== current) {
      setCurrent(next);
    }
  };

  return (
    <view style={styles.page}>
      <view className={'text-4xl text-white'}>当前的索引是{current}</view>
      {current}
      <text className="text-white">Hello this is a test + {current}</text>
      <scroll-view
        style={styles.swiper}
        scroll-x={true}
        scroll-left={scrollLeft}
        bindscroll={handleScroll}
      >
        <view style={styles.track}>
          {bannerList.map((item) => (
            <view key={item.id} style={styles.slideWrap}>
              <view style={{ ...styles.slideCard, background: item.bg }}>
                <text style={styles.slideTitle}>{item.title}</text>
                <text style={styles.slideSubtitle}>{item.subtitle}</text>
              </view>
            </view>
          ))}
        </view>
      </scroll-view>
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
