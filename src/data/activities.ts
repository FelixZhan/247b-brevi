import type { NeedCategory } from '../lib/database.types'

export interface Activity {
  title: string
  instruction: string
  duration: number
}

export const activities: Record<NeedCategory, Activity[]> = {
  calm: [
    {
      title: 'Box Breathing',
      instruction: 'Breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat 3 times.',
      duration: 60
    },
    {
      title: 'Body Scan',
      instruction: 'Close your eyes. Notice tension from head to toes. Let each area soften.',
      duration: 45
    },
    {
      title: 'Grounding',
      instruction: 'Name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.',
      duration: 60
    },
    {
      title: 'Slow Exhale',
      instruction: 'Inhale naturally, then exhale slowly for 6-8 counts. Repeat 5 times.',
      duration: 45
    }
  ],
  energy: [
    {
      title: 'Power Stretch',
      instruction: 'Stand tall, reach arms overhead, stretch side to side. Wake up your body.',
      duration: 45
    },
    {
      title: 'Quick Walk',
      instruction: 'Walk briskly around your space. Swing your arms. Feel your energy rise.',
      duration: 60
    },
    {
      title: 'Desk Push-ups',
      instruction: 'Place hands on desk edge, do 10 push-ups. Get your blood flowing.',
      duration: 45
    },
    {
      title: 'Energizing Breath',
      instruction: 'Take 10 quick, sharp breaths through your nose. Feel alert and awake.',
      duration: 30
    }
  ],
  reset_attention: [
    {
      title: 'Window Gaze',
      instruction: 'Look out a window or at something distant. Let your eyes and mind rest.',
      duration: 45
    },
    {
      title: 'Mental Reset',
      instruction: 'Close your eyes. Count backwards from 20. Let thoughts pass like clouds.',
      duration: 40
    },
    {
      title: 'Intention Set',
      instruction: 'Take 3 breaths. Ask: What matters most right now? Return with clarity.',
      duration: 45
    },
    {
      title: 'Eye Rest',
      instruction: 'Close your eyes, cup your palms over them. Rest in the darkness.',
      duration: 60
    }
  ],
  body: [
    {
      title: 'Neck Rolls',
      instruction: 'Slowly roll your head in circles, 5 each direction. Release tension.',
      duration: 40
    },
    {
      title: 'Shoulder Shrugs',
      instruction: 'Lift shoulders to ears, hold 5 seconds, release. Repeat 5 times.',
      duration: 35
    },
    {
      title: 'Wrist Circles',
      instruction: 'Rotate wrists in circles, flex and extend fingers. Care for your hands.',
      duration: 30
    },
    {
      title: 'Standing Stretch',
      instruction: 'Stand up, reach overhead, then touch your toes. Lengthen your spine.',
      duration: 45
    }
  ]
}

export function getRandomActivity(category: NeedCategory): Activity {
  const categoryActivities = activities[category]
  return categoryActivities[Math.floor(Math.random() * categoryActivities.length)]
}
