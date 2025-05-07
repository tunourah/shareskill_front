![alt text](<Unlock Community Connections and Services.png>)

## 🚀 ShareSkill - Frontend

### 📝 Brief Description
This is the frontend for the Local Services Marketplace application. It allows users (Clients) to find and connect with local individuals or small businesses (Providers) offering various services. This part of the project handles the user interface and interaction.

### ℹ️ About This README
This README file provides an overview of the frontend application, including the technologies used, client-side routes, and installation instructions. Its purpose is to guide developers in setting up and understanding the frontend codebase.

### 🗺️ Planning Materials
Key planning aspects related to the frontend include:
*   User registration and login interface.
*   Service browsing and searching functionality for Clients.
*   Interface for Providers to create and manage service listings.
*   A basic service request and messaging interface.
*   User dashboard for managing services and requests.
 

### 💻 Technologies Used
*   **React**: A JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### 🛣️ Client-Side Routes (React)
| Path                     | Page/Component         | Purpose                                  |
| ------------------------ | ---------------------- | ---------------------------------------- |
| `/`                      | HomePage               | Landing page, search                     |
| `/login`                 | LoginPage              | User login                               |
| `/register`              | RegisterPage           | User registration                        |
| `/services`              | ServiceListPage        | Browse/search services                   |
| `/services/{id}`         | ServiceDetailPage      | View service details                     |
| `/services/new`          | ServiceCreatePage      | Create service listing (Provider)        |
| `/services/{id}/edit`    | ServiceEditPage        | Edit service listing (Provider)          |
| `/dashboard`             | DashboardPage          | User dashboard overview                  |
| `/dashboard/my-listings` | MyListingsPage         | Provider's listings                      |
| `/dashboard/requests-received` | RequestsReceivedPage | Provider's received requests             |
| `/dashboard/my-requests` | MyRequestsPage         | Client's sent requests                   |
| `*`                      | NotFoundPage           | Handles invalid URLs                     |

### ⚙️ Installation Instructions
To get the frontend development environment running:

1.  **Clone the repository:**
    ```bash
     https://github.com/tunourah/shareskill_front

    ```
 
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    # or
    # yarn start
    ```
    The application should now be running on `http://localhost:3000` (or another port if specified).

### 📜 Available Scripts
In the project directory, you can run:
*   `npm start` / `yarn start`: Runs the app in development mode.
*   `npm test` / `yarn test`: Launches the test runner in interactive watch mode.
*   `npm run build` / `yarn build`: Builds the app for production to the `build` folder.

### 📸 Screenshots/Demo
 
![alt text](<Screen Shot 1446-11-10 at 12.40.14 AM.png>)
![alt text](<Screen Shot 1446-11-10 at 12.40.23 AM.png>)
![alt text](<Screen Shot 1446-11-10 at 12.40.37 AM.png>)
![alt text](<Screen Shot 1446-11-10 at 12.41.01 AM.png>)
![alt text](<Screen Shot 1446-11-10 at 12.41.13 AM.png>)