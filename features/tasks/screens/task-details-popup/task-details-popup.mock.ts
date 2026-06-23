import type { TaskDetailsPopupMock } from './task-details-popup.types';

export const taskDetailsDesktopMock: TaskDetailsPopupMock = {
  assignee: {
    initials: 'MT',
    name: 'Mahmoud Taha',
    role: 'Senior Frontend Engineer',
  },
  createdAt: '10 Oct 2025',
  description:
    'Detailed task description goes here. This involves updating the modal container background to use semi-transparent surface colors with a 20px backdrop-blur to align with the Digital Curator aesthetic. Ensure contrast ratios remain accessible.',
  dueDate: '22 Oct 2025',
  epicLabel: 'EPIC-102 (Core UI Overhaul)',
  reporter: {
    initials: 'AS',
    name: 'Alex Sterling',
    role: 'Reporter',
  },
  status: 'COMPLETED',
  taskKey: 'TASK-125',
  title: 'Implement glassmorphism effect on modals',
};

export const taskDetailsMobileMock: TaskDetailsPopupMock = {
  assignee: {
    initials: 'MK',
    name: 'Mike Kern',
    role: 'Product Designer',
  },
  createdAt: '10 Oct 2025',
  description:
    'Detailed task description goes here. Ensure all layers use the prescribed tonal shifts instead of borders. Focus on high-quality visual polish and editorial spacing for better readability on small screens.',
  dueDate: '22 Oct 2025',
  epicLabel: 'EPIC-102',
  reporter: {
    initials: 'AS',
    name: 'Alex Sterling',
    role: 'Project Lead',
  },
  status: 'COMPLETED',
  taskKey: 'TASK-125',
  title: 'Implement glassmorphism effect on modals',
};
