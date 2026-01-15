# Django Portfolio Website

A modern, responsive portfolio website built with Django, featuring dynamic content management, dark/light mode, and real-time notifications.

## Features

-   **Dynamic Content**: Manage Home, About, Skills, Work, and Contact sections via the Django Admin.
-   **Dark/Light Mode**: Toggle between themes with a persistent user preference.
-   **Responsive Design**: Fully responsive layout using CSS Grid and Flexbox.
-   **AJAX Contact Form**: Submit messages without page reloads, with beautiful SweetAlert2 notifications.
-   **Telegram Integration**: Receive instant notifications on Telegram when someone submits the contact form.
-   **CV Download**: Upload your CV in the admin panel and let visitors download it directly from the header.
-   **Work Showcase**: Display your projects in professional cards with hover effects and links.

## Tech Stack

-   **Backend**: Django 5.2, Python 3.10+
-   **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
-   **Database**: SQLite (default)
-   **Libraries**:
    -   `requests` (for Telegram API)
    -   `python-dotenv` (for environment variables)
    -   `django-unfold` (for modern admin UI)
    -   SweetAlert2 (for alerts)
    -   Boxicons (for icons)
    -   ScrollReveal (for animations)

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd portfolio/src
    ```

2.  **Create a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables**:
    Create a `.env` file in the `src` directory and add:
    ```env
    SECRET_KEY=your_django_secret_key
    DEBUG=True
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    TELEGRAM_CHAT_ID=your_telegram_chat_id
    ```

5.  **Run migrations**:
    ```bash
    python manage.py migrate
    ```

6.  **Create a superuser**:
    ```bash
    python manage.py createsuperuser
    ```

7.  **Run the development server**:
    ```bash
    python manage.py runserver
    ```

8.  **Access the site**:
    -   Website: `http://127.0.0.1:8000/`
    -   Admin Panel: `http://127.0.0.1:8000/admin/`

## Usage

### Managing Content
Log in to the Django Admin panel to:
-   Update your **Home** section (Name, Title, Image, CV).
-   Add **Skills** with percentages and icons.
-   Add **Work** projects with images and URLs.
-   Update **About** and **Contact Info**.

### Telegram Notifications
To receive contact form submissions on Telegram:
1.  Create a bot via [BotFather](https://t.me/BotFather) and get the token.
2.  Get your Chat ID (you can use `@userinfobot`).
3.  Add them to your `.env` file.

## Deployment

Ready to deploy? Check out the [Deployment Guide](deploy_to_pythonanywhere.md) for instructions on deploying to PythonAnywhere.
