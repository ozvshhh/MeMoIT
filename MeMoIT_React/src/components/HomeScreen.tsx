import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface MemoCard {
  id: string;
  thumbnail: string;
  title: string;
  summary: string;
  mainKeyword: string;
  subKeyword: string;
}

interface HomeScreenProps {
  onCardClick: (card: MemoCard) => void;
  isEmpty?: boolean;
}

const mainKeywords = [
  { 
    id: 'work', 
    label: '일', 
    color: 'from-[#6B9FED]/20 to-[#6B9FED]/10',
    textColor: 'text-[#6B9FED]',
    subKeywords: ['생산성', '협업툴', '업무관리', '프로젝트', '시간관리']
  },
  { 
    id: 'lifestyle', 
    label: '라이프스타일', 
    color: 'from-[#6B9FED]/20 to-[#6B9FED]/10',
    textColor: 'text-[#6B9FED]',
    subKeywords: ['건강', '여행', '취미', '요리', '운동']
  },
  { 
    id: 'knowledge', 
    label: '지식', 
    color: 'from-[#6B9FED]/20 to-[#6B9FED]/10',
    textColor: 'text-[#6B9FED]',
    subKeywords: ['기술', '과학', '경제', '역사', '예술']
  },
];

const mockMemos: MemoCard[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?w=400',
    title: 'AI 기술의 미래',
    summary: '인공지능이 바꿀 우리의 일상',
    mainKeyword: 'knowledge',
    subKeyword: '기술',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1622086674545-1346776dfef5?w=400',
    title: '효율적인 업무 환경',
    summary: '생산성을 높이는 방법',
    mainKeyword: 'work',
    subKeyword: '생산성',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1504548840739-580b10ae7715?w=400',
    title: '미니멀 라이프',
    summary: '덜어내는 삶의 지혜',
    mainKeyword: 'lifestyle',
    subKeyword: '취미',
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1635788181951-0799bdb87263?w=400',
    title: '창의적 협업',
    summary: '팀워크를 높이는 전략',
    mainKeyword: 'work',
    subKeyword: '협업툴',
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?w=400',
    title: '건강한 습관',
    summary: '매일 실천하는 운동 루틴',
    mainKeyword: 'lifestyle',
    subKeyword: '건강',
  },
  {
    id: '6',
    thumbnail: 'https://images.unsplash.com/photo-1622086674545-1346776dfef5?w=400',
    title: '과학의 세계',
    summary: '호기심을 채우는 지식',
    mainKeyword: 'knowledge',
    subKeyword: '과학',
  },
];

export function HomeScreen({ onCardClick, isEmpty = false }: HomeScreenProps) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedMain, setSelectedMain] = useState('work');
  const [selectedSub, setSelectedSub] = useState('생산성');
  const [showAllSubs, setShowAllSubs] = useState(false);

  const currentMainKeyword = mainKeywords.find(k => k.id === selectedMain);
  const displayedSubKeywords = showAllSubs 
    ? currentMainKeyword?.subKeywords || []
    : currentMainKeyword?.subKeywords.slice(0, 5) || [];
  
  const filteredMemos = mockMemos.filter(
    memo => memo.mainKeyword === selectedMain && (!selectedSub || memo.subKeyword === selectedSub)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-5 pt-5 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6B9FED] to-[#5A8EDD] flex items-center justify-center shadow-lg shadow-[#6B9FED]/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-foreground" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            MemoIt
          </h1>
        </div>

        {/* Search with Filter */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="키워드를 입력하세요"
              className="pl-11 pr-4 h-12 bg-white border-2 border-border focus-visible:border-[#6B9FED] rounded-2xl shadow-sm transition-all"
              style={{ fontSize: '0.9375rem' }}
            />
          </div>

          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-12 h-12 flex items-center justify-center bg-white border-2 border-border hover:border-[#6B9FED] rounded-2xl transition-all shadow-sm">
                <Filter className="w-4 h-4 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>카테고리 필터</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Main Categories */}
                <div>
                  <h3 className="text-muted-foreground text-sm mb-3 px-1" style={{ fontWeight: 600 }}>
                    대표 카테고리
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {mainKeywords.map((keyword) => (
                      <button
                        key={keyword.id}
                        onClick={() => {
                          setSelectedMain(keyword.id);
                          setSelectedSub(keyword.subKeywords[0]);
                          setShowAllSubs(false);
                        }}
                        className={`px-3 py-3 rounded-2xl transition-all border-2 ${
                          selectedMain === keyword.id
                            ? `bg-gradient-to-br ${keyword.color} border-transparent shadow-sm`
                            : 'bg-white border-border hover:border-[#6B9FED]/30'
                        }`}
                      >
                        <div className={`text-sm ${selectedMain === keyword.id ? keyword.textColor : 'text-foreground'}`} style={{ fontWeight: 600, lineHeight: '1.3' }}>
                          {keyword.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub Keywords */}
                <div>
                  <h3 className="text-muted-foreground text-sm mb-3 px-1" style={{ fontWeight: 600 }}>
                    세부 키워드
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayedSubKeywords.map((subKeyword) => (
                      <button
                        key={subKeyword}
                        onClick={() => setSelectedSub(subKeyword)}
                        className={`px-4 py-2 rounded-xl transition-all text-sm border-2 ${
                          selectedSub === subKeyword
                            ? `bg-gradient-to-r ${currentMainKeyword?.color} ${currentMainKeyword?.textColor} border-transparent shadow-sm`
                            : 'bg-white text-muted-foreground border-border hover:border-[#6B9FED]/30'
                        }`}
                        style={{ fontWeight: selectedSub === subKeyword ? 600 : 500 }}
                      >
                        {subKeyword}
                      </button>
                    ))}
                  </div>
                  
                  {/* Toggle Button */}
                  {currentMainKeyword && currentMainKeyword.subKeywords.length > 5 && (
                    <button
                      onClick={() => setShowAllSubs(!showAllSubs)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto pt-2"
                      style={{ fontWeight: 500 }}
                    >
                      <span>{showAllSubs ? '접기' : '더보기'}</span>
                      {showAllSubs ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Current Filter Display */}
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] rounded-lg border-0">
            {currentMainKeyword?.label}
          </Badge>
          {selectedSub && (
            <Badge className="bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] rounded-lg border-0">
              {selectedSub}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6B9FED]/20 to-[#6B9FED]/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#6B9FED]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-foreground mb-2" style={{ fontWeight: 600 }}>
                아직 저장된 링크가 없습니다
              </h3>
              <p className="text-muted-foreground">
                추가 탭에서 URL을 붙여넣어 첫 메모를 시작해보세요!
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="px-5 py-4">
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="wait">
                {filteredMemos.map((memo, index) => (
                  <motion.div
                    key={memo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                    onClick={() => onCardClick(memo)}
                    className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer border-2 border-border hover:border-[#6B9FED]/30"
                  >
                    <div className="aspect-square bg-gradient-to-br from-muted to-background overflow-hidden">
                      <ImageWithFallback
                        src={memo.thumbnail}
                        alt={memo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-3.5">
                      <Badge
                        className="mb-2 bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] hover:opacity-90 rounded-lg border-0"
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                      >
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
              </AnimatePresence>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
