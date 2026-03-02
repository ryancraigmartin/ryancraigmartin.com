/**
 * Skill to Icon mapping for technologies and tools
 */
const SKILL_ICONS: Record<string, SkillIcon> = {
  // Frontend
  'React': { name: 'React', iconType: 'devicon', iconClass: 'devicon-react-original colored', category: 'frontend' },
  'React v16.8+': { name: 'React v16.8+', iconType: 'devicon', iconClass: 'devicon-react-original colored', category: 'frontend' },
  'React v16.8+: \'The One With Hooks\'': { name: 'React v16.8+: \'The One With Hooks\'', iconType: 'devicon', iconClass: 'devicon-react-original colored', category: 'frontend' },
  'Gatsby': { name: 'Gatsby', iconType: 'devicon', iconClass: 'devicon-gatsby-plain colored', category: 'frontend' },
  'Angular': { name: 'Angular', iconType: 'devicon', iconClass: 'devicon-angularjs-plain colored', category: 'frontend' },
  'Next.js': { name: 'Next.js', iconType: 'devicon', iconClass: 'devicon-nextjs-plain', category: 'frontend' },

  // Backend
  'Node.js': { name: 'Node.js', iconType: 'devicon', iconClass: 'devicon-nodejs-plain colored', category: 'backend' },
  'Express.js': { name: 'Express.js', iconType: 'devicon', iconClass: 'devicon-express-original', category: 'backend' },
  'GraphQL': { name: 'GraphQL', iconType: 'devicon', iconClass: 'devicon-graphql-plain colored', category: 'backend' },
  'REST APIs': { name: 'REST APIs', iconType: 'fontawesome', iconClass: 'fas fa-exchange-alt', category: 'backend' },
  'GraphQL & REST APIs': { name: 'GraphQL & REST APIs', iconType: 'devicon', iconClass: 'devicon-graphql-plain colored', category: 'backend' },

  // Database
  'MongoDB': { name: 'MongoDB', iconType: 'devicon', iconClass: 'devicon-mongodb-plain colored', category: 'database' },
  'PostgreSQL': { name: 'PostgreSQL', iconType: 'devicon', iconClass: 'devicon-postgresql-plain colored', category: 'database' },

  // Testing
  'Jest': { name: 'Jest', iconType: 'devicon', iconClass: 'devicon-jest-plain colored', category: 'testing' },
  'Cypress': { name: 'Cypress', iconType: 'devicon', iconClass: 'devicon-cypressio-plain colored', category: 'testing' },
  'Mocha': { name: 'Mocha', iconType: 'devicon', iconClass: 'devicon-mocha-plain colored', category: 'testing' },
  'Chai': { name: 'Chai', iconType: 'fontawesome', iconClass: 'fas fa-mug-hot', category: 'testing' },
  'Mocha & Chai': { name: 'Mocha & Chai', iconType: 'devicon', iconClass: 'devicon-mocha-plain colored', category: 'testing' },
  'Cucumber': { name: 'Cucumber', iconType: 'devicon', iconClass: 'devicon-cucumber-plain colored', category: 'testing' },
  'Gherkin': { name: 'Gherkin', iconType: 'fontawesome', iconClass: 'fas fa-seedling', category: 'testing' },
  'Cucumber & Gherkin': { name: 'Cucumber & Gherkin', iconType: 'fontawesome', iconClass: 'fas fa-seedling', category: 'testing' },
  'Selenium': { name: 'Selenium', iconType: 'devicon', iconClass: 'devicon-selenium-original', category: 'testing' },
  'WebDriverIO': { name: 'WebDriverIO', iconType: 'fontawesome', iconClass: 'fas fa-robot', category: 'testing' },
  'Automated E2E & Integration Testing': { name: 'Automated E2E & Integration Testing', iconType: 'fontawesome', iconClass: 'fas fa-robot', category: 'testing' },

  // DevTools & Platforms
  'GitHub': { name: 'GitHub', iconType: 'devicon', iconClass: 'devicon-github-original', category: 'devtools' },
  'GitLab': { name: 'GitLab', iconType: 'devicon', iconClass: 'devicon-gitlab-plain colored', category: 'devtools' },
  'Github & Gitlab': { name: 'Github & Gitlab', iconType: 'fontawesome', iconClass: 'fab fa-github', category: 'devtools' },
  'JIRA': { name: 'JIRA', iconType: 'devicon', iconClass: 'devicon-jira-plain colored', category: 'devtools' },
  'Asana': { name: 'Asana', iconType: 'fontawesome', iconClass: 'fas fa-tasks', category: 'devtools' },
  'JIRA & Asana': { name: 'JIRA & Asana', iconType: 'fontawesome', iconClass: 'fas fa-tasks', category: 'devtools' },
  'Docker': { name: 'Docker', iconType: 'devicon', iconClass: 'devicon-docker-plain colored', category: 'devtools' },
  'Heroku': { name: 'Heroku', iconType: 'devicon', iconClass: 'devicon-heroku-plain colored', category: 'devtools' },
  'AWS': { name: 'AWS', iconType: 'devicon', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', category: 'devtools' },
  'CircleCI': { name: 'CircleCI', iconType: 'devicon', iconClass: 'devicon-circleci-plain colored', category: 'devtools' },
  'Git': { name: 'Git', iconType: 'devicon', iconClass: 'devicon-git-plain colored', category: 'devtools' },

  // CMS & Content
  'ContentStack': { name: 'ContentStack', iconType: 'fontawesome', iconClass: 'fas fa-layer-group', category: 'devtools' },
  'Cloudinary': { name: 'Cloudinary', iconType: 'fontawesome', iconClass: 'fas fa-cloud-upload-alt', category: 'devtools' },

  // Analytics & Marketing
  'Google Analytics': { name: 'Google Analytics', iconType: 'fontawesome', iconClass: 'fab fa-google', category: 'devtools' },
  'PostHog': { name: 'PostHog', iconType: 'fontawesome', iconClass: 'fas fa-chart-line', category: 'devtools' },
  'Klaviyo': { name: 'Klaviyo', iconType: 'fontawesome', iconClass: 'fas fa-envelope', category: 'devtools' },

  // Programming Languages
  'JavaScript': { name: 'JavaScript', iconType: 'devicon', iconClass: 'devicon-javascript-plain colored', category: 'devtools' },
  'TypeScript': { name: 'TypeScript', iconType: 'devicon', iconClass: 'devicon-typescript-plain colored', category: 'devtools' },
  'HTML5': { name: 'HTML5', iconType: 'devicon', iconClass: 'devicon-html5-plain colored', category: 'devtools' },
  'HTML': { name: 'HTML', iconType: 'devicon', iconClass: 'devicon-html5-plain colored', category: 'devtools' },
  'CSS3': { name: 'CSS3', iconType: 'devicon', iconClass: 'devicon-css3-plain colored', category: 'devtools' },
  'CSS': { name: 'CSS', iconType: 'devicon', iconClass: 'devicon-css3-plain colored', category: 'devtools' },
  'Go': { name: 'Go', iconType: 'devicon', iconClass: 'devicon-go-original-wordmark colored', category: 'devtools' },
  'Golang': { name: 'Golang', iconType: 'devicon', iconClass: 'devicon-go-original-wordmark colored', category: 'devtools' },
  'Python': { name: 'Python', iconType: 'devicon', iconClass: 'devicon-python-plain colored', category: 'devtools' },
};
