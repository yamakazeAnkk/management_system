import React from 'react';
import { Card, Statistic, Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export interface StatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string; // hex or css color value
  subtitle?: string;
}

interface DashboardStatsProps {
  statistics: StatItem[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ statistics }) => {
  const [width, setWidth] = React.useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const columns = width >= 1200 ? 4 : width >= 768 ? 2 : 1;
  const itemBasis = `${100 / columns}%`;
  const totalPages = Math.max(1, Math.ceil(statistics.length / columns));
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const scrollByAmount = () => {
    const container = scrollRef.current;
    if (!container) return 0;
    // Scroll by one viewport width to move a full "page" of cards
    return container.clientWidth;
  };

  const handleScrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;
    const newPage = currentPage - 1 < 0 ? totalPages - 1 : currentPage - 1;
    container.scrollTo({ left: newPage * scrollByAmount(), behavior: 'smooth' });
    setCurrentPage(newPage);
  };

  const handleScrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;
    const newPage = currentPage + 1 >= totalPages ? 0 : currentPage + 1;
    container.scrollTo({ left: newPage * scrollByAmount(), behavior: 'smooth' });
    setCurrentPage(newPage);
  };

  return (
    <div style={{ position: 'relative', marginBottom: 24 }}>
      <div ref={scrollRef} style={{ overflowX: 'hidden' }}>
        <div style={{ display: 'flex', paddingBottom: 2, flexWrap: 'nowrap' }}>
        {statistics.map((stat, index) => (
          <div key={index} style={{ flex: `0 0 ${itemBasis}`, minWidth: 108, marginRight: 8 }}>
            <Card
              style={{
                height: 148,
                borderRadius: 8,
                border: '1px solid #f0f0f0',
                boxShadow: '0 10px 16px -12px rgba(0,0,0,0.5)'
              }}
              bodyStyle={{ padding: 10, height: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                  <Statistic
                    valueStyle={{ color: stat.color, fontSize: 32 }}
                    title={stat.title}
                    value={stat.value}
                  />
                  {stat.subtitle && (
                    <Typography.Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                      {stat.subtitle}
                    </Typography.Text>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 32, marginLeft: 8 }}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </div>
        ))}
        </div>
      </div>
      <Button
        type="default"
        shape="circle"
        size="small"
        icon={<LeftOutlined />}
        onClick={handleScrollLeft}
        style={{ position: 'absolute', top: '50%', left: -8, transform: 'translateY(-50%)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
      />
      <Button
        type="default"
        shape="circle"
        size="small"
        icon={<RightOutlined />}
        onClick={handleScrollRight}
        style={{ position: 'absolute', top: '50%', right: -8, transform: 'translateY(-50%)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
      />
      {/* Page indicator */}
      <div style={{ textAlign: 'center', marginTop: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  );
};

export default DashboardStats;


