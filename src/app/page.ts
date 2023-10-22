import {redirect} from '@/components/i18n';
import {defaultLocale} from '@/const/website';


const Index = () => {
  redirect(`/${defaultLocale}`);
};

// This page only renders when the app is built statically (output: 'export')
export default Index;
