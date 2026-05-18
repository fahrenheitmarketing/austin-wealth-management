import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const qaData = [
  {
    category: "Restricted Stock Units (RSUs)",
    questions: [
      {
        q: "I have accumulated a lot of RSUs over several years. If I sell them, I will have a big tax bill. How can I diversify out of these RSUs?",
        a: "Holding a concentrated position in company stock is a real risk, and diversifying is the right instinct. The key is to have a systematic plan rather than selling everything at once. Consider spreading your sales over multiple tax years to manage the tax impact across brackets. You can also use tax-loss harvesting — offsetting gains from RSU sales with losses in other parts of your portfolio. If you're charitably inclined, donating appreciated shares directly to a donor-advised fund avoids capital gains entirely. In some cases, a 10b5-1 trading plan can help you sell on a predetermined schedule, which also provides legal protection around insider trading rules. A financial planner can help you model out the tax impact year by year."
      },
      {
        q: "What should I do with my RSUs when they vest?",
        a: "When RSUs vest, you have a decision to make: hold the shares or sell them. In most cases, if you wouldn't use your own paycheck to buy that same stock today, you shouldn't hold the newly vested shares either. The vesting event itself triggers ordinary income tax on the fair market value of the shares, regardless of whether you sell. Many financial advisors recommend selling at least enough shares to cover your tax liability and then evaluating whether the remainder aligns with your portfolio goals. If your company stock already makes up a large portion of your net worth, diversifying is often the prudent choice."
      },
      {
        q: "What is the difference between vested and unvested RSUs?",
        a: "Unvested RSUs are shares your company has promised to grant you, but you haven't earned yet — they're subject to a vesting schedule (e.g., 25% per year over four years). You have no legal ownership, no voting rights, and no tax obligation on unvested shares. Vested RSUs are shares you have fully earned. The moment they vest, ownership transfers to you and the fair market value on that date is treated as ordinary income and reported on your W-2. At that point, you own real shares and can hold or sell them."
      },
      {
        q: "I get RSUs from my company. I haven't sold any so far — why do I still owe a huge amount in taxes?",
        a: "This is one of the most common surprises with RSUs. When your RSUs vest, the IRS treats the market value of the shares on that day as ordinary income — even if you never sold a single share. Your employer typically withholds some taxes at vesting (often at the 22% federal supplemental withholding rate), but if you're in a higher bracket, that withholding may not be enough. The result: a tax bill at filing time. Additionally, if your shares have appreciated since vesting, selling them later will trigger capital gains on top of the income already recognized. It's critical to plan ahead and set aside funds for taxes at each vesting event."
      },
      {
        q: "What should I do with my RSUs if my company is not public yet?",
        a: "RSUs in a private company are trickier because there's no public market to sell the shares immediately upon vesting. However, the IRS generally doesn't tax RSUs at vesting if there's no ready market and the shares are subject to a substantial risk of forfeiture. In most cases, the tax event is deferred until there is a liquidity event such as an IPO or acquisition. Until then, the shares are largely illiquid. You should understand your company's 409A valuation, the terms of your equity agreement, and whether there is a secondary market. Work with a financial planner and tax advisor to understand your rights, potential tax exposure, and how this fits into your overall plan."
      },
      {
        q: "What is the difference between grant price and fair market value?",
        a: "The grant price (also called the strike price or exercise price) is the price at which you are given the right to purchase stock options — it's fixed at the time of the grant. Fair market value (FMV) is the current price of the stock in the open market. For RSUs, the grant price concept doesn't really apply in the same way — RSUs have no cost to exercise. The fair market value at vesting is simply what the stock is worth on the day your shares are delivered, and that's the number used to determine your taxable income. The distinction between grant price and FMV matters more for stock options (ISOs and NQSOs)."
      },
      {
        q: "My RSUs are not taxed until I sell them. Are my RSUs taxed at ordinary income tax or capital gains when I sell them?",
        a: "This is a common misconception worth clarifying. RSUs are actually taxed at ordinary income rates when they vest — not when you sell. At vesting, the fair market value of the shares is treated as W-2 income. After that, any additional gain (or loss) from the time of vesting to when you actually sell is treated as a capital gain or loss. If you hold the shares for more than one year after vesting, that gain qualifies for the more favorable long-term capital gains rate. If you sell within a year of vesting, it's short-term capital gains, taxed at ordinary income rates."
      }
    ]
  },
  {
    category: "Employee Stock Purchase Plan (ESPP)",
    questions: [
      {
        q: "My ESPP enrollment window just opened. Should I participate in the ESPP program? How much should I contribute?",
        a: "In most cases, yes — participating in an ESPP is one of the most straightforward ways to get an immediate return on your money. Most ESPPs offer a 15% discount on your company's stock, which is essentially an instant 15–17% gain even before the stock moves. If your ESPP also has a lookback provision (meaning you get the discount off the lower of the beginning or end price of the offering period), the potential return is even greater. How much to contribute depends on your cash flow. Many people contribute the maximum allowed (typically 10–15% of pay) and immediately sell at the end of each purchase period to lock in the discount and avoid concentration risk. Make sure contributing the maximum doesn't strain your monthly budget."
      },
      {
        q: "Will I get a tax benefit if I participate in the ESPP program?",
        a: "Participating in a qualified ESPP can result in favorable tax treatment, but it depends on how long you hold the shares. If you hold the shares long enough to meet the 'qualifying disposition' holding period (typically 2 years from the offering date and 1 year from the purchase date), a portion of your gain is taxed at the more favorable long-term capital gains rate rather than ordinary income. However, if you sell immediately (a 'disqualifying disposition'), the discount you received is taxed as ordinary income, and any additional gain is capital gains. Many employees choose to sell immediately to avoid concentration risk, accepting the ordinary income treatment on the discount in exchange for certainty."
      },
      {
        q: "I get a discounted price to buy my company's shares through the ESPP. My co-worker suggested I participate. What is the strategy?",
        a: "The most common strategy is to participate at the maximum contribution level and sell the shares immediately at the end of each purchase period. This lets you capture the discount (and any gain from a lookback provision) without taking on concentration risk in your employer's stock. Since you already depend on your company for your paycheck, holding large amounts of company stock amplifies that risk. The 'immediate sell' strategy means your gain will be taxed as ordinary income, but you walk away with a guaranteed profit. A more aggressive strategy is to hold the shares to qualify for long-term capital gains treatment, but this only makes sense if you're comfortable with the stock's performance and can afford to hold it."
      },
      {
        q: "There are two ways ESPPs are taxed — some as ordinary income and some at capital gains rates. What is the difference?",
        a: "When you sell ESPP shares, your gain is split into two components. The first is the 'discount element' — the difference between what you paid (the discounted purchase price) and the fair market value on the purchase date. Depending on whether you have a qualifying or disqualifying disposition, this portion may be taxed as ordinary income. The second component is any additional appreciation from the purchase date to the sale date, which is taxed as a capital gain — long-term if you held the shares for more than a year, short-term if not. In a disqualifying disposition (selling too soon), the entire spread at purchase is ordinary income. In a qualifying disposition, the discount taxed as ordinary income is capped at the actual discount offered (e.g., 15%), with any excess treated as long-term capital gain."
      }
    ]
  },
  {
    category: "Incentive Stock Options (ISOs)",
    questions: [
      {
        q: "I joined a startup and my company gave me ISOs as part of my compensation package. What should I do?",
        a: "ISOs are a valuable benefit, but they come with complexity. Your first step is to fully understand your grant agreement: how many options were granted, at what exercise price, on what vesting schedule, and what the expiration date is (typically 10 years from the grant date, but often just 90 days after leaving the company). Next, get familiar with your company's 409A valuation — the fair market value of the shares at the time of your grant. You'll also want to understand the difference between exercising options and selling shares. Exercising early while the share price is low can minimize your future tax bill, but it requires spending real money with no guarantee of a return. Work with a financial planner and CPA experienced with startup equity."
      },
      {
        q: "When is the right time to exercise my ISOs?",
        a: "The timing of exercising ISOs involves both financial and tax strategy. Exercising early (when the difference between the exercise price and fair market value is small) minimizes the Alternative Minimum Tax (AMT) exposure and starts your holding period clock for long-term capital gains. However, exercising early means spending money on shares that may never be worth anything. On the other hand, waiting until closer to a liquidity event reduces the risk of paying for worthless shares but can trigger significant AMT. The 'right time' depends on your confidence in the company, your financial situation, your tax picture, and your risk tolerance. A financial advisor can model the AMT impact and help you find the optimal exercise strategy."
      },
      {
        q: "What is the difference between ISO and NQSO?",
        a: "Both ISOs (Incentive Stock Options) and NQSOs (Non-Qualified Stock Options) give you the right to buy company stock at a fixed exercise price, but they're taxed very differently. With NQSOs, the spread between the exercise price and the fair market value at the time you exercise is taxed as ordinary income immediately, with no special treatment. With ISOs, there is no ordinary income tax at exercise — instead, the spread is a preference item for AMT purposes. If you hold ISO shares long enough (2 years from grant, 1 year from exercise), the eventual sale qualifies entirely for long-term capital gains rates. ISOs are generally more tax-advantaged but come with more complex rules. NQSOs are simpler and more common in public companies."
      },
      {
        q: "What is the difference between exercise price and sale price?",
        a: "The exercise price (also called the strike price) is the fixed price per share at which you have the right to buy the stock — it's set when the option is granted and never changes. The sale price is what you receive per share when you actually sell the stock on the open market. The spread between the two — sale price minus exercise price — represents your total economic gain. For NQSOs, the spread at the time you exercise (not necessarily the sale) is what triggers tax. For ISOs, the spread at exercise triggers potential AMT, and the spread at sale determines capital gains, depending on your holding period."
      },
      {
        q: "How are my ISOs taxed? Is it ordinary income tax or capital gains tax?",
        a: "ISOs have unique tax treatment. At the time you exercise your ISOs, there is no regular federal income tax — however, the spread (fair market value minus exercise price) is an AMT preference item, which could trigger the Alternative Minimum Tax. If you then hold the shares for at least 1 year from the exercise date and 2 years from the grant date, the entire gain when you sell qualifies for long-term capital gains rates, which are significantly lower than ordinary income rates. If you sell before meeting these holding periods (a 'disqualifying disposition'), the gain is taxed as ordinary income. The tax advantages of ISOs are real but require careful planning around AMT and holding periods."
      },
      {
        q: "What is a 83(b) election? Should I consider that if I was granted ISOs?",
        a: "An 83(b) election is a tax filing that lets you report the value of restricted property as income in the year you receive it, rather than when it vests. For ISOs specifically, an 83(b) election is generally not applicable — ISOs are not restricted property in the traditional sense. However, an 83(b) election is extremely relevant if you exercise your ISOs early (before they are fully vested), which is known as an 'early exercise.' In that case, filing an 83(b) election within 30 days of the early exercise starts your long-term capital gains holding period immediately and can significantly reduce your tax bill at a future liquidity event. Missing the 30-day window forfeits this option entirely, so timing is critical. If you are exercising options early at a startup, speak with a tax advisor immediately."
      }
    ]
  }
];

function QAItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4 p-6 hover:bg-slate-50 transition-colors"
      >
        <span className="text-slate-900 font-medium leading-snug">{question}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-amber-50/40">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuestionsAnswers() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/8d9184071_generated_image.png"
          alt="Q&A"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Education
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Questions &amp;
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Answers
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Real questions from clients like you — answered clearly, without the jargon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Q&A Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          {qaData.map((section, si) => (
            <AnimatedSection key={section.category} delay={si * 0.1}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase whitespace-nowrap">
                    {section.category}
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="space-y-3">
                  {section.questions.map((item, qi) => (
                    <QAItem key={qi} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
              Still Have Questions?
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-white tracking-tight">
              Let's talk through your specific situation
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Every financial situation is unique. Schedule a consultation and get answers tailored to you.
            </p>
            <div className="mt-10">
              <Link to={createPageUrl('Contact')}>
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-8 h-14 rounded-full"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}