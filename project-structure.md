foh-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth-required route group
│   │   ├── (public)/          # Public route group
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── features/              # Domain-specific features
│   │   ├── auth/             
│   │   ├── customer/
│   │   ├── employee/
│   │   └── admin/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   └── forms/            # Form components
│   ├── lib/
│   │   ├── firebase/        # Firebase config & utilities
│   │   ├── validation/      # Input validation schemas
│   │   └── utils/           # General utilities
│   └── types/               # TypeScript type definitions