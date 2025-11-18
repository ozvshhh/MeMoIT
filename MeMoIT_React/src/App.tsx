import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingStep1 } from './components/OnboardingStep1';
import { HomeScreen } from './components/HomeScreen';
import { AddScreen } from './components/AddScreen';
import { DetailScreen } from './components/DetailScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { SavedScreen } from './components/SavedScreen';
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type Screen = 'splash' | 'welcome' | 'login' | 'onboarding' | 'main' | 'detail';
type MainTab = 'home' | 'add' | 'category' | 'saved';

interface MemoCard {
  id: string;
  thumbnail: string;
  title: string;
  summary: string;
  mainKeyword: string;
  subKeyword: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [selectedCard, setSelectedCard] = useState<MemoCard | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen('welcome');
  };

  const handleWelcomeComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('onboarding');
  };

  const handleGuest = () => {
    setCurrentScreen('main');
    setIsEmpty(true);
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('main');
    setIsEmpty(false);
  };

  const handleAddSave = () => {
    toast.success('메모가 저장되었습니다', {
      duration: 2000,
    });
    setActiveTab('home');
    setIsEmpty(false);
  };

  const handleCardClick = (card: MemoCard) => {
    setSelectedCard(card);
    setCurrentScreen('detail');
  };

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
  };

  const handleCategorySelect = (category: string) => {
    toast.success(`${category} 카테고리`, {
      duration: 2000,
    });
    setActiveTab('home');
  };

  const showBottomNav = currentScreen === 'main';

  return (
    <>
      <div className="max-w-md mx-auto bg-background shadow-2xl min-h-screen overflow-hidden">
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}

        {currentScreen === 'welcome' && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}

        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} onGuest={handleGuest} />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingStep1 onNext={handleOnboardingComplete} />
        )}
        
        {currentScreen === 'main' && (
          <>
            {activeTab === 'home' && (
              <HomeScreen 
                onCardClick={handleCardClick}
                isEmpty={isEmpty}
              />
            )}

            {activeTab === 'add' && (
              <AddScreen onSave={handleAddSave} />
            )}
            
            {activeTab === 'category' && (
              <CategoryScreen 
                onBack={() => setActiveTab('home')}
                onCategorySelect={handleCategorySelect}
              />
            )}
            
            {activeTab === 'saved' && (
              <SavedScreen onCardClick={handleCardClick} />
            )}
          </>
        )}
        
        {currentScreen === 'detail' && (
          <DetailScreen onBack={() => setCurrentScreen('main')} />
        )}

        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>

      <Toaster 
        toastOptions={{
          style: {
            background: '#ffffff',
            border: '1px solid #E8E8E8',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        }}
      />
    </>
  );
}
