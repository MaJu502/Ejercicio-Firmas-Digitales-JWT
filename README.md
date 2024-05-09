# Ejercicio Firmas Digitales JWT

This project demonstrates a simple web application using Flask to handle JWT (JSON Web Tokens) for authentication.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Python](https://www.python.org/downloads/).
* You have a Windows/Linux/Mac machine capable of running Python 3.

## Installation

To install the necessary packages, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://your-repository-url-here
   cd Ejercicio-Firmas-Digitales-JWT
   ```

2. It's recommended to set up a virtual environment to keep dependencies required by different projects separate by running:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On MacOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

To run the application, use the following command from the root of your project directory:

```bash
flask run
```

This will start the Flask development server, typically accessible via `http://127.0.0.1:5000` in your web browser.

## Usage

Once the server is running, you can access the following endpoints:
- `/` to access the login page.
- `/register` to access the registration page.
- `/login` to access the login page.
- After registering or logging in, you will be directed to the protected page displaying secure data and JWT details.

Make sure to log in or register to view the protected content properly.

## License

This project is licensed under the [MIT License](LICENSE).

### Key Elements

- **Prerequisites**: Lists what is required to run the project.
- **Installation**: Detailed steps to set up the development environment.
- **Running the Application**: Instructions on how to start the server and what URL to visit.
- **Usage**: A brief guide on how to use the application.
- **License**: Mention of the project's license.