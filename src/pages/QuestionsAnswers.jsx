import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
        a: "ISOs are a valuable benefit, but they come with complexity. Your first step is to fully understand your grant agreement: how many options were granted, at what exercise price, on what vesting schedule, and what the expiration date is (typically 10 years from the grant date, but often just 90 days after leaving the company). Next, get familiar with your company\u2019s 409A valuation \u2014 the fair market value of the shares at the time of your grant. You\u2019ll also want to understand the difference between exercising options and selling shares. Exercising early while the share price is low can minimize your future tax bill, but it requires spending real money with no guarantee of a return. Work with a financial planner and CPA experienced with startup equity."
      },
      {
        q: "When is the right time to exercise my ISOs?",
        a: "The timing of exercising ISOs involves both financial and tax strategy. Exercising early (when the difference between the exercise price and fair market value is small) minimizes the Alternative Minimum Tax (AMT) exposure and starts your holding period clock for long-term capital gains. However, exercising early means spending money on shares that may never be worth anything. On the other hand, waiting until closer to a liquidity event reduces the risk of paying for worthless shares but can trigger significant AMT. The \u2018right time\u2019 depends on your confidence in the company, your financial situation, your tax picture, and your risk tolerance. A financial advisor can model the AMT impact and help you find the optimal exercise strategy."
      },
      {
        q: "What is the difference between ISO and NQSO?",
        a: "Both ISOs (Incentive Stock Options) and NQSOs (Non-Qualified Stock Options) give you the right to buy company stock at a fixed exercise price, but they\u2019re taxed very differently. With NQSOs, the spread between the exercise price and the fair market value at the time you exercise is taxed as ordinary income immediately, with no special treatment. With ISOs, there is no ordinary income tax at exercise \u2014 instead, the spread is a preference item for AMT purposes. If you hold ISO shares long enough (2 years from grant, 1 year from exercise), the eventual sale qualifies entirely for long-term capital gains rates. ISOs are generally more tax-advantaged but come with more complex rules. NQSOs are simpler and more common in public companies."
      },
      {
        q: "What is the difference between exercise price and sale price?",
        a: "The exercise price (also called the strike price) is the fixed price per share at which you have the right to buy the stock \u2014 it\u2019s set when the option is granted and never changes. The sale price is what you receive per share when you actually sell the stock on the open market. The spread between the two \u2014 sale price minus exercise price \u2014 represents your total economic gain. For NQSOs, the spread at the time you exercise (not necessarily the sale) is what triggers tax. For ISOs, the spread at exercise triggers potential AMT, and the spread at sale determines capital gains, depending on your holding period."
      },
      {
        q: "How are my ISOs taxed? Is it ordinary income tax or capital gains tax?",
        a: "ISOs have unique tax treatment. At the time you exercise your ISOs, there is no regular federal income tax \u2014 however, the spread (fair market value minus exercise price) is an AMT preference item, which could trigger the Alternative Minimum Tax. If you then hold the shares for at least 1 year from the exercise date and 2 years from the grant date, the entire gain when you sell qualifies for long-term capital gains rates, which are significantly lower than ordinary income rates. If you sell before meeting these holding periods (a \u2018disqualifying disposition\u2019), the gain is taxed as ordinary income. The tax advantages of ISOs are real but require careful planning around AMT and holding periods."
      },
      {
        q: "What is a 83(b) election? Should I consider that if I was granted ISOs?",
        a: "An 83(b) election is a tax filing that lets you report the value of restricted property as income in the year you receive it, rather than when it vests. For ISOs specifically, an 83(b) election is generally not applicable \u2014 ISOs are not restricted property in the traditional sense. However, an 83(b) election is extremely relevant if you exercise your ISOs early (before they are fully vested), which is known as an \u2018early exercise.\u2019 In that case, filing an 83(b) election within 30 days of the early exercise starts your long-term capital gains holding period immediately and can significantly reduce your tax bill at a future liquidity event. Missing the 30-day window forfeits this option entirely, so timing is critical. If you are exercising options early at a startup, speak with a tax advisor immediately."
      }
    ]
  },
  {
    category: "Retirement Planning ($2M+ Saved)",
    questions: [
      {
        q: "When can I retire?",
        a: "The classic benchmark is whether your investable assets can sustainably fund your lifestyle without depleting over your lifetime. With $2M or more, retirement is often feasible in your late 50s or 60s \u2014 but the real answer depends on four variables: how much you plan to spend annually, your expected investment return (net of inflation), how long you might live, and other income sources like Social Security or a pension. A common planning framework is the \u201825x rule\u2019: if you need $100,000/year, you need roughly $2.5M saved (100,000 x 25). That\u2019s derived from the 4% withdrawal rate, which research suggests has a strong historical success rate over 30-year retirements. With $2M+, you likely have real flexibility \u2014 the key is running the numbers with an advisor using Monte Carlo simulations to stress-test your plan."
      },
      {
        q: "How much can I spend in retirement?",
        a: "The widely cited \u20184% rule\u2019 (from the 1994 Trinity Study) suggests you can withdraw 4% of your portfolio in year one and adjust for inflation each year, with a high probability of not running out of money over 30 years. On $2M, that\u2019s $80,000/year. However, more recent research suggests 3.3\u20133.5% may be more appropriate given today\u2019s lower expected returns and longer life spans. A flexible withdrawal strategy \u2014 spending a little less in down markets and a little more in up years \u2014 significantly improves outcomes. Your spending also isn\u2019t flat: research by David Blanchett (\u201cThe Retirement Spending Smile\u201d) shows retirees tend to spend more in early active years, less in the middle, and more again near end of life due to health costs. Plan with that curve in mind."
      },
      {
        q: "Where should my income come from?",
        a: "A well-designed retirement income plan typically layers multiple sources. Social Security provides inflation-adjusted, guaranteed income for life \u2014 delaying it to age 70 maximizes the benefit. Tax-deferred accounts (Traditional IRA, 401k) provide flexibility but generate ordinary income when withdrawn. Roth accounts produce tax-free income and have no required distributions. Taxable brokerage accounts can be drawn from with favorable capital gains rates. With $2M+, the strategy often involves a sequenced withdrawal approach: cover living expenses first from taxable accounts, then tax-deferred, while letting Roth accounts grow. Before Social Security begins, managing your taxable income carefully creates opportunities for Roth conversions at lower rates, reducing future RMDs and Medicare surcharges."
      },
      {
        q: "How am I taxed in retirement?",
        a: "Retirement income is taxed in layers. Withdrawals from Traditional IRA/401k accounts are taxed as ordinary income. Up to 85% of your Social Security benefit may be taxable depending on your \u2018combined income\u2019 (adjusted gross income + nontaxable interest + half of Social Security). Roth withdrawals are tax-free if you\u2019re over 59\u00bd and the account is at least 5 years old. Long-term capital gains from taxable accounts are taxed at 0%, 15%, or 20% depending on income. Required Minimum Distributions (RMDs) begin at age 73 (as of 2024 under SECURE 2.0) and can push you into higher brackets if not managed. Proactive tax planning \u2014 including Roth conversions in early retirement before RMDs and Social Security begin \u2014 is one of the highest-value activities for retirees with significant assets."
      },
      {
        q: "When should I take Social Security?",
        a: "This is one of the most consequential retirement decisions you\u2019ll make. You can start as early as age 62 (at a 30% permanent reduction from your full retirement age benefit), at your Full Retirement Age (FRA, currently 66\u201367 depending on birth year), or delay up to age 70 (earning an 8% credit per year beyond FRA). For a healthy individual, delaying to 70 is often optimal \u2014 the breakeven point is typically around age 80\u201382. If you live past that, you\u2019ll have received significantly more in lifetime benefits. For married couples, the strategy often involves the higher earner delaying to 70 to maximize survivor benefits, while the lower earner claims earlier. If you have significant investable assets, you can live off savings while deferring Social Security, which functions like buying a low-cost inflation-indexed annuity."
      },
      {
        q: "How do I avoid triggering high Medicare premiums?",
        a: "Medicare Part B and Part D premiums are income-tested under a system called IRMAA (Income-Related Monthly Adjustment Amount). In 2024, if your Modified Adjusted Gross Income (MAGI) from two years prior exceeds $103,000 (single) or $206,000 (married), you pay higher premiums. The surcharges can add hundreds of dollars per month. Key strategies: (1) Manage taxable income by drawing from Roth accounts and taxable accounts early in retirement before RMDs kick in. (2) Be careful with large Roth conversions \u2014 they can push you over an IRMAA threshold. (3) If you\u2019ve had a \u2018life-changing event\u2019 (retirement, divorce, death of spouse), you can file Form SSA-44 to request a reduction based on current-year income rather than the two-year lookback. (4) Work with an advisor to model conversions and withdrawals with IRMAA thresholds in mind."
      },
      {
        q: "How does a job in retirement impact Social Security?",
        a: "If you work before reaching your Full Retirement Age (FRA) and are already collecting Social Security, the Earnings Test applies: in 2024, you lose $1 in benefits for every $2 you earn above $22,320/year. In the year you reach FRA, the limit rises and the reduction is $1 for every $3 over a higher threshold. Importantly, withheld benefits are not \u2018lost\u2019 \u2014 once you reach FRA, your benefit is recalculated upward to account for the months benefits were withheld. After FRA, you can earn unlimited income with no reduction in Social Security. From a tax perspective, working adds earned income that may increase the taxable portion of your Social Security benefit. If you\u2019re working part-time primarily for fulfillment, the financial impact is modest and manageable."
      },
      {
        q: "What should I do about Medicare and health insurance?",
        a: "Medicare eligibility begins at age 65, regardless of when you retire. If you retire before 65, you\u2019ll need to bridge the gap with COBRA (expensive, typically 102% of the full premium for up to 18 months), a spouse\u2019s employer plan, or a marketplace plan through healthcare.gov. Marketplace plans can be surprisingly affordable in early retirement if your taxable income is low \u2014 ACA subsidies are income-based, not asset-based, so a retiree drawing primarily from Roth accounts may qualify for significant subsidies. When you reach 65, enroll in Medicare Part A and Part B during your Initial Enrollment Period (IEP) to avoid late enrollment penalties. Most financial advisors recommend also enrolling in a Medigap (Medicare Supplement) policy to cap out-of-pocket costs \u2014 it\u2019s most affordable to enroll at age 65 during the open enrollment window when insurers cannot deny coverage."
      },
      {
        q: "What should I do about long-term care needs?",
        a: "Long-term care (LTC) is one of the most significant financial risks in retirement. The U.S. Department of Health estimates that roughly 70% of people over 65 will need some form of long-term care. In 2024, the median cost of a private nursing home room exceeds $100,000/year; assisted living averages around $55,000/year. With $2M in assets, you have three realistic options: (1) Self-insure \u2014 set aside a portion of your portfolio dedicated to LTC costs. (2) Purchase traditional LTC insurance \u2014 premiums can be substantial, but it protects your assets. (3) Hybrid life/LTC policies \u2014 these combine a life insurance death benefit with LTC benefits, and unused premiums are returned to heirs. The decision depends on your health, family history, asset base, and risk tolerance. The best time to buy LTC insurance is typically your mid-50s to early 60s, while you\u2019re still insurable and premiums are lower."
      },
      {
        q: "What is the impact of high inflation on my retirement?",
        a: "Inflation is a retiree\u2019s stealth tax. At 3% annual inflation, your purchasing power is cut in half in about 24 years \u2014 a serious risk for someone retiring at 62 and potentially living to 90. The key defenses: (1) Social Security is inflation-adjusted via annual COLAs, making it an especially valuable income source. (2) A globally diversified equity portfolio has historically been the best long-run hedge against inflation, as companies can pass rising costs to consumers. (3) TIPS (Treasury Inflation-Protected Securities) and I-Bonds provide direct inflation protection for the fixed-income portion of your portfolio. (4) Avoid excessive cash or traditional bonds for money you won\u2019t need for 5+ years. (5) For retirees owning their home, real estate also tends to appreciate with inflation. The most dangerous combination is heavy allocation to fixed nominal income (annuities, traditional bonds) with no growth assets."
      },
      {
        q: "What happens if we retire into a recession?",
        a: "Retiring at the start of a market downturn is the single biggest timing risk in retirement planning \u2014 called \u2018sequence of returns risk.\u2019 Withdrawing from a shrinking portfolio in the early years permanently locks in losses, reducing the base that would otherwise compound during recovery. The research is clear: two retirees with identical average returns can have vastly different outcomes depending on whether their bad years come first or last. Defenses include: (1) Maintain 1\u20132 years of living expenses in cash or short-term bonds \u2014 a \u2018cash buffer\u2019 \u2014 so you don\u2019t sell equities at depressed prices. (2) Reduce withdrawal rates temporarily during down years (even by 10\u201315%) to dramatically improve long-term outcomes. (3) Delay Social Security, so you have a guaranteed income stream that doesn\u2019t depend on markets. (4) Consider a small immediate annuity to floor your essential expenses with guaranteed income. With $2M, you have meaningful capacity to absorb a bad sequence with the right plan in place."
      },
      {
        q: "Is the 'bucket strategy' a good retirement income strategy?",
        a: "The bucket strategy, popularized by financial planner Harold Evensky, divides your assets into time-based buckets: Bucket 1 holds 1\u20132 years of expenses in cash, Bucket 2 holds 3\u201310 years in bonds and conservative assets, and Bucket 3 holds equities for long-term growth. The psychological benefit is real \u2014 knowing your near-term expenses are covered in cash makes it far easier to leave equities alone during a downturn. Research by Michael Kitces and others suggests the bucket strategy doesn\u2019t outperform a simple total-return approach (one balanced portfolio with systematic withdrawals) in pure financial terms. However, behavioral adherence matters enormously \u2014 a slightly suboptimal strategy you actually stick to beats a theoretically superior strategy you abandon in a panic. For investors who feel anxiety during volatility, the bucket strategy is a highly effective framework. For disciplined investors comfortable with volatility, a total-return approach is simpler and equally effective."
      }
    ]
  },
  {
    category: "Business Owners ($3M+ Business)",
    questions: [
      {
        q: "How do I maximize tax savings as a business owner?",
        a: "Business owners have access to more tax levers than almost anyone else. The most impactful: (1) Choose the right entity structure — S Corps and LLCs taxed as S Corps can reduce self-employment taxes by splitting income between salary and distributions. (2) Maximize retirement plan contributions — a Solo 401(k) or defined benefit/cash balance plan can allow you to shelter $100,000–$300,000+ per year in pre-tax income. (3) Deduct legitimate business expenses thoroughly — home office, vehicle, health insurance premiums, retirement contributions. (4) Accelerate depreciation using Section 179 or bonus depreciation on equipment and property. (5) Hire family members legitimately to shift income to lower brackets. (6) Time income and deductions strategically — defer income to next year or accelerate deductions into the current year based on your bracket. Working with a CPA and financial planner who specialize in closely held businesses is essential — the savings potential easily justifies the cost."
      },
      {
        q: "How should I pay myself?",
        a: "How you pay yourself depends on your entity type. If you're an S Corp owner, you must pay yourself a 'reasonable salary' (subject to payroll taxes), and you can then take additional distributions that are not subject to self-employment tax — this is a key tax savings strategy. If you're a sole proprietor or single-member LLC taxed as a sole prop, all net profits are subject to self-employment tax (15.3% up to the Social Security wage base). The optimal split between salary and distributions in an S Corp should be defensible to the IRS — base it on what you'd pay someone else to do your job. Beyond the salary vs. distribution question, also consider how much to retain in the business for reinvestment vs. draw out for personal wealth building. A financial planner can help you model both your business and personal balance sheet together to optimize your overall compensation structure."
      },
      {
        q: "Should we file as an S Corp?",
        a: "For many profitable small businesses, electing S Corp status is one of the most effective tax strategies available. The core benefit: S Corp owners can split their compensation into a salary (subject to payroll/FICA taxes) and distributions (not subject to FICA). At a net profit of $100,000+, the payroll tax savings often exceed $5,000–$15,000/year. The tradeoffs: S Corps require running payroll, filing a separate corporate tax return (Form 1120-S), maintaining corporate formalities, and setting a defensible salary. There are also restrictions — S Corps can't have more than 100 shareholders, all shareholders must be U.S. citizens or residents, and only one class of stock is allowed. For businesses with net income above $80,000–$100,000/year, the math usually favors S Corp election. Below that, the administrative burden may outweigh the savings. Have a CPA run the numbers for your specific situation."
      },
      {
        q: "What is the difference between cash flow and profits?",
        a: "This distinction trips up many business owners. Profit (net income) is an accounting concept — it's revenue minus expenses as recorded on your income statement, following accrual accounting rules. Cash flow is the actual movement of money in and out of your bank account. A business can be profitable on paper but cash-flow negative — for example, if you've invoiced clients but haven't collected yet, or if you've invested heavily in inventory or equipment. Conversely, a business can show accounting losses but generate strong cash (e.g., due to depreciation deductions that reduce taxable income without actually spending cash). For business owners, cash flow is what keeps the lights on. Free cash flow — operating cash flow minus capital expenditures — is what funds owner distributions, debt repayment, and growth. Monitoring both metrics, along with a rolling 13-week cash forecast, gives you a far clearer picture of your business's financial health than the income statement alone."
      },
      {
        q: "How much cash should we keep in reserves?",
        a: "The conventional guidance for small businesses is 3–6 months of operating expenses in liquid reserves — but for a business worth $3M+, the right number depends on your revenue model, industry cyclicality, debt obligations, and seasonal patterns. Service businesses with recurring revenue and low fixed costs can function with 2–3 months of reserves. Capital-intensive businesses with large payrolls or lumpy revenue (e.g., construction, manufacturing) should target 6+ months. Reserves should be held in high-yield savings accounts, money market funds, or short-duration treasuries — liquid but earning something. Beyond an operating reserve, consider a separate strategic reserve for opportunistic investments, economic downturns, or bridge funding between large contracts. Excess cash above your reserve target is typically better deployed in the business or invested in personal wealth-building accounts rather than sitting idle."
      },
      {
        q: "What can we do to retain key employees?",
        a: "Retaining key employees is both a HR and financial planning challenge. The most effective tools: (1) Competitive compensation — benchmark salaries against industry data and adjust annually. (2) Phantom stock or profit-sharing plans — give key employees economic upside tied to business performance without transferring actual ownership. (3) Deferred compensation agreements — promises to pay a lump sum in the future if the employee stays, creating a financial incentive to remain (a 'golden handcuff'). (4) Key person life and disability insurance — demonstrates commitment to business continuity and protects the organization. (5) Non-qualified deferred compensation (NQDC) plans allow top earners to defer income, reducing current taxes while building a retention incentive. (6) Company-funded benefits — executive health plans, car allowances, retirement plan matches above standard levels. The most effective retention strategies tie a meaningful portion of compensation to long-term business outcomes, aligning employee and owner interests."
      },
      {
        q: "How can we transition ownership to key employees?",
        a: "An internal ownership transition is one of the most common exit strategies for business owners, and it can be structured several ways. (1) Management Buyout (MBO): Key employees purchase the business, typically financed through a seller note (you carry the financing), SBA loans, or a combination. This requires the employees to have access to capital or creditworthiness. (2) Employee Stock Ownership Plan (ESOP): A federally regulated structure where a trust purchases company shares on behalf of all eligible employees. ESOPs offer significant tax advantages for the selling owner — in C Corps, if done properly under IRC Section 1042, capital gains can be deferred indefinitely by reinvesting proceeds in qualified replacement property. (3) Gradual equity grants or phantom stock: Transfer ownership incrementally over time. Any transition plan should address valuation methodology, governance, financing structure, and your ongoing role post-transition. Engage a business valuation expert and M&A attorney well in advance."
      },
      {
        q: "What is the process for preparing to sell the business?",
        a: "Preparing a business for sale is a multi-year process, not a months-long one. The key steps: (1) Get a formal business valuation — understand what your business is worth today and what drives that value. (2) Clean up your financials — normalize your income statement (add back personal expenses run through the business), ensure your books are audit-ready, and separate personal and business assets clearly. (3) Reduce owner-dependence — buyers pay a premium for businesses that run without the owner. Document processes, develop management depth, and formalize customer relationships. (4) Diversify your customer base — having one client represent 30%+ of revenue is a major valuation risk. (5) Address legal and IP issues — ensure contracts are assignable, intellectual property is owned by the business, and there are no pending disputes. (6) Assemble your deal team — a business broker or M&A advisor, CPA, and M&A attorney. (7) Build a data room — organize 3–5 years of financials, tax returns, contracts, and HR records. Start 2–3 years before your target exit date."
      },
      {
        q: "How much do I need to sell the business for to retire comfortably?",
        a: "This is fundamentally a personal financial planning question that requires modeling both sides. Start with your retirement income needs: how much do you plan to spend annually, for how many years, accounting for inflation? Then work backwards. After taxes on the sale (which can be substantial), transaction costs (broker fees of 5–10%, legal and accounting fees), and any seller notes or earnout risk, what is your net take-home? That net amount, combined with any other investable assets, Social Security, and a safe withdrawal rate (typically 3.5–4%), determines your sustainable annual retirement income. On a $3M sale, after a 20–25% blended tax rate and 5–8% in transaction costs, you might net $2.1–2.3M — which at 4% supports roughly $84,000–$92,000/year. If that's below your target, you either need a higher sale price, additional savings, or a phased transition that includes ongoing income."
      },
      {
        q: "How will we be taxed on the sale of the business?",
        a: "The tax treatment of a business sale depends heavily on how the deal is structured — asset sale vs. stock sale — and the composition of your assets. In an asset sale (most common for small businesses), different assets are taxed at different rates: goodwill and most intangibles are taxed at long-term capital gains rates (0–20% federal + 3.8% Net Investment Income Tax if applicable); equipment and real estate may be subject to depreciation recapture taxed as ordinary income; inventory is ordinary income. In a stock sale, your gain is generally all long-term capital gains — buyers typically prefer asset sales for tax reasons, while sellers prefer stock sales. For S Corp owners, the gain from a sale flows through to your personal return. For C Corps, consider an ESOP — under Section 1042, you can defer capital gains by reinvesting in qualified replacement property. Texas has no state income tax, which is a meaningful advantage. Work with a CPA and M&A attorney before signing a letter of intent to structure the deal optimally."
      },
      {
        q: "How do we get the most for our business?",
        a: "Maximizing your sale price starts years before you list. Buyers pay for earnings (typically valued as a multiple of EBITDA — Earnings Before Interest, Taxes, Depreciation, and Amortization), growth trajectory, and reduced risk. Key value drivers: (1) Grow and stabilize EBITDA — every dollar of additional profit can be worth 4–10x at sale depending on your industry. (2) Reduce owner-dependence — businesses where the owner is the business sell at a discount. Build a management team. (3) Diversify revenue — reduce concentration in any single customer, product, or geography. (4) Show recurring or contracted revenue — predictable revenue streams command premium multiples. (5) Run a competitive process — having multiple bidders is the single most effective way to increase your sale price; never accept the first offer without testing the market. (6) Hire an experienced M&A advisor — research consistently shows sellers who use advisors net more after fees than those who go it alone. (7) Time the market — sell when your business is growing, not shrinking, and when credit and M&A markets are active."
      },
      {
        q: "Should I put my spouse or kids on payroll?",
        a: "Hiring family members is a legitimate and often highly effective tax strategy — but it must be done correctly to withstand IRS scrutiny. For spouses: wages paid to a spouse are deductible business expenses, which can shift income into a lower bracket or fund retirement accounts in the spouse's name (e.g., a spousal IRA or 401k contribution). For children under 18 employed in a sole proprietorship or partnership wholly owned by parents, their wages are exempt from FICA and FUTA taxes, and they pay little to no income tax on the first ~$14,600/year (the 2024 standard deduction). The key rules: (1) The work must be real and necessary — document job descriptions and hours worked. (2) Pay must be reasonable for the work performed — consistent with what you'd pay a non-family member. (3) Keep proper payroll records just as you would for any employee. (4) Funds paid to children can be used to fund Roth IRAs, starting their retirement savings decades early. The IRS actively scrutinizes family payroll — documentation and reasonableness are non-negotiable."
      }
    ]
  }
];

function QAItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4 p-6 hover:bg-slate-50 transition-colors"
      >
        <span className="text-slate-900 font-medium leading-snug">{question}</span>
        {isOpen
          ? <ChevronUp className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
        }
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
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
  const [openItem, setOpenItem] = useState(null); // "sectionIndex-questionIndex"

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qaData.flatMap(category =>
      category.questions.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a
        }
      }))
    )
  };

  return (
    <main className="bg-white">
      <Helmet>
        <title>Financial Questions & Answers | Austin Wealth Management</title>
        <meta name="description" content="Answers to the financial questions Austin families ask most — from investing basics to tax strategy and retirement planning." />
        <link rel="canonical" href="https://www.austinwealthmgmt.com/questions-answers" />
        <meta property="og:title" content="Financial Questions & Answers | Austin Wealth Management" />
        <meta property="og:description" content="Answers to the financial questions Austin families ask most — from investing basics to tax strategy and retirement planning." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Questions & Answers | Austin Wealth Management" />
        <meta name="twitter:description" content="Answers to the financial questions Austin families ask most — from investing basics to tax strategy and retirement planning." />
        <meta name="twitter:image" content="https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-social-share.jpg" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.austinwealthmgmt.com" }, { "@type": "ListItem", "position": 2, "name": "Questions & Answers", "item": "https://www.austinwealthmgmt.com/questions-answers" }] })}</script>
      </Helmet>
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
                {(section.category === "Restricted Stock Units (RSUs)" || section.category === "Employee Stock Purchase Plan (ESPP)" || section.category === "Incentive Stock Options (ISOs)") && si === 0 && (
                  <p className="mb-6 text-sm text-slate-500">
                    These topics are also covered in depth on our{' '}
                    <Link to={createPageUrl('Planning')} className="text-amber-600 hover:text-amber-700">Financial Planning page</Link>
                    {' '}and{' '}
                    <Link to={createPageUrl('Education')} className="text-amber-600 hover:text-amber-700">Education page</Link>.
                  </p>
                )}
                {section.category === "Retirement Planning ($2M+ Saved)" && (
                  <p className="mb-6 text-sm text-slate-500">
                    Ready to build your retirement plan?{' '}
                    <Link to={createPageUrl('Contact')} className="text-amber-600 hover:text-amber-700">Talk to an advisor →</Link>
                  </p>
                )}
                {section.category === "Business Owners ($3M+ Business)" && (
                  <p className="mb-6 text-sm text-slate-500">
                    Learn more about our approach to{' '}
                    <Link to={createPageUrl('Planning')} className="text-amber-600 hover:text-amber-700">business owner financial planning →</Link>
                  </p>
                )}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase whitespace-nowrap">
                    {section.category}
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="space-y-3">
                  {section.questions.map((item, qi) => {
                    const key = `${si}-${qi}`;
                    return (
                      <QAItem
                        key={qi}
                        question={item.q}
                        answer={item.a}
                        isOpen={openItem === key}
                        onToggle={() => setOpenItem(openItem === key ? null : key)}
                      />
                    );
                  })}
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