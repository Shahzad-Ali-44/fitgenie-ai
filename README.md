# FitGenie AI Frontend - React Web Application

This is the frontend for **FitGenie AI**, a personalized fitness and diet recommendation web app. It provides a user-friendly interface to fill out the user's profile and receive AI-generated fitness and diet plans.

## Features

- **Landing Page**: Modern hero section, feature showcase, how it works, and user testimonials
- **Multi-Step Form**: 4-step process for collecting user information with real-time validation
- **Step Indicator**: Progress tracking with smooth transitions between form steps
- **Detailed Results**: 6 tabs showing diet plans, workout routines, meal suggestions, supplements, and progress tracking
- **PDF Download**: Professional PDF generation of complete fitness plan
- **Loading State**: Displays a loading spinner while waiting for the backend to generate recommendations.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn for managing dependencies

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shahzad-Ali-44/fitgenie-ai.git

   cd fitgenie-ai
   ```

2. **Install dependencies**:

   Install the required npm dependencies:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the client directory:
   ```env
   VITE_API_BASE_URL=your_backend_api_url
   ```

4. **Run the Development Server**:

   Start the React development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.


## License

This project is licensed under the [MIT License](LICENSE).

