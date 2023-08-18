import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {AboutSection} from '@/ui/about/section';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const About = () => {
  const t = useTranslations('UI.Metadata');

  return (
    <PublicPageLayout>
      <Flex direction="col" center className="info-section !gap-8">
        <Flex direction="col" className="gap-2">
          <div className="text-2xl">
            {t('SiteName')}
          </div>
          <AboutSection title="Discord">
            <Link href="https://discord.gg/t83mqYKEf5" className="border-b border-slate-500">
              https://discord.gg/t83mqYKEf5
            </Link>
          </AboutSection>
        </Flex>
        <Flex direction="col" className="gap-8 md:flex-row">
          <Flex direction="col" className="gap-3">
            <Flex direction="col" center className="relative h-10 w-10">
              <UserCircleIcon/>
            </Flex>
            <AboutSection title="Discord">
              @raenonx
            </AboutSection>
            <AboutSection title="LINE">
              RaenonX
            </AboutSection>
          </Flex>
          <Flex direction="col" className="gap-2">
            <Flex direction="col" center className="relative h-10 w-10">
              <CurrencyDollarIcon/>
            </Flex>
            <AboutSection title="Patreon">
              <Link href="https://patreon.com/RaenonX" className="border-b border-slate-500">
                https://patreon.com/RaenonX
              </Link>
            </AboutSection>
            <AboutSection title="USDT (TRC20)">
              TAztRpSHJk8GbZtNuxoyzndFrAfcorh87v
            </AboutSection>
            <AboutSection title="USDT / USDC (ERC20 / Cronos / Polygon)">
              0x8d3aD05D87f29E3617e93bF7D49b01940E04d8cb
            </AboutSection>
            <AboutSection title="Zelle (US)">
              (Discord / LINE)
            </AboutSection>
          </Flex>
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
