import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Fee-Only Financial Planning & Wealth Management | Austin Wealth Management</title>
        <meta name="description" content="Austin Wealth Management provides fee-only financial planning and investment management for families in Central Texas. No sales pitch — just education and advocacy." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/" />
        <meta property="og:title" content="Fee-Only Financial Planning & Wealth Management | Austin Wealth Management" />
        <meta property="og:description" content="Austin Wealth Management provides fee-only financial planning and investment management for families in Central Texas. No sales pitch — just education and advocacy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.austinwealthmgmt.com/" />
        <meta property="og:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fee-Only Financial Planning & Wealth Management | Austin Wealth Management" />
        <meta name="twitter:description" content="Austin Wealth Management provides fee-only financial planning and investment management for families in Central Texas. No sales pitch — just education and advocacy." />
        <meta name="twitter:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
      </Helmet>
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