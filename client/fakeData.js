export const job = {
  id: 1,
  shortCode: '8azgnmhT',
  company: {
    shortName: 'mercari',
    name: 'Mercari',
  },
  title: 'Software Engineering Intern',
  status: 'Interview selections complete',
  statusStage: 2,
  pay: 9001,
  squares: 774,
  description: `At Mercari, our mission is to create value in a global marketplace where anyone can buy & sell, and we pride ourselves in taking on a challenge. We are looking for new members to join us in achieving this goal under our values - Go Bold, All for One, and Be Professional.

株式会社メルカリでは「新たな価値を生みだす世界的なマーケットプレイスを創る」というミッションを掲げ、あらゆる挑戦をしています。「Go Bold - 大胆にやろう」「All for One - 全ては成功のために」「Be Professional - プロフェッショナルであれ」という3つのバリューのもと、ミッション達成を共に目指していける仲間を募集しています。`,
  discussion: [
    {
      author: {
        name: 'FuriousRaccoon',
        trusted: false,
      },
      timeString: '1h',
      text: 'Coding challenge out yet?',
      likes: 5,
      liked: false,
      replies: [
        {
          author: {
            name: 'HissingWalrus',
            trusted: true,
          },
          timeString: '56m',
          text:
            "Yeah. I've heard they happen on a rolling basis tho so keep that in mind.",
          likes: 5,
          liked: true,
        },
      ],
    },
    {
      author: {
        name: 'FeignedChameleon',
        trusted: false,
      },
      timeString: '3h',
      text: 'Anyone have experience interviewing here?',
      likes: 2,
      liked: false,
      replies: [],
    },
    {
      author: {
        name: 'VoraciousMaltese',
        trusted: false,
      },
      timeString: '5h',
      text: "I've interned here before if anyone has questions",
      likes: 3,
      liked: false,
      replies: [],
    },
  ],
};

export const trending = [
  job,
  {
    id: 2,
    shortCode: 'V3XI1QvR',
    company: {
      shortName: 'facebook',
      name: 'Facebook',
    },
    title: 'Software Engineering Intern',
    status: 'Interview selections complete',
    statusStage: 2,
    pay: 7500,
    squares: 675,
    discussion: [],
  },
  {
    id: 3,
    shortCode: 'kPYAIoy1',
    company: {
      shortName: 'google',
      name: 'Google',
    },
    title: 'Software Engineering Intern',
    status: 'Applications available',
    statusStage: 1,
    pay: 7500,
    squares: 840,
    discussion: [],
  },
  {
    id: 4,
    shortCode: 'g-4HuUAh',
    company: {
      shortName: 'cockroach',
      name: 'Cockroach Labs',
    },
    title: 'Backend Engineering Intern',
    status: 'Applications available',
    statusStage: 1,
    pay: 8000,
    squares: 323,
    discussion: [],
  },
  {
    id: 5,
    shortCode: '_NAqzKrA',
    company: {
      shortName: 'linkedin',
      name: 'LinkedIn',
    },
    title: 'Systems and Infrastructure Engineering Intern',
    status: 'Rankings out',
    statusStage: 3,
    pay: 7800,
    squares: 419,
    discussion: [],
  },
];
