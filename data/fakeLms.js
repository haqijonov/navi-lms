// Mock data structure for NAVI LMS

export const courseYear = {
  id: 'year-1',
  title: 'Year 1',
  subtitle: 'Front-End development',
  overallProgress: 25, // percentage
}

export const blocks = [
  {
    id: 'block-1',
    title: 'Block 1',
    months: [1, 2, 3, 4, 5, 6],
    status: 'active',
  },
  {
    id: 'block-2',
    title: 'Block 2',
    months: [7, 8, 9, 10, 11, 12],
    status: 'locked',
  },
]

export const months = [
  {
    id: 'month-1',
    number: 1,
    title: 'HTML & Basics',
    progress: 100,
    status: 'completed',
    lessons: [
      { id: 'lesson-1-1', title: 'Introduction to HTML', status: 'completed', order: 1 },
      { id: 'lesson-1-2', title: 'HTML Structure', status: 'completed', order: 2 },
      { id: 'lesson-1-3', title: 'HTML Elements', status: 'completed', order: 3 },
      { id: 'lesson-1-4', title: 'Forms & Inputs', status: 'completed', order: 4 },
      { id: 'lesson-1-5', title: 'Semantic HTML', status: 'completed', order: 5 },
      { id: 'lesson-1-6', title: 'HTML Best Practices', status: 'completed', order: 6 },
      { id: 'lesson-1-7', title: 'Project: Landing Page', status: 'completed', order: 7 },
      { id: 'lesson-1-8', title: 'Review & Quiz', status: 'completed', order: 8 },
      { id: 'lesson-1-9', title: 'Advanced HTML', status: 'completed', order: 9 },
      { id: 'lesson-1-10', title: 'Accessibility Basics', status: 'completed', order: 10 },
      { id: 'lesson-1-11', title: 'HTML5 Features', status: 'completed', order: 11 },
      { id: 'lesson-1-12', title: 'Final Project', status: 'completed', order: 12 },
    ],
  },
  {
    id: 'month-2',
    number: 2,
    title: 'CSS & Styling',
    progress: 100,
    status: 'completed',
    lessons: [
      { id: 'lesson-2-1', title: 'CSS Introduction', status: 'completed', order: 1 },
      { id: 'lesson-2-2', title: 'Selectors & Properties', status: 'completed', order: 2 },
      { id: 'lesson-2-3', title: 'Box Model', status: 'completed', order: 3 },
      { id: 'lesson-2-4', title: 'Layout & Positioning', status: 'completed', order: 4 },
      { id: 'lesson-2-5', title: 'Flexbox Basics', status: 'completed', order: 5 },
      { id: 'lesson-2-6', title: 'Grid Layout', status: 'completed', order: 6 },
      { id: 'lesson-2-7', title: 'Responsive Design', status: 'completed', order: 7 },
      { id: 'lesson-2-8', title: 'CSS Variables', status: 'completed', order: 8 },
      { id: 'lesson-2-9', title: 'Animations', status: 'completed', order: 9 },
      { id: 'lesson-2-10', title: 'Project: Portfolio', status: 'completed', order: 10 },
      { id: 'lesson-2-11', title: 'CSS Best Practices', status: 'completed', order: 11 },
      { id: 'lesson-2-12', title: 'Review & Quiz', status: 'completed', order: 12 },
    ],
  },
  {
    id: 'month-3',
    number: 3,
    title: 'CSS & Responsiveness',
    progress: 75,
    status: 'current',
    lessons: [
      { id: 'lesson-3-1', title: 'Media Queries', status: 'completed', order: 1, types: ['video', 'theory', 'task'] },
      { id: 'lesson-3-2', title: 'Mobile-First Design', status: 'completed', order: 2, types: ['video', 'theory', 'task'] },
      { id: 'lesson-3-3', title: 'Breakpoints', status: 'completed', order: 3, types: ['video', 'theory'] },
      { id: 'lesson-3-4', title: 'Flexible Units', status: 'completed', order: 4, types: ['video', 'theory', 'task'] },
      { id: 'lesson-3-5', title: 'Responsive Images', status: 'completed', order: 5, types: ['video', 'task'] },
      { id: 'lesson-3-6', title: 'Viewport Units', status: 'completed', order: 6, types: ['video', 'theory', 'task', 'quiz'] },
      { id: 'lesson-3-7', title: 'Current Lesson', status: 'current', order: 7, types: ['video', 'theory', 'task'] },
      { id: 'lesson-3-8', title: 'Advanced Responsive', status: 'locked', order: 8, types: ['video', 'theory', 'task'] },
      { id: 'lesson-3-9', title: 'Project: Responsive Site', status: 'locked', order: 9, types: ['video', 'task', 'project'] },
      { id: 'lesson-3-10', title: 'Testing & Debugging', status: 'locked', order: 10, types: ['video', 'theory'] },
      { id: 'lesson-3-11', title: 'Performance', status: 'locked', order: 11, types: ['video', 'theory', 'task'] },
      { id: 'lesson-3-12', title: 'Review & Quiz', status: 'locked', order: 12, types: ['video', 'quiz', 'project'] },
    ],
  },
  {
    id: 'month-4',
    number: 4,
    title: 'JavaScript Basics',
    progress: 0,
    status: 'upcoming',
    lessons: [
      { id: 'lesson-4-1', title: 'JS Introduction', status: 'locked', order: 1 },
      { id: 'lesson-4-2', title: 'Variables & Types', status: 'locked', order: 2 },
      { id: 'lesson-4-3', title: 'Functions', status: 'locked', order: 3 },
      { id: 'lesson-4-4', title: 'Control Flow', status: 'locked', order: 4 },
      { id: 'lesson-4-5', title: 'Arrays & Objects', status: 'locked', order: 5 },
      { id: 'lesson-4-6', title: 'DOM Manipulation', status: 'locked', order: 6 },
      { id: 'lesson-4-7', title: 'Events', status: 'locked', order: 7 },
      { id: 'lesson-4-8', title: 'Async Basics', status: 'locked', order: 8 },
      { id: 'lesson-4-9', title: 'Project: Interactive App', status: 'locked', order: 9 },
      { id: 'lesson-4-10', title: 'ES6 Features', status: 'locked', order: 10 },
      { id: 'lesson-4-11', title: 'Best Practices', status: 'locked', order: 11 },
      { id: 'lesson-4-12', title: 'Review & Quiz', status: 'locked', order: 12 },
    ],
  },
  {
    id: 'month-5',
    number: 5,
    title: 'Advanced JavaScript',
    progress: 0,
    status: 'locked',
    lessons: Array.from({ length: 12 }, (_, i) => ({
      id: `lesson-5-${i + 1}`,
      title: `Lesson ${i + 1}`,
      status: 'locked',
      order: i + 1,
    })),
  },
  {
    id: 'month-6',
    number: 6,
    title: 'React Fundamentals',
    progress: 0,
    status: 'locked',
    lessons: Array.from({ length: 12 }, (_, i) => ({
      id: `lesson-6-${i + 1}`,
      title: `Lesson ${i + 1}`,
      status: 'locked',
      order: i + 1,
    })),
  },
]

// Helper function to get month by ID
export function getMonthById(monthId) {
  return months.find(m => m.id === monthId)
}

// Helper function to get lesson by ID
export function getLessonById(lessonId) {
  for (const month of months) {
    const lesson = month.lessons.find(l => l.id === lessonId)
    if (lesson) {
      return { ...lesson, monthId: month.id, monthTitle: month.title }
    }
  }
  return null
}

// Mock lesson content
export const lessonContent = {
  'lesson-3-7': {
    title: 'Current Lesson',
    video: {
      thumbnail: '/api/placeholder/800/450',
      duration: '15:30',
    },
    theory: `
# Responsive Design Principles

## Introduction
Responsive design ensures your website looks great on all devices.

## Key Concepts

### 1. Fluid Layouts
Use relative units like percentages and viewport units instead of fixed pixels.

### 2. Flexible Images
Images should scale with their container using \`max-width: 100%\`.

### 3. Media Queries
Breakpoints help you adjust styles for different screen sizes.

## Best Practices
- Mobile-first approach
- Test on real devices
- Consider touch targets
- Optimize performance
    `,
    tasks: [
      { id: 'task-1', text: 'Create a responsive navigation menu', completed: false },
      { id: 'task-2', text: 'Implement mobile-first breakpoints', completed: false },
      { id: 'task-3', text: 'Test on multiple screen sizes', completed: false },
      { id: 'task-4', text: 'Optimize images for different devices', completed: false },
    ],
  },
}

// Default lesson content if not found
export function getLessonContent(lessonId) {
  return lessonContent[lessonId] || {
    title: 'Lesson Content',
    video: {
      thumbnail: '/api/placeholder/800/450',
      duration: '10:00',
    },
    theory: '# Lesson Content\n\nThis lesson content will be available soon.',
    tasks: [
      { id: 'task-1', text: 'Complete the lesson exercises', completed: false },
    ],
  }
}
