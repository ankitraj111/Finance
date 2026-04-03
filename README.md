# 📈 Finance Dashboard

A premium, interactive Finance Dashboard built with Next.js, React, and TypeScript. This application visualizes financial data, handles transactions, and features a clean, responsive glassmorphic UI.

## 🔗 Live Demo
[View Live Project](https://ankitraj111.github.io/Finance/)

## 🚀 Features

- **Dashboard Overview:** Quick summary cards displaying key financial metrics.
- **Data Visualization:** Interactive time-based balance trends and categorical spending breakdowns (powered by Recharts).
- **Transaction Management:** Complete list of transactions with searching, sorting, and category filtering capabilities.
- **Role-Based UI:** Switch between **Viewer** and **Admin** roles to test authorization functionality (e.g., adding transactions is restricted to admins).
- **Responsive Design:** A premium glassmorphic UI created with Tailwind CSS that works beautifully across all device sizes.
- **Static Export:** Fully runs on the client-side using Next.js static export for fast deployments like GitHub Pages.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & PostCSS
- **UI Components:** Radix UI (`shadcn-ui` layout and primitives)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Deployment:** GitHub Pages / GitHub Actions

## 💻 Running Locally

To run the project on your local machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankitraj111/Finance.git
   cd Finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture & Notes

- **State Management:** The app leverages built-in React hooks (`useState` and `useEffect`) via state lifting rather than relying on heavy external libraries. This keeps the bundle small and highly performant.
- **Data Source:** For presentation and testing purposes, the dashboard operates completely client-side using mocked dummy data. Adding transactions via the Admin UI uses immediate optimistic UI updates, but resets upon a hard page reload (as there is no database implemented).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
