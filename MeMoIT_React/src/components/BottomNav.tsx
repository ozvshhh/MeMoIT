import { Home, Grid3x3, Bookmark, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: 'home' | 'add' | 'category' | 'saved';
  onTabChange: (tab: 'home' | 'add' | 'category' | 'saved') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: '홈', color: 'from-[#6B9FED] to-[#5A8EDD]' },
    { id: 'add' as const, icon: Plus, label: '추가', color: 'from-[#6B9FED] to-[#5A8EDD]' },
    { id: 'category' as const, icon: Grid3x3, label: '카테고리', color: 'from-[#6B9FED] to-[#5A8EDD]' },
    { id: 'saved' as const, icon: Bookmark, label: '저장됨', color: 'from-[#6B9FED] to-[#5A8EDD]' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-border safe-area-bottom shadow-sm">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-1 py-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center flex-1 py-1.5 px-2 transition-colors relative rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-10 h-10 rounded-xl mb-1 flex items-center justify-center transition-all ${
                  isActive ? `bg-gradient-to-br ${tab.color} shadow-md shadow-[#6B9FED]/20` : ''
                }`}>
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white stroke-[2.5]' : 'text-muted-foreground stroke-[1.5]'
                    }`}
                  />
                </div>
                <span 
                  className={`transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ fontSize: '0.6875rem', fontWeight: isActive ? 600 : 500 }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
