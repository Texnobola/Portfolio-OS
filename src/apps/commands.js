export const commands = {
  help: () => `Available commands:
  help     - Show this help message
  about    - Learn about Sultonov O'razali
  skills   - View technical skills
  contact  - Get contact information
  github   - Open GitHub profile
  theme    - Change theme (matrix|light)
  clear    - Clear terminal`,

  about: () => `Sultonov O'razali
Senior Creative Frontend Engineer

Specializing in building "Awwwards-winning" interactive web experiences.
Passionate about creating immersive digital experiences that push the 
boundaries of what's possible on the web.`,

  skills: () => `Technical Skills:

React.js        [##########] 100%
JavaScript/TS   [#########.] 90%
Framer Motion   [#########.] 90%
Java            [########..] 80%
Minecraft Mods  [#######...] 70%
Node.js         [########..] 80%
Tailwind CSS    [##########] 100%`,

  contact: () => `Contact Information:

Website: sultonovweb.uz
Email: contact@sultonovweb.uz
Location: Uzbekistan

Feel free to reach out for collaborations!`,

  github: () => {
    window.open('https://github.com/sultonov', '_blank');
    return 'Opening GitHub profile...';
  },

  clear: () => null,
};
