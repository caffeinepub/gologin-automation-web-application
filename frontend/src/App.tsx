import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Header } from './components/Header';
import { ProfileList } from './components/ProfileList';
import { SettingsPanel } from './components/SettingsPanel';
import { ControlButtons } from './components/ControlButtons';
import { LogPanel } from './components/LogPanel';
import { Footer } from './components/Footer';
import { useInitializeProfiles } from './hooks/useQueries';

function App() {
  const initializeProfiles = useInitializeProfiles();

  useEffect(() => {
    initializeProfiles.mutate();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profiles and Settings */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileList />
              <SettingsPanel />
              <ControlButtons />
            </div>

            {/* Right Column - Logs */}
            <div className="lg:col-span-2">
              <LogPanel />
            </div>
          </div>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
