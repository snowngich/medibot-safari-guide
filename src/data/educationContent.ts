
export interface EducationModule {
  id: string;
  title: string;
  category: 'Health Tips' | 'Preventive Care' | 'First Aid' | 'Micro Lessons';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  content: {
    sections: EducationSection[];
    quiz?: QuizQuestion[];
  };
  imageUrl?: string;
  tags: string[];
  targetAudience: 'CHW' | 'Public' | 'Both';
}

export interface EducationSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'infographic';
  imageUrl?: string;
  keyPoints?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  moduleId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
  timeSpent: number;
}

export const educationModules: EducationModule[] = [
  {
    id: 'malaria-prevention',
    title: 'Malaria Prevention in Rural Kenya',
    category: 'Preventive Care',
    level: 'Beginner',
    duration: '15 minutes',
    description: 'Learn essential malaria prevention strategies for rural communities',
    content: {
      sections: [
        {
          id: '1',
          title: 'Understanding Malaria Transmission',
          content: 'Malaria is transmitted through the bite of infected female Anopheles mosquitoes. These mosquitoes are most active during dusk and dawn.',
          type: 'text',
          keyPoints: [
            'Only female Anopheles mosquitoes transmit malaria',
            'Peak biting times: dusk to dawn',
            'Mosquitoes breed in stagnant water'
          ]
        },
        {
          id: '2',
          title: 'Prevention Methods',
          content: 'Multiple prevention strategies can significantly reduce malaria transmission in communities.',
          type: 'text',
          keyPoints: [
            'Sleep under treated mosquito nets',
            'Eliminate standing water around homes',
            'Use indoor residual spraying when available',
            'Wear long-sleeved clothing during peak hours'
          ]
        }
      ],
      quiz: [
        {
          id: '1',
          question: 'When are malaria mosquitoes most active?',
          options: ['Morning only', 'Afternoon only', 'Dusk to dawn', 'All day'],
          correctAnswer: 2,
          explanation: 'Anopheles mosquitoes are most active from dusk to dawn, which is why sleeping under nets is crucial.'
        }
      ]
    },
    tags: ['malaria', 'prevention', 'mosquito nets', 'rural health'],
    targetAudience: 'Both'
  },
  {
    id: 'child-pneumonia',
    title: 'Recognizing Childhood Pneumonia',
    category: 'Health Tips',
    level: 'Intermediate',
    duration: '20 minutes',
    description: 'Early recognition and management of pneumonia in children under 5',
    content: {
      sections: [
        {
          id: '1',
          title: 'Danger Signs in Children',
          content: 'Pneumonia is a leading cause of death in children under 5. Early recognition saves lives.',
          type: 'text',
          keyPoints: [
            'Fast breathing (age-specific rates)',
            'Chest indrawing',
            'Difficulty feeding or drinking',
            'Persistent cough',
            'Fever or hypothermia'
          ]
        },
        {
          id: '2',
          title: 'When to Refer Immediately',
          content: 'Some signs require immediate referral to a health facility.',
          type: 'text',
          keyPoints: [
            'Child cannot drink or breastfeed',
            'Vomits everything',
            'Has convulsions',
            'Is lethargic or unconscious',
            'Has severe chest indrawing'
          ]
        }
      ],
      quiz: [
        {
          id: '1',
          question: 'What is the most dangerous sign requiring immediate referral?',
          options: ['Mild cough', 'Inability to drink', 'Low fever', 'Runny nose'],
          correctAnswer: 1,
          explanation: 'Inability to drink or breastfeed is a general danger sign requiring immediate referral.'
        }
      ]
    },
    tags: ['pneumonia', 'children', 'danger signs', 'referral'],
    targetAudience: 'CHW'
  },
  {
    id: 'first-aid-basics',
    title: 'Basic First Aid for Rural Communities',
    category: 'First Aid',
    level: 'Beginner',
    duration: '25 minutes',
    description: 'Essential first aid skills for common emergencies in rural settings',
    content: {
      sections: [
        {
          id: '1',
          title: 'Scene Safety and Assessment',
          content: 'Always ensure your safety first before helping others.',
          type: 'text',
          keyPoints: [
            'Check for dangers before approaching',
            'Call for help if available',
            'Assess consciousness level',
            'Check for breathing and circulation'
          ]
        },
        {
          id: '2',
          title: 'Managing Severe Bleeding',
          content: 'Control bleeding using direct pressure and elevation.',
          type: 'text',
          keyPoints: [
            'Apply direct pressure with clean cloth',
            'Elevate injured part if possible',
            'Do not remove embedded objects',
            'Monitor for shock signs'
          ]
        },
        {
          id: '3',
          title: 'Burns Management',
          content: 'Immediate care for burns can prevent complications.',
          type: 'text',
          keyPoints: [
            'Cool with clean water for 20 minutes',
            'Remove clothing if not stuck',
            'Cover with clean, dry cloth',
            'Do not apply oils or home remedies'
          ]
        }
      ],
      quiz: [
        {
          id: '1',
          question: 'What is the first step in any emergency?',
          options: ['Give medication', 'Ensure scene safety', 'Call family', 'Move the patient'],
          correctAnswer: 1,
          explanation: 'Scene safety is always the first priority to prevent additional injuries.'
        }
      ]
    },
    tags: ['first aid', 'emergency', 'bleeding', 'burns', 'safety'],
    targetAudience: 'Both'
  },
  {
    id: 'nutrition-counseling',
    title: 'Nutrition Counseling for Mothers',
    category: 'Micro Lessons',
    level: 'Intermediate',
    duration: '18 minutes',
    description: 'Effective nutrition counseling techniques for maternal and child health',
    content: {
      sections: [
        {
          id: '1',
          title: 'Exclusive Breastfeeding (0-6 months)',
          content: 'Breast milk provides all nutrients needed for the first 6 months of life.',
          type: 'text',
          keyPoints: [
            'No water, tea, or other foods needed',
            'Breastfeed on demand (8-12 times daily)',
            'Proper positioning and attachment',
            'Continue even if mother is sick'
          ]
        },
        {
          id: '2',
          title: 'Complementary Feeding (6+ months)',
          content: 'Introducing appropriate foods while continuing breastfeeding.',
          type: 'text',
          keyPoints: [
            'Start at exactly 6 months',
            'Thick porridge, mashed foods',
            'Include animal products if available',
            'Continue breastfeeding up to 2 years'
          ]
        }
      ],
      quiz: [
        {
          id: '1',
          question: 'When should complementary feeding start?',
          options: ['4 months', '5 months', '6 months', '8 months'],
          correctAnswer: 2,
          explanation: 'Complementary feeding should start at exactly 6 months while continuing breastfeeding.'
        }
      ]
    },
    tags: ['nutrition', 'breastfeeding', 'complementary feeding', 'counseling'],
    targetAudience: 'CHW'
  },
  {
    id: 'water-sanitation',
    title: 'Water, Sanitation & Hygiene (WASH)',
    category: 'Preventive Care',
    level: 'Beginner',
    duration: '12 minutes',
    description: 'Essential WASH practices to prevent waterborne diseases',
    content: {
      sections: [
        {
          id: '1',
          title: 'Safe Water Practices',
          content: 'Access to safe water is fundamental for health.',
          type: 'text',
          keyPoints: [
            'Boil water for 1 minute if quality is unknown',
            'Store treated water in clean, covered containers',
            'Use clean cups to draw water',
            'Protect water sources from contamination'
          ]
        },
        {
          id: '2',
          title: 'Hand Hygiene',
          content: 'Proper handwashing prevents many diseases.',
          type: 'text',
          keyPoints: [
            'Wash hands with soap and water',
            'Critical times: before eating, after toilet use',
            'Rub hands for at least 20 seconds',
            'Use alcohol-based sanitizer if soap unavailable'
          ]
        }
      ],
      quiz: [
        {
          id: '1',
          question: 'How long should you boil water to make it safe?',
          options: ['30 seconds', '1 minute', '5 minutes', '10 minutes'],
          correctAnswer: 1,
          explanation: 'Boiling water for 1 minute kills most disease-causing organisms.'
        }
      ]
    },
    tags: ['WASH', 'water safety', 'hygiene', 'disease prevention'],
    targetAudience: 'Both'
  }
];

export const getUserProgress = (userId: string): UserProgress[] => {
  // Mock user progress data
  return [
    {
      moduleId: 'malaria-prevention',
      completed: true,
      score: 85,
      completedAt: '2024-01-10',
      timeSpent: 900
    },
    {
      moduleId: 'child-pneumonia',
      completed: false,
      timeSpent: 600
    }
  ];
};

export const searchEducationContent = (query: string): EducationModule[] => {
  const lowercaseQuery = query.toLowerCase();
  return educationModules.filter(module =>
    module.title.toLowerCase().includes(lowercaseQuery) ||
    module.description.toLowerCase().includes(lowercaseQuery) ||
    module.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
