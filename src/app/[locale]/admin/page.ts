import {GenerateMetadata} from '@/types/next/metadata';
import {SiteAdminIndex} from '@/ui/admin/index/main';


export const generateMetadata: GenerateMetadata = async () => ({
  title: 'Index | Pokemon Sleep Info Website Admin',
});

export default SiteAdminIndex;
