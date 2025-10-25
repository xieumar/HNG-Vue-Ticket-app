# Ticket Management App

A simple yet comprehensive ticket management application built with Vue.js 3, Vite, and Tailwind CSS. This application allows users to manage customer support tickets, track their status, and view analytics through a dashboard.

## Features

-   **User Authentication:** Secure login and signup with local storage for session management.
    -   New users can sign up.
    -   Existing users can log in.
    -   Protected routes for authenticated users (Tickets, Dashboard).
    -   Dedicated logout page with confirmation.
-   **Ticket Management (CRUD):**
    -   Create new tickets with title, description, and initial status.
    -   View a list of all tickets.
    -   Update existing tickets (title, description, status).
    -   Delete tickets with confirmation.
    -   View detailed information for each ticket.
-   **Dashboard & Analytics:**
    -   Summary cards for Total, Open, In Progress, and Closed tickets.
    -   Clustered bar chart showing Open vs. In Progress tickets over time.
    -   Doughnut chart illustrating ticket status distribution (Open, In Progress, Closed).
-   **Responsive Design:** Built with Tailwind CSS for a mobile-first approach.
-   **Global Notifications:** Toast messages for success/error feedback on user actions.
-   **Custom Confirmation Modal:** Enhanced user experience for critical actions like deletion.
-   **Animated Backgrounds:** Subtle decorative circles in the hero section for visual appeal.

## Technologies Used

-   **Vue.js 3:** Progressive JavaScript framework for building user interfaces.
-   **Vite:** Next-generation frontend tooling for fast development.
-   **Vue Router 4:** Official routing library for Vue.js.
-   **Tailwind CSS v4 (Alpha):** A utility-first CSS framework for rapidly building custom designs.
-   **Chart.js with Vue Chart.js:** Flexible JavaScript charting for designers & developers.
-   **Local Storage:** For client-side user authentication and session persistence.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have Node.js (LTS version recommended) and npm installed.

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ticket-management-app
    ```
    *(Note: Replace `<repository-url>` with the actual URL of your repository if applicable.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

### Production Build

To build the application for production:

```bash
npm run build
```

This will compile and optimize your application into the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
.  
├── public/
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── auth.js
│   ├── components/
│   │   ├── ConfirmationModal.vue
│   │   ├── Dashboard.vue
│   │   ├── DecorativeCircles.vue
│   │   ├── Footer.vue
│   │   ├── LandingPage.vue
│   │   ├── Login.vue
│   │   ├── Logout.vue
│   │   ├── Navbar.vue
│   │   ├── Signup.vue
│   │   ├── TicketDetails.vue
│   │   ├── TicketForm.vue
│   │   └── TicketItem.vue
│   ├── router/
│   │   └── index.js
│   ├── useFormValidation.js
│   ├── useToast.js
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Authentication Details

User authentication is handled via `localStorage`.

-   **Signup:** New users create an account, and their credentials (name, email, password) are stored in `localStorage` under the `users` key. The newly signed-up user is automatically logged in.
-   **Login:** Users provide email and password, which are validated against the stored `users` in `localStorage`. Upon successful login, the user's data is stored in `localStorage` under `ticketapp_session`.
-   **Logout:** The logout process now simply clears the `ticketapp_session` from `localStorage`, and the user is redirected to the landing page.
-   **Protected Routes:** Routes like `/tickets` and `/dashboard` are protected. Unauthenticated users attempting to access them will be redirected to the login page (`/auth/login`).

## Accessibility Notes

-   Semantic HTML5 elements are used for better structure and accessibility.
-   Interactive elements (buttons, links) have clear focus states.
-   Color contrast ratios are generally maintained for readability, especially for text against backgrounds.
-   `alt` attributes are used for images where appropriate.

## Example Test User Credentials

To test the authentication flow, you can sign up with any email and password. The application uses `localStorage` to store user credentials, so any registered user can log in.

-   **Example Email:** `test@example.com`
-   **Example Password:** `password123`

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
