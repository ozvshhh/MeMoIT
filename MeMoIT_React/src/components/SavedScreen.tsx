import { Bookmark, Search } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { motion } from 'motion/react';

interface SavedScreenProps {
  onCardClick: (card: any) => void;
}

const savedMemos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?w=400',
    title: 'AI 기술의 미래',
    summary: '인공지능이 바꿀 우리의 일상',
    subKeyword: '기술',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1504548840739-580b10ae7715?w=400',
    title: '미니멀 라이프',
    summary: '덜어내는 삶의 지혜',
    subKeyword: '취미',
  },
];

export function SavedScreen({ onCardClick }: SavedScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-foreground mb-5" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          저장됨
        </h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="저장한 콘텐츠 검색"
            className="pl-11 h-12 bg-white border-2 border-border rounded-2xl focus-visible:border-[#6B9FED]"
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="px-5 py-4">
          <div className="text-muted-foreground mb-4 text-sm">
            {savedMemos.length}개의 저장된 콘텐츠
          </div>

          <div className="grid grid-cols-2 gap-3">
            {savedMemos.map((memo, index) => (
              <motion.div
                key={memo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
                onClick={() => onCardClick(memo)}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-2 border-border hover:border-[#6B9FED]/30"
              >
                <div className="aspect-square bg-muted overflow-hidden relative">
                  <ImageWithFallback
                    src={memo.thumbnail}
                    alt={memo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <Bookmark className="w-4 h-4 text-[#6B9FED] fill-[#6B9FED]" />
                  </div>
                </div>
                
                <div className="p-3.5">
                  <Badge className="mb-2 bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] hover:opacity-90 rounded-lg border-0" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    {memo.subKeyword}
                  </Badge>
                  <h3 className="text-foreground mb-1.5 line-clamp-2" style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: '1.35' }}>
                    {memo.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-1" style={{ fontSize: '0.8125rem', lineHeight: '1.4' }}>
                    {memo.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
