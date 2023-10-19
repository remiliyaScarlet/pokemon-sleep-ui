import {GenerateMetadata} from '@/types/next/metadata';
import {SiteAdminEntry} from '@/ui/admin/main';


export const generateMetadata: GenerateMetadata = async () => ({
  title: 'Pokemon Sleep Info Website Admin',
  description: 'Pokemon Sleep Info Website Admin page.',
});

export default SiteAdminEntry;
