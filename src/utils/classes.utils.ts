import { ClassNameValue, twMerge } from 'tailwind-merge';

export const classes = (...classLists: ClassNameValue[]) => twMerge(classLists);
