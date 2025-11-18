import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { motion } from 'motion/react';
import { Link as LinkIcon, X, Plus, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface OnboardingStep1Props {
  onNext: () => void;
}

export function OnboardingStep1({ onNext }: OnboardingStep1Props) {
  const [urlInput, setUrlInput] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [aiSummary, setAiSummary] = useState('');
  const [personalMemo, setPersonalMemo] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const isUrl = urlInput.startsWith('http://') || urlInput.startsWith('https://');
  const canProceed = urlInput.trim() !== '';

  const handleAnalyze = () => {
    // Mock AI analysis
    setIsAnalyzed(true);
    setTitle('AI 기술의 미래와 혁신');
    setKeywords(['인공지능', '기술']);
    setAiSummary('이 글은 인공지능 기술의 발전과 그것이 우리 일상에 미치는 영향에 대해 다룹니다. 최신 AI 트렌드와 실생활 적용 사례를 소개하며, 앞으로의 기술 발전 방향을 제시합니다.');
    setPersonalMemo('');
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Content */}
      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6 mt-4"
        >
          <h1 className="text-foreground mb-4" style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.3' }}>
            URL을 붙여넣고<br />시작하세요
          </h1>
          <p className="text-muted-foreground mb-3" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>
            저장하고 싶은 콘텐츠의 URL을 붙여넣으면<br />
            AI가 자동으로 분석하고 정리해드립니다.
          </p>
        </motion.div>

        {!isAnalyzed ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex-1 space-y-4 mb-6"
          >
            {/* URL Input */}
            <div className="bg-white rounded-2xl p-5 border-2 border-border shadow-sm hover:border-[#6B9FED]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B9FED]/20 to-[#6B9FED]/10 flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="w-5 h-5 text-[#6B9FED]" />
                </div>
                <h3 className="text-foreground" style={{ fontWeight: 600 }}>
                  URL
                </h3>
              </div>
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#6B9FED] transition-colors"
                style={{ fontSize: '0.9375rem' }}
              />
              {isUrl && (
                <div className="mt-3 px-3 py-2 bg-[#6B9FED]/10 rounded-lg border border-[#6B9FED]/20">
                  <p className="text-xs text-[#6B9FED]" style={{ fontWeight: 500 }}>
                    ✓ 유효한 URL입니다
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gradient-to-r from-[#6B9FED]/10 to-[#6B9FED]/5 rounded-2xl border border-[#6B9FED]/20">
              <p className="text-sm text-foreground text-center" style={{ fontWeight: 500 }}>
                💡 AI가 자동으로 제목, 키워드, 요약을 생성해드려요
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Button
                onClick={handleAnalyze}
                disabled={!canProceed}
                className="w-full h-14 bg-gradient-to-r from-[#6B9FED] to-[#5A8EDD] text-white hover:opacity-90 rounded-2xl transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                분석하기
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5 mb-6"
          >
            {/* Title */}
            <div className="bg-white rounded-2xl p-5 border-2 border-border">
              <label className="text-foreground mb-2 block" style={{ fontWeight: 600 }}>
                제목
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background border-border focus-visible:border-[#6B9FED]"
                style={{ fontSize: '0.9375rem' }}
              />
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-2xl p-5 border-2 border-border">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#6B9FED]" />
                <label className="text-foreground" style={{ fontWeight: 600 }}>
                  키워드
                </label>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className="bg-gradient-to-r from-[#6B9FED]/20 to-[#6B9FED]/10 text-[#6B9FED] hover:opacity-90 rounded-lg border-0 pr-1"
                  >
                    <span className="mr-1">{keyword}</span>
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="ml-1 hover:bg-[#6B9FED]/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                  placeholder="키워드 추가"
                  className="flex-1 bg-background border-border focus-visible:border-[#6B9FED]"
                  style={{ fontSize: '0.875rem' }}
                />
                <Button
                  onClick={handleAddKeyword}
                  size="sm"
                  className="bg-gradient-to-r from-[#6B9FED] to-[#5A8EDD] text-white hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white rounded-2xl p-5 border-2 border-border">
              <label className="text-foreground mb-2 block" style={{ fontWeight: 600 }}>
                AI 요약
              </label>
              <Textarea
                value={aiSummary}
                onChange={(e) => setAiSummary(e.target.value)}
                className="min-h-[100px] bg-background border-border focus-visible:border-[#6B9FED] resize-none"
                style={{ fontSize: '0.9375rem' }}
              />
            </div>

            {/* Personal Memo */}
            <div className="bg-white rounded-2xl p-5 border-2 border-border">
              <label className="text-foreground mb-2 block" style={{ fontWeight: 600 }}>
                개인 메모
              </label>
              <Textarea
                value={personalMemo}
                onChange={(e) => setPersonalMemo(e.target.value)}
                placeholder="이 콘텐츠에 대한 개인적인 생각을 자유롭게 작성해보세요..."
                className="min-h-[120px] bg-background border-border focus-visible:border-[#6B9FED] resize-none"
                style={{ fontSize: '0.9375rem' }}
              />
            </div>

            <Button
              onClick={onNext}
              className="w-full h-14 bg-gradient-to-r from-[#6B9FED] to-[#5A8EDD] text-white hover:opacity-90 rounded-2xl transition-all shadow-sm"
              style={{ fontWeight: 600 }}
            >
              시작하기
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
