import {AnnouncementLevel} from '@/types/mongo/announcement';


export const alertClasses: {[level in AnnouncementLevel]: string} = {
  info: 'text-cyan-600 dark:text-cyan-300',
  ok: 'text-green-600 dark:text-green-300',
  warning: 'text-amber-600 dark:text-amber-300',
  alert: 'text-red-600 dark:text-red-300',
};

export const alertClassCommon = 'h-10 overflow-hidden text-sm md:h-5';
