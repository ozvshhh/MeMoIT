import { useState } from 'react';
import { motion } from 'motion/react';
import { Link as LinkIcon, X, Plus, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AddScreenProps {
  onSave?: () => void;
}

export function AddScreen({ onSave }: AddScreenProps) {
  const [urlInput, setUrlInput] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [aiSummary, setAiSummary] = useState('');
  const [personalMemo, setPersonalMemo] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

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

  const handleSave = () => {
    // Save logic here
    if (onSave) onSave();
  };

  const isUrl = urlInput.startsWith('http://') || urlInput.startsWith('https://');

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6B9FED] to-[#5A8EDD] flex items-center justify-center shadow-lg shadow-[#6B9FED]/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-foreground" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            추가하기
          </h1>
        </div>

        {/* URL Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <LinkIcon className={`w-4 h-4 ${isUrl ? 'text-[#6B9FED]' : 'text-muted-foreground'}`} />
          </div>
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="URL을 붙여넣으세요"
            className="pl-11 pr-24 h-14 bg-white border-2 border-border focus-visible:border-[#6B9FED] rounded-2xl shadow-sm transition-all"
            style={{ fontSize: '0.9375rem' }}
          />
          {urlInput && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleAnalyze}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#6B9FED] to-[#5A8EDD] rounded-xl text-sm text-white shadow-sm"
              style={{ fontWeight: 600 }}
            >
              분석하기
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {!isAnalyzed ? (
          <div className="flex flex-col items-center justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6B9FED]/20 to-[#6B9FED]/10 flex items-center justify-center">
                <LinkIcon className="w-10 h-10 text-[#6B9FED]" />
              </div>
              <h3 className="text-foreground mb-2" style={{ fontWeight: 600 }}>
                URL을 붙여넣어주세요
              </h3>
              <p className="text-muted-foreground">
                AI가 자동으로 콘텐츠를 분석하고<br />
                정리해드립니다
              </p>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setIsAnalyzed(false);
                  setUrlInput('');
                }}
                variant="outline"
                className="flex-1 h-12 border-2 border-border text-foreground hover:bg-white rounded-2xl"
              >
                취소
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 h-12 bg-gradient-to-r from-[#6B9FED] to-[#5A8EDD] text-white hover:opacity-90 rounded-2xl"
                style={{ fontWeight: 600 }}
              >
                저장하기
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
