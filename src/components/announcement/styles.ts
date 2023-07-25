import {AnnouncementLevel} from '@/types/mongo/announcement';


export const alertClasses: {[level in AnnouncementLevel]: string} = {
  info: 'text-blue-700 dark:text-cyan-300',
  ok: 'text-emerald-700 dark:text-green-300',
  warning: 'text-yellow-700 dark:text-amber-300',
  alert: 'text-red-700 dark:text-red-300',
};

export const alertClassCommon = 'h-10 overflow-hidden text-sm md:h-5';
