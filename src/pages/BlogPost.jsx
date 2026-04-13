import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { createPageUrl } from '@/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

const blogPosts = [
  {
    id: 1,
    title: "Trump Savings Accounts",
    excerpt: "The 2025 passage of the One Big Beautiful Bill Act introduced the Trump Account, a unique custodial investment tool designed to jumpstart savings for young Americans. For nearly three decades, families have relied on 529 plans...",
    author: "Manisha Gupta, CFP®, MBA",
    date: "April 1, 2026",
    category: "Saving",
    image: "https://media.base44.com/images/public/6960325a10892c1a1fc0a802/5b61ef198_generated_image.png",
    content: `The 2025 passage of the One Big Beautiful Bill Act introduced the Trump Account, a unique custodial investment tool designed to jumpstart savings for young Americans. For nearly three decades, families have relied on 529 plans to save for education, and now the Trump Account provides an innovative alternative for those looking to build wealth from an early age.

Understanding the Trump Account

The Trump Account is a custodial savings vehicle that allows parents and guardians to invest money on behalf of minors. Unlike traditional savings accounts, these funds are invested in the market, providing exposure to growth potential. The key features include:

- Flexible investment options tailored to the beneficiary's age and risk tolerance
- Tax advantages on investment gains
- Control and oversight through custodial arrangements
- Seamless transfers to adult accounts upon reaching the age of majority

Comparing Trump Accounts to 529 Plans

While 529 plans remain excellent for education savings, Trump Accounts offer broader flexibility. Funds in a Trump Account can be used for any purpose once the beneficiary reaches adulthood, whereas 529 funds are earmarked for education expenses. This flexibility makes Trump Accounts particularly attractive for families looking to build general wealth for their children.

Key Considerations

Before opening a Trump Account, families should consider:

- Their savings goals and investment timeline
- The beneficiary's age and investment horizon
- Tax implications in their state
- Custodial account management requirements

Getting Started

If you're interested in opening a Trump Account for your child or grandchild, Austin Wealth Management can help you navigate the process and determine if it's the right fit for your family's financial goals. Our advisors understand the nuances of these new accounts and can provide personalized guidance.

Schedule a consultation with our team to learn more about how Trump Accounts and other savings vehicles can help you achieve your financial objectives.`
  },
  {
    id: 2,
    title: "Accessing Your 2025 Tax Documents",
    excerpt: "Your 2025 tax forms are available for download from Charles Schwab. If you opted to receive your tax documents by mail, they should arrive soon. How to Access Your Tax Forms Online: Charles Schwab Client Portal...",
    author: "Sheila Schmitt",
    date: "March 13, 2026",
    category: "Tax Planning",
    image: "https://media.base44.com/images/public/6960325a10892c1a1fc0a802/93ab674b1_generated_image.png",
    content: `Your 2025 tax forms are available for download from Charles Schwab. If you opted to receive your tax documents by mail, they should arrive soon. Here's a comprehensive guide to accessing your tax documents and preparing for tax season.

How to Access Your Tax Forms Online

Charles Schwab Client Portal

1. Log in to your Charles Schwab account
2. Navigate to "Account" → "Tax Center"
3. Select the year (2025)
4. Download the forms you need (1099s, 1098s, etc.)
5. Save copies for your records and tax preparer

Alternative Methods

If you have difficulty accessing forms online, you can:
- Call Charles Schwab client service at 1-800-SCHWAB-1
- Visit your local Schwab branch
- Request forms be mailed to you

Understanding Your Tax Forms

Common forms you'll receive include:

Form 1099-INT: Interest Income
- Reports interest earned on savings accounts and money market funds
- Required if interest exceeds $10

Form 1099-DIV: Dividend Income
- Reports dividends from stocks, mutual funds, and ETFs
- Includes qualified and non-qualified dividends

Form 1099-B: Broker Statements
- Reports proceeds from sales of stocks, bonds, and mutual funds
- Essential for calculating capital gains or losses

Form 1098-T: Education Credits
- If you paid qualified education expenses

Important Deadlines

- Tax documents typically available by January 31
- Tax filing deadline: April 15, 2026
- Estimated quarterly tax payments: June 15, 2026

Next Steps

Once you have your forms:
1. Organize documents by type
2. Gather receipts for deductible expenses
3. Review statements for accuracy
4. Contact your tax advisor or CPA for guidance

Austin Wealth Management can help you coordinate with your tax preparer to ensure all investment and financial information is properly reported. Schedule a consultation to discuss your 2025 tax situation and year-end planning strategies.`
  },
  {
    id: 3,
    title: "Charitable Giving 101: A Beginner's Guide to Tax-Smart Donation Strategies",
    excerpt: "The holiday season is upon us, and with that often comes a desire to give back. Whether through volunteering your time, sharing your expertise, or donating resources like clothing, food, and money...",
    author: "Nikki Yates, CFP®",
    date: "December 9, 2025",
    category: "Charity",
    image: "https://media.base44.com/images/public/6960325a10892c1a1fc0a802/dd3bd6b8c_generated_image.png",
    content: `The holiday season is upon us, and with that often comes a desire to give back. Whether through volunteering your time, sharing your expertise, or donating resources like clothing, food, and money, charitable giving is a meaningful way to make a difference. But did you know that smart charitable giving can also benefit your finances? Let's explore tax-smart donation strategies.

The Tax Benefits of Charitable Giving

When you donate to qualified charitable organizations, you can deduct those contributions on your federal income tax return, potentially reducing your taxable income. However, to claim these deductions, you must itemize deductions rather than taking the standard deduction.

Standard Deduction vs. Itemizing

For 2025, the standard deduction is:
- Single: $14,600
- Married filing jointly: $29,200
- Head of household: $21,900

If your total itemized deductions (including charitable contributions) exceed the standard deduction, itemizing becomes beneficial.

Tax-Smart Charitable Strategies

1. Donor-Advised Funds (DAFs)
A DAF allows you to make a charitable contribution, receive an immediate tax deduction, and distribute funds to charities over time. This is particularly useful for high-income years.

2. Appreciated Securities
Instead of donating cash, donate appreciated stocks or mutual funds. You avoid capital gains taxes while receiving a deduction for the fair market value.

3. Charitable IRA Distributions
If you're over 70½, you can make direct IRA distributions to charities, satisfying required minimum distributions without increasing taxable income.

4. Charitable Bunching
Group charitable contributions into certain years to exceed the standard deduction, then itemize in those years.

Documenting Your Donations

To claim charitable deductions:
- Keep receipts for donations under $250
- Obtain written acknowledgment for donations $250 or more
- Maintain detailed records of non-cash donations
- Get a qualified appraisal for significant non-cash gifts

Choosing Qualified Charities

Not all organizations are eligible for tax-deductible donations. Verify charity status through:
- IRS Tax Exempt Organization Search (www.irs.gov)
- Charity Navigator (www.charitynavigator.org)
- GuideStar (www.guidestar.org)

Maximizing Impact

Combining tax benefits with charitable impact creates a win-win situation. At Austin Wealth Management, we help clients develop charitable giving strategies that align with their values and financial goals.

Let's talk about how you can give back while optimizing your tax situation. Schedule a consultation with our team today.`
  },
  {
    id: 4,
    title: "How Portfolio Rebalancing and Tax-Loss Harvesting Help Austin Wealth Management Improve Client Outcomes",
    excerpt: "Behind every AWM advisor is a dedicated team of investment professionals meticulously looking at each client account and watching for opportunities to improve our clients investment performance...",
    author: "Parker Manson",
    date: "December 6, 2025",
    category: "Investing",
    image: "https://media.base44.com/images/public/6960325a10892c1a1fc0a802/d9b999426_generated_image.png",
    content: `Behind every AWM advisor is a dedicated team of investment professionals meticulously looking at each client account and watching for opportunities to improve client investment performance. Two critical strategies we employ are portfolio rebalancing and tax-loss harvesting.

What is Portfolio Rebalancing?

Portfolio rebalancing is the process of adjusting your investment mix to maintain your target asset allocation. Over time, market movements cause some investments to grow faster than others, shifting your portfolio away from its original allocation.

For example, if your target allocation is 60% stocks and 40% bonds, and a bull market pushes stocks to 70% of your portfolio, rebalancing involves selling some stock positions and buying bonds to restore the 60/40 balance.

Benefits of Regular Rebalancing

1. Risk Management
Maintaining your target allocation ensures your portfolio's risk level remains consistent with your goals and comfort level.

2. Disciplined Approach
Rebalancing forces a "buy low, sell high" mentality by requiring you to sell outperformers and buy underperformers.

3. Long-Term Performance
Studies show that regularly rebalanced portfolios tend to perform more consistently over long periods.

Understanding Tax-Loss Harvesting

Tax-loss harvesting involves selling investments that have declined in value to realize losses that can offset capital gains and potentially reduce taxable income.

Here's how it works:
1. Identify investments with unrealized losses
2. Sell them to realize the loss
3. Use the loss to offset capital gains from other investments
4. If losses exceed gains, deduct up to $3,000 of losses against ordinary income
5. Carry forward any remaining losses to future years

Important Wash Sale Rules

The IRS prohibits buying the same or substantially identical security within 30 days before or after a loss sale (the wash sale rule). At AWM, we carefully navigate these rules by:
- Replacing positions with similar but not identical investments
- Tracking holding periods meticulously
- Documenting all transactions for tax purposes

The AWM Advantage

Our investment team continuously monitors client portfolios for:
- Rebalancing opportunities aligned with market movements
- Tax-loss harvesting opportunities throughout the year
- Coordination between investment strategy and tax planning
- Cost-effective execution to minimize trading costs

A Concrete Example

Consider a client with a diversified portfolio that experienced significant market volatility. Our team identified:
- Overweight technology positions (70% of equity allocation vs. target 40%)
- Tax-loss harvesting opportunities in underperforming positions totaling $25,000 in losses

We:
1. Rebalanced by selling excess tech positions and buying underweighted sectors
2. Harvested tax losses to offset capital gains from earlier in the year
3. Used remaining losses to reduce ordinary income by $3,000

The result? The client maintained their target allocation while improving their tax situation by approximately $7,500 in tax savings.

Bringing It All Together

Effective wealth management requires a holistic approach that considers investment strategy, risk management, and tax efficiency. At Austin Wealth Management, our team works together to implement these strategies consistently and thoughtfully.

If you're curious about how portfolio rebalancing and tax-loss harvesting could benefit your portfolio, schedule a consultation with our team.`
  },
  {
    id: 5,
    title: "New 2026 IRS Limits: Bigger Breaks, Bigger Planning Opportunities",
    excerpt: "The IRS and Social Security Administration have released key numbers for 2026, including new federal income tax brackets, a higher standard deduction, bigger retirement and HSA contribution limits...",
    author: "Manisha Gupta, CFP®, MBA",
    date: "December 5, 2025",
    category: "Tax Planning",
    image: "https://media.base44.com/images/public/6960325a10892c1a1fc0a802/a7013e32d_generated_image.png",
    content: `The IRS and Social Security Administration have released key numbers for 2026, including new federal income tax brackets, a higher standard deduction, bigger retirement and HSA contribution limits, and more. Here's what changed and how you can take advantage.

2026 Standard Deduction

The standard deduction increases for all filing statuses:

- Single: $14,600 (up $350)
- Married filing jointly: $29,200 (up $700)
- Head of household: $21,900 (up $500)
- Married filing separately: $14,600 (up $350)

If your income falls below these amounts, you may not need to file a federal tax return.

2026 Tax Brackets

Federal income tax brackets are adjusted for inflation annually. For 2026, the brackets increase slightly, meaning some income that was previously taxed at a higher rate may now be taxed at a lower rate. This is especially important for strategic year-end planning.

Retirement Contribution Limits for 2026

Good news for savers!

401(k), 403(b), and Most 457 Plans:
- Employee deferrals: $24,500 (up from $23,500)
- Catch-up contributions (age 50+): $8,500 (unchanged)
- Total: $33,000

Traditional and Roth IRAs:
- Contribution limit: $7,000 (unchanged)
- Catch-up contributions (age 50+): $1,000 (unchanged)
- Total: $8,000

Health Savings Account (HSA):
- Self-only coverage: $4,300 (up from $4,150)
- Family coverage: $8,550 (up from $8,300)
- Catch-up contributions (age 55+): $1,150 (unchanged)

Social Security Updates

Full Retirement Age: Continues to gradually increase. Those born in 1959 have a full retirement age of 66 years and 10 months.

Maximum Taxable Earnings: $174,900 (up from $168,600 in 2025), meaning self-employed individuals and employees pay Social Security taxes on earnings up to this amount.

Planning Strategies for 2026

1. Maximize Retirement Contributions
With higher contribution limits, increase your 401(k) deferral or IRA contributions to take advantage of tax-deferred or tax-free growth.

2. HSA Prioritization
If eligible, max out your HSA. It's the only account that offers triple tax benefits: contributions are tax-deductible, growth is tax-free, and qualified distributions are tax-free.

3. Tax-Loss Harvesting
Year-end is an excellent time to harvest investment losses to offset gains realized during the year.

4. Charitable Giving
Bundle charitable contributions in high-income years to itemize deductions and increase tax benefits.

5. Roth Conversions
Consider converting traditional IRA funds to Roth IRAs, especially in years when income is lower than expected.

Coordinating with Your Overall Plan

These changes are important, but they're just one piece of your comprehensive financial plan. At Austin Wealth Management, we consider your:
- Current and projected income
- Tax filing status and family situation
- Retirement goals and timeline
- Investment strategy and risk tolerance
- Estate planning objectives

Let's make sure you're taking full advantage of these 2026 changes. Schedule a consultation with our team to discuss your personalized tax and retirement strategy.`
  },
  {
    id: 6,
    title: "Final Countdown: Your Year-End Contribution and Transaction Deadlines",
    excerpt: "December is a good time to review deadlines for contributions, distributions, charitable giving, and account updates. Many account actions must be completed before December 31...",
    author: "Sheila Schmitt",
    date: "December 1, 2025",
    category: "Tax Planning",
    image: "https://media.base44.com/images/public/6960325a10892c1a1fc0a802/ef2470b97_generated_image.png",
    content: `December is a good time to review deadlines for contributions, distributions, charitable giving, and account updates. Many account actions must be completed before December 31 to realize their tax benefits in the current year. Here's your year-end financial checklist.

IRA and SEP-IRA Contributions

Deadline: December 31, 2025

- Traditional IRA contributions
- Roth IRA contributions
- Backdoor Roth conversions

Note: You have until April 15, 2026 (tax filing deadline) to make prior-year contributions, but to claim them on your 2025 taxes, they must be received by December 31.

401(k) and 403(b) Deferrals

Deadline: December 31, 2025 (employer payroll cutoff date varies)

Elective deferrals (employee contributions) must be withheld from your last paycheck of the year. Check with your HR department for the payroll cutoff date, as it may be before December 31.

Employer Profit-Sharing and Matching Contributions

Deadline: Varies by plan (typically December 31 for calendar year plans)

While employee deferrals have a calendar-year deadline, employer contributions can sometimes be made until the tax filing deadline with an extension. Check your plan documents or contact your employer.

Charitable Giving

Deadline: December 31, 2025

To claim a deduction on your 2025 tax return:
- Cash donations must be paid by December 31
- Non-cash donations must be delivered (not mailed) by December 31
- Checks written before year-end but postmarked after January 1 may not qualify

Consider these strategies:
- Donor-Advised Funds (make contribution by 12/31, recommend distributions later)
- Appreciated securities (avoid capital gains taxes)
- Qualified charitable distributions from IRAs (if age 70½+)

Required Minimum Distributions (RMDs)

Deadline: December 31, 2025

If you're age 73 or older:
- Must withdraw from traditional IRAs, SEP-IRAs, and 401(k)s
- Failure to withdraw results in a 25% penalty on the amount not withdrawn (reduced to 10% if corrected timely)
- Exceptions exist for still-employed individuals and certain plans

Roth Conversions and Transfers

Deadline: December 31, 2025

- Roth conversions must be completed and reflected in your account
- Trustee-to-trustee transfers for account rollovers
- 60-day rollovers (be careful—strict deadline rules apply)

Estimated Quarterly Tax Payments

Deadline: December 31, 2025 (Fourth Quarter)

If you're self-employed or have significant non-withheld income:
- Make your Q4 estimated tax payment by year-end
- Failure to pay can result in penalties and interest

Flexible Spending Account (FSA) and Dependent Care Account Elections

Deadline: Typically December 31, 2025

- FSA and dependent care account contributions must be claimed by year-end
- Unused balances may be forfeited (though some plans offer grace periods)
- Changes to elections generally require a qualifying life event

Charitable Remainder Trust (CRT) and Donor-Advised Fund (DAF) Contributions

Deadline: December 31, 2025

- Contributions must be completed to claim deductions in 2025
- Documents must be signed and funded

Investment-Related Deadlines

Tax-Loss Harvesting: December 31, 2025

- Sell securities with losses to offset gains
- Remember the 30-day wash sale rule

Rebalancing: By year-end

- Adjust portfolio allocations for tax efficiency and risk management

Year-End Planning Checklist

□ Check tax withholding on W-4 or quarterly estimates
□ Review retirement account contributions (have you maxed out?)
□ Consider Roth conversions
□ Plan charitable giving
□ Execute tax-loss harvesting
□ Verify all distributions and rollovers are processed
□ Update beneficiaries on retirement accounts
□ Review insurance coverage
□ Document investment cost basis

Don't Miss These Opportunities

Year-end planning doesn't have to be overwhelming. The key is addressing these items proactively rather than scrambling at the last minute. At Austin Wealth Management, our team can help you navigate these deadlines and implement strategies that align with your overall financial goals.

Schedule a consultation with us before year-end to ensure you're taking full advantage of 2025's tax planning opportunities and positioning yourself well for 2026.`
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <main className="bg-white">
        <section className="py-32 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-light text-slate-900">Article Not Found</h1>
            <p className="mt-4 text-slate-600">Sorry, we couldn't find the article you're looking for.</p>
            <Link to={createPageUrl('Blog')}>
              <Button className="mt-8 bg-amber-500 hover:bg-amber-600 text-slate-950">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img 
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400 bg-amber-500/20 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Meta Information */}
          <AnimatedSection className="mb-8 pb-8 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>
          </AnimatedSection>

          {/* Article Body */}
          <AnimatedSection className="prose prose-slate max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection className="mt-16 pt-12 border-t border-slate-200">
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-light text-slate-900 mb-4">
                Have questions about this topic?
              </h3>
              <p className="text-slate-600 mb-8">
                Our financial advisors are here to help. Schedule a consultation to discuss how these insights apply to your situation.
              </p>
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Back to Blog */}
          <AnimatedSection className="mt-12 text-center">
            <Link to={createPageUrl('Blog')}>
              <Button variant="outline" className="border-slate-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}