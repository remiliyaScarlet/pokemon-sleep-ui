import {GenerateMetadata} from '@/types/next/metadata';
import {AdminAnnouncement} from '@/ui/admin/announcement/main';


export const generateMetadata: GenerateMetadata = async () => ({
  title: 'Site Announcement | Pokemon Sleep Info Website Admin',
});

export default AdminAnnouncement;
