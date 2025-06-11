import { Question, Archetype } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    question: 'You open a PR titled "Fix typo in README." You…',
    options: [
      {
        id: 'a',
        text: '"Looks great, thanks!" and hit "Approve."',
        emoji: '🎉',
        archetype: 'rubber-stamp'
      },
      {
        id: 'b',
        text: '"Actually, per style guide it should be README.md—also check line 42."',
        emoji: '🔍',
        archetype: 'nitpicker'
      },
      {
        id: 'c',
        text: '"This is a great chance to talk about why README structure matters…"',
        emoji: '📚',
        archetype: 'professor'
      },
      {
        id: 'd',
        text: 'Skim, merge, and grab coffee before CI finishes.',
        emoji: '⏩',
        archetype: 'speedster'
      }
    ]
  },
  {
    id: 2,
    question: 'A teammate\'s 200-line PR lands. You…',
    options: [
      {
        id: 'a',
        text: '"LGTM" and 🚀 merge without reading.',
        emoji: '🏎️',
        archetype: 'speedster'
      },
      {
        id: 'b',
        text: 'Break it into chunks and discuss over a Slack huddle.',
        emoji: '☕',
        archetype: 'socializer'
      },
      {
        id: 'c',
        text: 'Write a mini-essay on each function\'s design and suggest renaming variables.',
        emoji: '✍️',
        archetype: 'professor'
      },
      {
        id: 'd',
        text: 'Circle back later—too much to handle now.',
        emoji: '🧐',
        archetype: 'nitpicker'
      }
    ]
  },
  {
    id: 3,
    question: 'You spot a missing semicolon in JS. You…',
    options: [
      {
        id: 'a',
        text: 'Fix it silently and merge.',
        emoji: '✏️',
        archetype: 'rubber-stamp'
      },
      {
        id: 'b',
        text: 'Comment "Semicolons matter!" with a link to style guide.',
        emoji: '📢',
        archetype: 'nitpicker'
      },
      {
        id: 'c',
        text: 'Propose adding an ESLint rule to catch this in CI.',
        emoji: '🛠️',
        archetype: 'professor'
      },
      {
        id: 'd',
        text: 'Ignore it—JS won\'t blow up without one.',
        emoji: '🤷‍♂️',
        archetype: 'speedster'
      }
    ]
  },
  {
    id: 4,
    question: 'CI fails on a lint error. You…',
    options: [
      {
        id: 'a',
        text: 'Merge anyway and pray it passes upstream.',
        emoji: '⚡',
        archetype: 'speedster'
      },
      {
        id: 'b',
        text: 'Leave a polite note: "Please fix lint before we can merge."',
        emoji: '📝',
        archetype: 'rubber-stamp'
      },
      {
        id: 'c',
        text: 'List every lint violation and ask for fixes.',
        emoji: '🔍',
        archetype: 'nitpicker'
      },
      {
        id: 'd',
        text: 'Kick off a thread about why linting rules are too strict.',
        emoji: '💬',
        archetype: 'socializer'
      }
    ]
  },
  {
    id: 5,
    question: 'The PR description is just "Fix bugs." You…',
    options: [
      {
        id: 'a',
        text: 'Ask the author to elaborate on what bugs and why.',
        emoji: '🤔',
        archetype: 'professor'
      },
      {
        id: 'b',
        text: 'Merge it—descriptions are overrated.',
        emoji: '📋',
        archetype: 'rubber-stamp'
      },
      {
        id: 'c',
        text: 'Demand "Steps to reproduce?" and "Screenshots?"',
        emoji: '🧐',
        archetype: 'nitpicker'
      },
      {
        id: 'd',
        text: 'Ping in Slack: "Hey team, what did this PR actually do?"',
        emoji: '💬',
        archetype: 'socializer'
      }
    ]
  },
  {
    id: 6,
    question: 'The author forgot to update tests. You…',
    options: [
      {
        id: 'a',
        text: '"Can you add tests for this?" and wait.',
        emoji: '🏷️',
        archetype: 'nitpicker'
      },
      {
        id: 'b',
        text: '"Tests aren\'t critical—merging now."',
        emoji: '✔️',
        archetype: 'rubber-stamp'
      },
      {
        id: 'c',
        text: '"Let me demo how to write a table-driven test here…"',
        emoji: '📚',
        archetype: 'professor'
      },
      {
        id: 'd',
        text: '"I\'ll add them myself after merging."',
        emoji: '🤝',
        archetype: 'socializer'
      }
    ]
  },
  {
    id: 7,
    question: 'It\'s Friday afternoon. A tiny PR arrives. You…',
    options: [
      {
        id: 'a',
        text: '"I\'ll circle back Monday—TGIF!"',
        emoji: '⏰',
        archetype: 'speedster'
      },
      {
        id: 'b',
        text: '"Sure, merging before the weekend."',
        emoji: '👍',
        archetype: 'rubber-stamp'
      },
      {
        id: 'c',
        text: '"Let\'s review now; don\'t want to back-burner anything."',
        emoji: '🔎',
        archetype: 'nitpicker'
      },
      {
        id: 'd',
        text: '"Let\'s all hop on a quick call and review together."',
        emoji: '🗣️',
        archetype: 'socializer'
      }
    ]
  }
];

export const archetypes: Record<string, Archetype> = {
  'nitpicker': {
    id: 'nitpicker',
    name: 'The Nitpicker',
    description: 'You catch every stray comma, notice misaligned spacing, and won\'t let a single typo slip through. Your attention to detail is legendary!',
    emoji: '🔍',
    illustration: '🔬',
    keyTraits: ['Super critical', 'Detail-obsessed', 'Quality guardian'],
    funFact: 'You\'ve probably saved your team from countless embarrassing production bugs!',
    shareMessage: 'I\'m The Nitpicker 🔍 - I catch every detail in code reviews! What\'s your PR reviewer personality?'
  },
  'rubber-stamp': {
    id: 'rubber-stamp',
    name: 'The Rubber Stamp',
    description: 'You trust your teammates and keep the development velocity flowing. A simple 👍 and you\'re ready to ship!',
    emoji: '👍',
    illustration: '✅',
    keyTraits: ['Easy-going', 'Fast approvals', 'Trusting'],
    funFact: 'Your teammates love you for keeping their PRs moving at lightning speed!',
    shareMessage: 'I\'m The Rubber Stamp 👍 - I keep code flowing fast! What\'s your PR reviewer personality?'
  },
  'professor': {
    id: 'professor',
    name: 'The Professor',
    description: 'Every PR is a teaching moment! You share knowledge, best practices, and turn code reviews into masterclasses.',
    emoji: '👨‍🏫',
    illustration: '📖',
    keyTraits: ['Educational', 'Thorough', 'Knowledge-sharing'],
    funFact: 'Junior developers seek out your reviews because they learn something new every time!',
    shareMessage: 'I\'m The Professor 👨‍🏫 - I turn code reviews into learning experiences! What\'s your PR reviewer personality?'
  },
  'speedster': {
    id: 'speedster',
    name: 'The Speedster',
    description: 'You review code faster than CI can run tests! Efficiency is your middle name and you keep the team moving.',
    emoji: '⚡',
    illustration: '🏎️',
    keyTraits: ['Lightning fast', 'Efficient', 'Impatient'],
    funFact: 'You\'ve probably reviewed and approved PRs before the author finished writing the description!',
    shareMessage: 'I\'m The Speedster ⚡ - I review code at lightning speed! What\'s your PR reviewer personality?'
  },
  'socializer': {
    id: 'socializer',
    name: 'The Socializer',
    description: 'PRs are social events! You turn code reviews into collaborative discussions and bring the whole team together.',
    emoji: '💬',
    illustration: '🎭',
    keyTraits: ['Collaborative', 'Chatty', 'Team-oriented'],
    funFact: 'Your PR comments often turn into the longest Slack threads in the channel!',
    shareMessage: 'I\'m The Socializer 💬 - I make code reviews a team sport! What\'s your PR reviewer personality?'
  }
};