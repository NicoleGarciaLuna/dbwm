# DBWM (Database Web Microempresarias)

This project is a web application for managing a database of microentrepreneurs, built with Next.js.

## Features

- User authentication
- Microentrepreneur profile management
- Data visualization and reporting
- Responsive design for desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm 6.x or later

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/dbwm.git
   cd dbwm
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js app router pages and layouts
- `components/`: Reusable React components
- `utils/`: Utility functions and helpers
- `data/`: Static data and mock data for development
- `types/`: TypeScript type definitions
- `public/`: Static assets

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
