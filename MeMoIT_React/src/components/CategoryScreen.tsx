import { ArrowLeft, Briefcase, Heart, BookOpen, Sparkles } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';

interface CategoryScreenProps {
  onBack: () => void;
  onCategorySelect: (category: string) => void;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: any;
  color: string;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 'work',
    name: '일',
    count: 24,
    icon: Briefcase,
    color: '#6B9FED',
    gradient: 'from-[#6B9FED] to-[#5A8EDD]',
  },
  {
    id: 'lifestyle',
    name: '라이프스타일',
    count: 18,
    icon: Heart,
    color: '#6B9FED',
    gradient: 'from-[#6B9FED] to-[#5A8EDD]',
  },
  {
    id: 'knowledge',
    name: '지식',
    count: 32,
    icon: BookOpen,
    color: '#6B9FED',
    gradient: 'from-[#6B9FED] to-[#5A8EDD]',
  },
];

const subCategories = [
  { name: '생산성', count: 12, parent: 'work' },
  { name: '협업툴', count: 12, parent: 'work' },
  { name: '건강', count: 9, parent: 'lifestyle' },
  { name: '여행', count: 9, parent: 'lifestyle' },
  { name: '기술', count: 16, parent: 'knowledge' },
  { name: '과학', count: 16, parent: 'knowledge' },
  { name: '업무관리', count: 8, parent: 'work' },
  { name: '취미', count: 7, parent: 'lifestyle' },
  { name: '경제', count: 11, parent: 'knowledge' },
];

export function CategoryScreen({ onBack, onCategorySelect }: CategoryScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-5 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all border-2 border-border"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h2 className="text-foreground" style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
            카테고리
          </h2>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-5 py-6">
          {/* Main Categories */}
          <div className="mb-8">
            <h3 className="text-muted-foreground mb-4 px-1" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              주요 카테고리
            </h3>
            <div className="space-y-3">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    onClick={() => onCategorySelect(category.id)}
                    className="w-full flex items-center justify-between p-5 bg-white rounded-2xl hover:shadow-md transition-all border-2 border-border hover:border-[#6B9FED]/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md shadow-[#6B9FED]/20`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-foreground mb-0.5" style={{ fontSize: '1rem', fontWeight: 600 }}>
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                          {category.count}개 항목
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Sub Categories */}
          <div>
            <h3 className="text-muted-foreground mb-4 px-1" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              세부 카테고리
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {subCategories.map((subCat, index) => (
                <motion.button
                  key={subCat.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.04, duration: 0.25 }}
                  onClick={() => onCategorySelect(subCat.name.toLowerCase())}
                  className="p-2.5 bg-white rounded-xl border-2 border-border hover:border-[#6B9FED] hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-[#6B9FED] flex-shrink-0" />
                    <span className="text-foreground truncate" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {subCat.name}
                    </span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                    {subCat.count}개
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
