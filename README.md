# FitGenie AI Frontend - React Web Application

This is the frontend for **FitGenie AI**, a personalized fitness and diet recommendation web app. It provides a user-friendly interface to fill out the user's profile and receive AI-generated fitness and diet plans.

## Features

- **User Form**: Allows users to input their dietary preferences, fitness goals, health conditions, and more.
- **Loading State**: Displays a loading spinner while waiting for the backend to generate recommendations.
- **Personalized Recommendations**: Displays diet, workout plans, and additional tips based on user input.
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

3. **Run the Development Server**:

   Start the React development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

### Application Flow

1. **User Input**: The user fills out a form with information such as dietary preferences, fitness goals, and health conditions.
2. **Request**: When the user submits the form, the data is sent to the FastAPI backend at `https://fitgenie-ai-backend.vercel.app/recommendations`.
3. **Response**: The backend returns a personalized fitness and diet plan, which is displayed on the frontend.

### Frontend Components

- **Form**: Takes user input for all required fields.
- **Loader**: Displays a loading animation while the backend is processing the request.
- **Recommendations**: Displays personalized recommendations (diet, workout, breakfasts, dinners, tips).
  
### Example Form

| Field                         | Example Input                    |
|-------------------------------|-----------------------------------|
| Dietary Preferences            | Vegetarian                        |
| Fitness Goals                  | Weight loss                       |
| Lifestyle Factors              | Sedentary                         |
| Dietary Restrictions           | Gluten-free                       |
| Health Conditions              | Hypertension                      |
| Specific Concerns or Questions | Looking for a low-sodium diet     |

## License

This project is licensed under the [MIT License](LICENSE).

