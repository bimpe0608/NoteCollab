import { NavItem } from '../types';
import firebase from 'firebase/app';
import 'firebase/firestore';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active',
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active',
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active',
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active',
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active',
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
  },
];

export type Employee = {
  id: string;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  lastSignin: string;
  role: {
    _id: string;
    name: string;
    id: string;
  };
  emailVerified: boolean;
};
export type Talent = {
  id: string;
  _id: string;
  fullname: string;

  phone: string;
  address: string;
  country: string;
  city: string;
  state: string;
  bio: string;
  cv: string;
  introVideo: string;
  profilePhoto: string;
  lastSignin: string;
  role: {
    _id: string;
    name: string;
    id: string;
  };
  emailVerified: boolean;
};

export type Job = {
  id: string;
  _id: string;
  approved: boolean;
  description: string;
  draft: string;
  location: string;
  minAmount: string;
  maxAmount: string;
  publish: string;
  slug: string;
  taskTodo: string;
  title: string;
  lastSignin: string;
  recruiter: {
    _id?: string;
    fullname?: string;
    email?: string;
    companyName?: string;
    industry?: string;
    companyLogo?: string;
  };
  requirements: string;
  category: {
    _id?: string;
    name?: string;
    slug?: string;
  };
};

export type Recruiter = {
  id?: string;
  _id?: string;
  fullname?: string;
  phone?: string;
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  bio?: string;
  cv?: string;
  introVideo?: string;
  profilePhoto?: string;
  lastSignin?: string;
  role: {
    _id?: string;
    name?: string;
    id?: string;
  };
  emailVerified?: boolean;
  businessEmail?: string;
};

export type Applications = {
  id?: string;
  _id?: string;
  recruiter: {
    _id?: string;
    fullname?: string;
    email?: string;
    companyName?: string;
    industry?: string;
    companyLogo?: string;
  };
  talent?: {
    email?: string;
    fullname?: string;
    _id: string;
    ['key']?: any;
  };
  job: any;
  status: ApplicationStatus;
  cv?: string;
  __v?: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    disabled: false,
  },
  {
    title: 'Upload',
    href: '/dashboard/upload',
    icon: 'media',
    label: 'upload',
    disabled: false,
  },
  // {
  //   title: 'Notes',
  //   href: '/notes',
  //   icon: 'clipboardCopyIcon',
  //   label: 'Notes',
  //   disabled: false,
  // },
  {
    title: 'Collaborations',
    href: '/notes',
    icon: 'clipboardCopyIcon',
    label: 'Notes',
    disabled: false,
  },
];

export type JobCategory = {
  id: string;
  _id: string;
  active: boolean;
  description: string;
  name: string;
  displayImages: string[];
  icon: string;
  slug: string;
};
