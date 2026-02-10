export const fileSystem = {
  '/': {
    name: 'Home',
    type: 'folder',
    children: {
      'Desktop': {
        type: 'folder',
        children: {},
      },
      'Documents': {
        type: 'folder',
        children: {
          'About Me.txt': {
            type: 'text',
            content: `Men O'razali, frontend dasturchiman. Asosan tushunarli, tez va barqaror veb interfeyslar yaratish bilan shug'ullanaman.

Ishimda mantiq, tuzilma va foydalanishga qulaylik muhim. Keraksiz murakkabliksiz, toza va oson qo'llab-quvvatlanadigan kod yozishga harakat qilaman. Loyihani avval tushunib, keyin bosqichma-bosqich qurishni afzal ko'raman.

Ko'pincha mustaqil ishlayman, mavjud loyihalarni yaxshilash yoki noldan yangi interfeyslar yaratish tajribam bor.

Texnologiyalar: JavaScript, HTML, CSS, React, Tailwind CSS, Vite, asosiy Node.js.

━━━━━━━━━━━━━━━━━━━━

I'm O'razali, a frontend developer focused on building clear, fast, and maintainable web interfaces.

I care about structure, logic, and usability. I prefer simple and practical solutions over unnecessary complexity, and I aim to write code that's easy to understand and maintain.

I often work independently, either improving existing projects or building interfaces from scratch.

Tech stack: JavaScript, HTML, CSS, React, Vite, Tailwind CSS, basic Node.js.

━━━━━━━━━━━━━━━━━━━━

Меня зовут Оразали, я frontend-разработчик. Занимаюсь созданием понятных, быстрых и стабильных веб-интерфейсов.

В работе делаю упор на логику, структуру и удобство использования. Предпочитаю простые и практичные решения без лишней сложности. Стараюсь писать код, который легко читать и поддерживать.

Часто работаю самостоятельно: улучшаю существующие проекты или разрабатываю интерфейсы с нуля.

Технологии: JavaScript, HTML, CSS, React, Vite, Tailwind CSS, базовый Node.js.`,
          },
          'Resume.pdf': {
            type: 'pdf',
            url: 'https://example.com/resume.pdf',
          },
          'Contact.vcf': {
            type: 'contact',
            content: [
              { label: 'Name', value: "Sultonov O'razali", type: 'text' },
              { label: 'Email', value: 'texnobola@gmail.com', type: 'email' },
              { label: 'Website', value: 'sultonovweb.uz', type: 'url' },
              { label: 'Phone', value: '+998880890793', type: 'tel' },
              { label: 'Telegram', value: '@dev_sultonov', type: 'telegram' },
            ],
          },
        },
      },
      'Projects': {
        type: 'folder',
        children: {
          'Fikr Platform.txt': {
            type: 'text',
            content: `Fikr - Idea-Sharing Platform
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fikr is a modern idea-sharing platform built to turn thoughts into impact.
It gives people a space to express opinions, share insights, and spark meaningful discussions — all in a structured, fair, and community-driven environment.

Unlike traditional social platforms that reward noise, Fikr rewards value.
Ideas are moderated, verified, and highlighted based on quality, relevance, and contribution — not popularity alone.

What makes Fikr different?

• Idea-first design
  Content is centered around ideas, not personal fame or followers.

• Smart moderation & governance
  Community rules, admin oversight, and verification systems keep discussions healthy and constructive.

• Recognition & rewards
  High-quality contributors can earn reputation, visibility, and platform rewards.

• Open yet controlled
  Freedom of expression with responsibility — no chaos, no censorship abuse.

• Cross-platform vision
  Designed for web and mobile, with future-ready architecture.

Our vision

We believe ideas shape the future — but only when they're heard, challenged, and refined.
Fikr exists to become a digital public square where intelligence, creativity, and respectful debate thrive.

Our mission

To build a platform where:
• Every voice has value
• Quality beats quantity
• Discussion leads to growth, not division

Think. Share. Shape the future — with Fikr.`,
          },
          'Portfolio OS.txt': {
            type: 'text',
            content: `Portfolio OS
━━━━━━━━━━━━━━━━━━━━

A fully functional Operating System simulation built with React.

Tech Stack:
- React + Vite
- Framer Motion
- Tailwind CSS
- Custom Window Management

Features:
- Draggable/Resizable Windows
- Terminal with Commands
- Browser Simulation
- File Explorer
- Snake Game`,
          },
          'E-Commerce Platform.txt': {
            type: 'text',
            content: `E-Commerce Platform
━━━━━━━━━━━━━━━━━━━━

Full-stack e-commerce solution with modern features.

Tech Stack:
- React + Node.js
- MongoDB
- Stripe Integration
- Real-time Updates`,
          },
        },
      },
      'Downloads': {
        type: 'folder',
        children: {},
      },
      'Trash': {
        type: 'folder',
        children: {},
      },
    },
  },
};
