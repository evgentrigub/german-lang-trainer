import { GermanText } from './types';

export const sampleTexts: GermanText[] = [
  {
    id: 'email-001',
    title: 'Einladung zur Geburtstagsfeier',
    textType: 'email',
    level: 'A2',
    content: `Liebe Anna,

ich lade dich herzlich zu meiner Geburtstagsfeier ein! 

Die Party findet am Samstag, den 15. April, um 18:00 Uhr statt. Wir feiern in meiner Wohnung in der Münchener Straße 42. Du kannst einfach mit der U-Bahn kommen - die Station "Stadtmitte" ist nur 5 Minuten von meiner Wohnung entfernt.

Ich habe schon viele Freunde eingeladen. Wir werden Musik hören, tanzen und natürlich auch leckeres Essen haben. Meine Mutter macht ihren berühmten Schokoladenkuchen!

Kannst du mir bis Donnerstag Bescheid geben, ob du kommen kannst? Ich muss wissen, wie viele Personen kommen, um genug Essen zu kaufen.

Ich freue mich sehr auf dich!

Viele Grüße
Sarah`,
    wordCount: 125,
    questions: [
      {
        id: 'email-001-q1',
        question: 'Wann findet die Geburtstagsfeier statt?',
        options: [
          'Am Freitag, den 15. April um 18:00 Uhr',
          'Am Samstag, den 15. April um 18:00 Uhr',
          'Am Sonntag, den 15. April um 19:00 Uhr',
          'Am Samstag, den 16. April um 18:00 Uhr'
        ],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Die Party findet am Samstag, den 15. April, um 18:00 Uhr statt."',
        type: 'multiple-choice'
      },
      {
        id: 'email-001-q2',
        question: 'Wie kann Anna zur Party kommen?',
        options: [
          'Mit dem Bus zur Station "Stadtmitte"',
          'Mit der U-Bahn zur Station "Stadtmitte"',
          'Mit dem Auto zur Münchener Straße',
          'Zu Fuß zur Münchener Straße'
        ],
        correctAnswer: 1,
        explanation: 'Sarah schreibt: "Du kannst einfach mit der U-Bahn kommen - die Station \'Stadtmitte\' ist nur 5 Minuten von meiner Wohnung entfernt."',
        type: 'multiple-choice'
      },
      {
        id: 'email-001-q3',
        question: 'Was macht Sarahs Mutter für die Party?',
        options: [
          'Sie kauft Getränke',
          'Sie macht Schokoladenkuchen',
          'Sie spielt Musik',
          'Sie dekoriert die Wohnung'
        ],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Meine Mutter macht ihren berühmten Schokoladenkuchen!"',
        type: 'multiple-choice'
      }
    ],
    createdAt: '2025-01-21'
  },
  {
    id: 'notice-001',
    title: 'Schwimmbad - Öffnungszeiten',
    textType: 'notice',
    level: 'A2',
    content: `STADTBAD MÜNCHEN
Schwimmen • Sauna • Fitness

ÖFFNUNGSZEITEN:
Montag - Freitag: 6:00 - 22:00 Uhr
Samstag - Sonntag: 8:00 - 20:00 Uhr

PREISE:
Erwachsene: 4,50 €
Kinder (bis 14 Jahre): 2,00 €
Studenten: 3,00 € (mit Ausweis)
Familienkarte (2 Erwachsene + 2 Kinder): 12,00 €

WICHTIGE INFORMATIONEN:
• Bitte bringen Sie ein Handtuch mit
• Schwimmbrille ist empfohlen
• Keine Glasflaschen im Schwimmbadbereich
• Parkplätze sind kostenlos

Bei Fragen rufen Sie uns an: 089-123456

Wir freuen uns auf Ihren Besuch!`,
    wordCount: 95,
    questions: [
      {
        id: 'notice-001-q1',
        question: 'Wie lange ist das Schwimmbad am Samstag geöffnet?',
        options: [
          'Von 6:00 bis 22:00 Uhr',
          'Von 8:00 bis 20:00 Uhr',
          'Von 8:00 bis 22:00 Uhr',
          'Von 6:00 bis 20:00 Uhr'
        ],
        correctAnswer: 1,
        explanation: 'Unter Öffnungszeiten steht: "Samstag - Sonntag: 8:00 - 20:00 Uhr"',
        type: 'multiple-choice'
      },
      {
        id: 'notice-001-q2',
        question: 'Wie viel kostet der Eintritt für einen Studenten?',
        options: [
          '2,00 €',
          '3,00 €',
          '4,50 €',
          '12,00 €'
        ],
        correctAnswer: 1,
        explanation: 'Bei den Preisen steht: "Studenten: 3,00 € (mit Ausweis)"',
        type: 'multiple-choice'
      },
      {
        id: 'notice-001-q3',
        question: 'Was sollen die Besucher mitbringen?',
        options: [
          'Schwimmbrille',
          'Handtuch',
          'Getränke',
          'Parkgeld'
        ],
        correctAnswer: 1,
        explanation: 'In den wichtigen Informationen steht: "Bitte bringen Sie ein Handtuch mit"',
        type: 'multiple-choice'
      }
    ],
    createdAt: '2025-01-21'
  },
  {
    id: 'article-001',
    title: 'Wetter in Deutschland',
    textType: 'article',
    level: 'A2',
    content: `Das Wetter in Deutschland ändert sich oft. Im Winter ist es kalt und manchmal schneit es. Die Temperatur liegt meist zwischen -5°C und 5°C. Viele Menschen tragen warme Jacken und Handschuhe.

Der Frühling beginnt im März. Die Tage werden länger und wärmer. Die Bäume bekommen neue Blätter und die Blumen blühen. Es regnet oft, aber das ist gut für die Natur.

Im Sommer kann es sehr warm werden. Die Temperaturen steigen manchmal auf 30°C oder mehr. Viele Deutsche fahren in den Urlaub oder gehen ins Schwimmbad. Abends sitzen sie gern im Biergarten.

Der Herbst ist oft sehr schön in Deutschland. Die Blätter an den Bäumen werden gelb, rot und braun. Es wird wieder kühler und es regnet mehr. Viele Menschen sammeln Pilze im Wald.

Das deutsche Wetter ist nicht immer perfekt, aber es ist sehr abwechslungsreich!`,
    wordCount: 165,
    questions: [
      {
        id: 'article-001-q1',
        question: 'Wie sind die Temperaturen im deutschen Winter?',
        options: [
          'Zwischen 5°C und 15°C',
          'Zwischen -5°C und 5°C',
          'Zwischen -10°C und 0°C',
          'Zwischen 0°C und 10°C'
        ],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Die Temperatur liegt meist zwischen -5°C und 5°C."',
        type: 'multiple-choice'
      },
      {
        id: 'article-001-q2',
        question: 'Was machen viele Deutsche im Sommer abends?',
        options: [
          'Sie fahren in den Urlaub',
          'Sie gehen ins Schwimmbad',
          'Sie sitzen im Biergarten',
          'Sie sammeln Pilze'
        ],
        correctAnswer: 2,
        explanation: 'Der Text sagt: "Abends sitzen sie gern im Biergarten."',
        type: 'multiple-choice'
      },
      {
        id: 'article-001-q3',
        question: 'Wie beschreibt der Text das deutsche Wetter?',
        options: [
          'Immer perfekt',
          'Sehr langweilig',
          'Sehr abwechslungsreich',
          'Zu kalt'
        ],
        correctAnswer: 2,
        explanation: 'Am Ende steht: "Das deutsche Wetter ist nicht immer perfekt, aber es ist sehr abwechslungsreich!"',
        type: 'multiple-choice'
      }
    ],
    createdAt: '2025-01-21'
  }
];

export const getTextById = (id: string): GermanText | undefined => {
  return sampleTexts.find(text => text.id === id);
};

export const getTextsByType = (type: GermanText['textType']): GermanText[] => {
  return sampleTexts.filter(text => text.textType === type);
}; 