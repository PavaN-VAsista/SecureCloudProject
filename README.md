# **Secure Cloud File Sharing with Blockchain-Based Audit Logs**

This project is a full-stack, proof-of-concept secure file-sharing platform designed to address the trust and security limitations inherent in centralized cloud storage models. It implements a novel hybrid architecture that combines the performance and efficiency of centralized file storage with the trust, transparency, and immutability of a blockchain-ready audit log.

## **✨ Core Features**

* **Secure User Authentication**: JWT-based registration and login system for secure, stateless user sessions.  
* **Role-Based Access Control (RBAC)**: Differentiated permissions for user and admin roles to control access to system features.  
* **Recipient-Only Authenticated Downloads**: An innovative security mechanism ensuring that only the intended recipient, after authenticating, can download a shared file. This renders intercepted or leaked links useless to unauthorized parties.  
* **Time-Limited & Revocable Shares**: Users can set expiration dates on shared links and instantly revoke access at any time.  
* **Blockchain-Ready Audit Log**: A comprehensive and persistent log of all critical system events (uploads, shares, successful downloads, denied access attempts, revocations) is recorded in a tamper-evident structure, designed for future migration to an immutable blockchain ledger.  
* **Client-Side File Integrity Verifier**: A UI tool allowing users to verify the integrity of a downloaded file against the original using SHA-256 hashing.

## **🛠️ Technology Stack**

The application is built on a modern MERN-based stack, chosen for performance, security, and rapid development capabilities.

| Layer | Technology | Purpose |
| :---- | :---- | :---- |
| **Frontend** | **React (with Vite)**, **Tailwind CSS** | A responsive, component-based Single-Page Application (SPA) for the UI. |
| **Backend** | **Node.js**, **Express.js** | A high-performance, non-blocking server for API requests and business logic. |
| **Database** | **MongoDB (with Mongoose)** | A flexible NoSQL database for storing user data, file metadata, and audit logs. |
| **Auth** | **JSON Web Tokens (JWT)**, **bcrypt.js** | Stateless authentication and secure password hashing. |
| **File I/O** | **Multer** | Middleware for handling multipart/form-data file uploads. |
| **Utilities** | **Axios**, **Crypto-JS**, **Nodemailer** | API communication, client-side cryptography, and email notifications. |

## **🚀 Getting Started**

Follow these instructions to get a local copy of the project up and running for development and testing.

### **Prerequisites**

* Node.js (v18.x or later)  
* npm (or yarn)  
* A running MongoDB instance (local or a cloud service like MongoDB Atlas)

### **Installation & Setup**

1. **Clone the repository:**  
   git clone \[https://github.com/PaVAnKuMaR-18o3/SecureCloudProject.git\](https://github.com/PaVAnKuMaR-18o3/SecureCloudProject.git)  
   cd SecureCloudProject

2. **Install Backend Dependencies:**  
   cd backend  
   npm install

3. **Install Frontend Dependencies:**  
   cd ../frontend  
   npm install

4. Configure Backend Environment Variables:  
   In the /backend directory, create a file named .env and add the following configuration. Replace the placeholder values with your actual data.  
   \# MongoDB Connection String  
   MONGO\_URI=your\_mongodb\_connection\_string

   \# JWT Secret Key (use a long, random string)  
   JWT\_SECRET=your\_super\_secret\_jwt\_key\_for\_signing\_tokens

   \# Port for the server to run on  
   PORT=5001

### **Running the Application**

1. Start the Backend Server:  
   From the /backend directory, run:  
   npm start

   The API server will start on http://localhost:5001.  
2. Start the Frontend Development Server:  
   From the /frontend directory, run:  
   npm run dev

   The React application will start. You can access it in your browser, usually at http://localhost:5173.
