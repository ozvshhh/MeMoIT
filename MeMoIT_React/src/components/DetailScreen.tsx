import { ArrowLeft, ExternalLink, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { motion } from 'motion/react';

interface DetailScreenProps {
  onBack: () => void;
}

export function DetailScreen({ onBack }: DetailScreenProps) {
  const [personalNote, setPersonalNote] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all border-2 border-border"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all border-2 border-border"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'text-[#6B9FED] fill-[#6B9FED]' : 'text-foreground'
              }`}
            />
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-5 py-6 space-y-6 pb-20"
        >
          {/* Thumbnail */}
          <div className="aspect-video bg-muted overflow-hidden rounded-2xl border-2 border-border">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644088379091-d574269d422f?w=800"
              alt="AI 기술의 미래"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Tags */}
          <div>
            <h1 className="text-foreground mb-4" style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-0.02em' }}>
              AI 기술의 미래
            </h1>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] hover:opacity-90 rounded-xl border-0" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                기술
              </Badge>
              <Badge className="bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] hover:opacity-90 rounded-xl border-0" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                지식
              </Badge>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* AI Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6B9FED] to-[#5A8EDD] flex items-center justify-center shadow-md shadow-[#6B9FED]/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>
                AI 요약
              </h3>
            </div>
            <div className="p-5 bg-white rounded-2xl border-2 border-border">
              <p className="text-foreground leading-relaxed" style={{ fontSize: '0.9375rem', lineHeight: '1.7' }}>
                인공지능이 우리의 세상을 어떻게 재구성하고 있는지, 그리고 미래에 어떤 의미를 가질지 탐구합니다. 
                머신러닝에서 신경망에 이르는 AI 기술의 최신 발전을 다루는 포괄적인 개요이며, 
                사회에 대한 잠재적 영향에 대해 논의합니다.
                <br /><br />
                주요 주제에는 AI 연구의 현재 상태, 산업 전반에 걸친 신흥 응용 프로그램, 
                윤리 및 책임 있는 개발에 대한 중요한 고려 사항이 포함됩니다.
              </p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Actions */}
          <Button 
            className="w-full border-2 border-border text-foreground hover:bg-white h-12 rounded-2xl"
            variant="outline"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            원본 링크 열기
          </Button>

          <Separator className="bg-border" />

          {/* Personal Notes */}
          <div className="space-y-4">
            <h3 className="text-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>
              개인 메모
            </h3>
            <Textarea
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="이 콘텐츠에 대한 생각을 추가하세요..."
              rows={6}
              className="border-2 border-border rounded-2xl resize-none bg-white focus-visible:border-[#6B9FED]"
              style={{ fontSize: '0.9375rem' }}
            />
            {personalNote && (
              <Button className="w-full bg-gradient-to-r from-[#6B9FED] to-[#5A8EDD] hover:opacity-90 text-white h-12 rounded-2xl">
                메모 저장
              </Button>
            )}
          </div>
        </motion.div>
      </ScrollArea>
    </div>
  );
}
