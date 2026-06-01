import HeroMain from '@/components/home/HeroMain';
import LifeStageSection from '@/components/home/LifeStageSection';
import FinancialHealthQuizSection from '@/components/home/FinancialHealthQuizSection';
import HowWereDifferent from '@/components/home/HowWereDifferent';
import TeamIntroSection from '@/components/home/TeamIntroSection';
import CoreValues from '@/components/home/CoreValues';
import EducationBlogSection from '@/components/home/EducationBlogSection';


export default function Home() {
  return (
    <div className="bg-white">
      <HeroMain />
      <LifeStageSection />
      <FinancialHealthQuizSection />
      <HowWereDifferent />
      <TeamIntroSection />
      <CoreValues />
      <EducationBlogSection />

    </div>
  );
}