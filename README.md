# Complaint Management System

A modern, feature-rich complaint management system built with Angular 13. This demo application showcases best practices in Angular development with a beautiful, responsive UI.

![Angular](https://img.shields.io/badge/Angular-13-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-4.6-blue?style=flat-square&logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-Styles-pink?style=flat-square&logo=sass)

## Features

- **Authentication** - Login with email/password and OTP verification
- **Dashboard** - Overview with statistics, recent complaints, and quick stats
- **Complaint Management** - Full CRUD operations for complaints
- **Advanced Filtering** - Search, filter by status, category, and priority
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional interface with smooth animations
- **Form Validation** - Comprehensive form validation with error messages

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| Agent | agent@company.com | agent123 |
| User | demo@example.com | demo123 |

> **Note:** After entering credentials, an OTP will be displayed in the browser console for demo purposes.

## Screenshots

### Dashboard
The dashboard provides an at-a-glance view of all complaint statistics, recent complaints, and performance metrics.

### Complaint List
View all complaints with powerful filtering, sorting, and pagination capabilities.

### Complaint Details
Detailed view of each complaint with status management and activity timeline.

### New Complaint Form
Intuitive form with real-time validation for creating new complaints.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Angular CLI 13.x

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd complaint-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/           # Dashboard component
│   │   ├── complaint-list/      # Complaints list with filtering
│   │   ├── complaint-form/      # Create/Edit complaint form
│   │   ├── complaint-details/   # Complaint detail view
│   │   └── shared/              # Shared components
│   │       ├── header/          # Top navigation header
│   │       ├── sidebar/         # Side navigation
│   │       ├── stat-card/       # Statistics card
│   │       └── status-badge/    # Status/Priority badges
│   ├── models/
│   │   └── complaint.model.ts   # TypeScript interfaces
│   ├── services/
│   │   └── complaint.service.ts # Data service with mock data
│   ├── app-routing.module.ts    # Route configuration
│   ├── app.module.ts            # Main app module
│   └── app.component.*          # Root component
├── environments/                # Environment configs
├── styles.scss                  # Global styles
└── index.html                   # HTML entry point
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at localhost:4200 |
| `npm run build` | Build for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests |

## Complaint Categories

- **Product Issue** - Problems with purchased products
- **Service Quality** - Issues with customer service
- **Billing Problem** - Billing and payment issues
- **Delivery Issue** - Shipping and delivery problems
- **Technical Support** - Technical issues and bugs
- **Other** - Miscellaneous complaints

## Priority Levels

| Priority | Color | Description |
|----------|-------|-------------|
| Low | Green | Minor issues, no urgency |
| Medium | Yellow | Normal priority |
| High | Orange | Important, needs attention |
| Urgent | Red | Critical, immediate action required |

## Status Workflow

```
Open → In Progress → Pending → Resolved → Closed
```

## Technologies Used

- **Angular 13** - Frontend framework
- **TypeScript 4.6** - Type-safe JavaScript
- **SCSS** - CSS preprocessor for styling
- **RxJS 7.5** - Reactive programming
- **Angular Router** - Client-side routing
- **Angular Forms** - Reactive forms with validation

## Design Features

- **Modern UI** - Clean and professional design
- **Gradient Accents** - Subtle gradients for visual appeal
- **Responsive Layout** - Mobile-first approach
- **Smooth Animations** - CSS transitions and animations
- **Material Icons** - Google Material Design icons
- **Inter Font** - Modern, readable typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Angular](https://angular.io/) - The web framework used
- [Google Fonts](https://fonts.google.com/) - Inter font family
- [Material Icons](https://fonts.google.com/icons) - Icon set

---

Built with ❤️ using Angular 13
