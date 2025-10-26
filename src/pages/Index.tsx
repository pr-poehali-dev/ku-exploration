import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface SoulData {
  mobKills: number;
  playerKills: number;
  totalSouls: number;
  history: { type: 'mob' | 'player'; timestamp: number; souls: number }[];
}

export default function Index() {
  const { toast } = useToast();
  const [soulData, setSoulData] = useState<SoulData>({
    mobKills: 0,
    playerKills: 0,
    totalSouls: 0,
    history: []
  });
  const [showParticle, setShowParticle] = useState(false);

  const addSoul = (type: 'mob' | 'player') => {
    const soulsGained = type === 'mob' ? 1 : 5;
    setSoulData(prev => ({
      mobKills: type === 'mob' ? prev.mobKills + 1 : prev.mobKills,
      playerKills: type === 'player' ? prev.playerKills + 1 : prev.playerKills,
      totalSouls: prev.totalSouls + soulsGained,
      history: [
        { type, timestamp: Date.now(), souls: soulsGained },
        ...prev.history.slice(0, 9)
      ]
    }));

    setShowParticle(true);
    setTimeout(() => setShowParticle(false), 2000);

    toast({
      title: type === 'mob' ? '✨ Душа моба получена' : '💫 Душа игрока получена',
      description: `+${soulsGained} ${type === 'mob' ? 'душа' : 'душ'} добавлено`,
    });
  };

  const nextMilestone = Math.ceil(soulData.totalSouls / 100) * 100;
  const progressToMilestone = ((soulData.totalSouls % 100) / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card p-4 md:p-8 font-cormorant">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-primary animate-glow-pulse tracking-wider">
            ELVEN SOULS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground italic">
            Drinari • Древняя магия учёта душ
          </p>
        </div>

        <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 p-8 md:p-12 animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
          
          {showParticle && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-soul-rise pointer-events-none">
              ✨
            </div>
          )}

          <div className="relative space-y-8">
            <div className="text-center space-y-4">
              <div className="text-secondary text-sm font-cinzel tracking-widest uppercase">
                Собрано душ
              </div>
              <div className="text-8xl md:text-9xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-glow-pulse">
                {soulData.totalSouls}
              </div>
              <div className="text-muted-foreground text-lg">
                До следующей вехи: {nextMilestone - soulData.totalSouls} душ
              </div>
              <Progress value={progressToMilestone} className="h-3 bg-muted" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/80 border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Ghost" className="text-secondary" size={32} />
                      <div>
                        <div className="text-sm text-muted-foreground font-cinzel uppercase tracking-wide">
                          Души мобов
                        </div>
                        <div className="text-4xl font-bold text-foreground">
                          {soulData.mobKills}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => addSoul('mob')}
                    className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary font-cinzel text-lg"
                    size="lg"
                  >
                    <Icon name="Plus" className="mr-2" size={20} />
                    Убить моба (+1)
                  </Button>
                  <div className="text-xs text-center text-muted-foreground">
                    Всего душ от мобов: {soulData.mobKills}
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 border-accent/20 hover:border-accent/50 transition-all hover:scale-105">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Swords" className="text-accent" size={32} />
                      <div>
                        <div className="text-sm text-muted-foreground font-cinzel uppercase tracking-wide">
                          Души игроков
                        </div>
                        <div className="text-4xl font-bold text-foreground">
                          {soulData.playerKills}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => addSoul('player')}
                    className="w-full bg-accent/20 hover:bg-accent/30 border border-accent/50 text-accent font-cinzel text-lg"
                    size="lg"
                  >
                    <Icon name="Plus" className="mr-2" size={20} />
                    Убить игрока (+5)
                  </Button>
                  <div className="text-xs text-center text-muted-foreground">
                    Всего душ от игроков: {soulData.playerKills * 5}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-primary/20 pb-3">
              <Icon name="ScrollText" className="text-secondary" size={24} />
              <h2 className="text-2xl font-cinzel font-semibold text-foreground">
                История убийств
              </h2>
            </div>
            
            {soulData.history.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground italic">
                Пока нет записей... Начни охоту за душами
              </div>
            ) : (
              <div className="space-y-2">
                {soulData.history.map((entry, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        name={entry.type === 'mob' ? 'Ghost' : 'Swords'} 
                        className={entry.type === 'mob' ? 'text-secondary' : 'text-accent'}
                        size={20}
                      />
                      <span className="text-foreground">
                        {entry.type === 'mob' ? 'Моб убит' : 'Игрок повержен'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold">+{entry.souls}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleTimeString('ru-RU')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 animate-fade-in">
          <Card className="p-6 bg-card/30 border-primary/20 text-center">
            <Icon name="Target" className="mx-auto text-primary mb-2" size={32} />
            <div className="text-3xl font-cinzel font-bold text-foreground">
              {((soulData.playerKills / (soulData.mobKills + soulData.playerKills || 1)) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Процент игроков
            </div>
          </Card>

          <Card className="p-6 bg-card/30 border-secondary/20 text-center">
            <Icon name="Flame" className="mx-auto text-secondary mb-2" size={32} />
            <div className="text-3xl font-cinzel font-bold text-foreground">
              {soulData.mobKills + soulData.playerKills}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Всего убийств
            </div>
          </Card>

          <Card className="p-6 bg-card/30 border-accent/20 text-center">
            <Icon name="Trophy" className="mx-auto text-accent mb-2" size={32} />
            <div className="text-3xl font-cinzel font-bold text-foreground">
              {Math.floor(soulData.totalSouls / 100)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Достигнуто вех
            </div>
          </Card>
        </div>

        <div className="text-center text-xs text-muted-foreground italic pt-4 pb-2">
          Starbound • Elven Souls Mod v1.0 • Made with ancient Drinari magic ✨
        </div>
      </div>
    </div>
  );
}
