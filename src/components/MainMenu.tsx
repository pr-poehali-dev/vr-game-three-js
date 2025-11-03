import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MainMenuProps {
  onStart: () => void;
  onInstructions: () => void;
  showInstructions: boolean;
  onCloseInstructions: () => void;
}

export default function MainMenu({
  onStart,
  onInstructions,
  showInstructions,
  onCloseInstructions,
}: MainMenuProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background flex items-center justify-center">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-7xl font-black tracking-wider glow-cyan animate-fade-in">
            NEON RUNNER
          </h1>
          <p className="text-xl text-muted-foreground tracking-widest">
            VR ПАРКУР В КИБЕРПРОСТРАНСТВЕ
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-2 border-primary/50 p-8 space-y-6">
          <Button
            onClick={onStart}
            size="lg"
            className="w-full text-xl py-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 border-2 border-primary shadow-lg shadow-primary/50 transition-all duration-300 hover:scale-105"
          >
            <Icon name="Play" size={28} className="mr-3" />
            НАЧАТЬ ИГРУ
          </Button>

          <Button
            onClick={onInstructions}
            variant="outline"
            size="lg"
            className="w-full text-lg py-6 border-2 border-secondary hover:bg-secondary/20 hover:border-secondary/80 transition-all duration-300"
          >
            <Icon name="Info" size={24} className="mr-3" />
            УПРАВЛЕНИЕ
          </Button>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <Card className="bg-primary/10 border-primary/50 p-4 text-center hover:bg-primary/20 transition-all duration-300 cursor-pointer">
              <Icon name="Settings" size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-sm font-bold">НАСТРОЙКИ</p>
            </Card>

            <Card className="bg-secondary/10 border-secondary/50 p-4 text-center hover:bg-secondary/20 transition-all duration-300 cursor-pointer">
              <Icon name="Trophy" size={32} className="mx-auto mb-2 text-secondary" />
              <p className="text-sm font-bold">РЕКОРДЫ</p>
            </Card>

            <Card className="bg-accent/10 border-accent/50 p-4 text-center hover:bg-accent/20 transition-all duration-300 cursor-pointer">
              <Icon name="Image" size={32} className="mx-auto mb-2 text-accent" />
              <p className="text-sm font-bold">ГАЛЕРЕЯ</p>
            </Card>
          </div>
        </Card>
      </div>

      <Dialog open={showInstructions} onOpenChange={onCloseInstructions}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-2 border-primary/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold glow-cyan flex items-center gap-3">
              <Icon name="Gamepad2" size={32} />
              УПРАВЛЕНИЕ
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid gap-4">
              <Card className="bg-primary/10 border-primary/50 p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Icon name="Hand" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">VR РЕЖИМ</h3>
                    <p className="text-sm text-muted-foreground">
                      Используйте контроллеры для перемещения и прыжков
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-secondary/10 border-secondary/50 p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <Icon name="Keyboard" size={32} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">КЛАВИАТУРА</h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-mono bg-background/50 px-2 py-1 rounded">SPACE</span> - прыжок по платформам
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-accent/10 border-accent/50 p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Icon name="Mouse" size={32} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">МЫШЬ</h3>
                    <p className="text-sm text-muted-foreground">
                      Перемещайте камеру для обзора окружения
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-muted/30 border border-muted rounded-lg p-4">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Icon name="Lightbulb" size={20} className="text-primary" />
                ЦЕЛЬ ИГРЫ
              </h4>
              <p className="text-sm text-muted-foreground">
                Прыгайте по неоновым платформам, набирая высоту. Не упадите в киберпространство!
                Активная платформа светится ярче остальных.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
