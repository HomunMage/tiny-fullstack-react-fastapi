FROM python:3.12-slim

# Change the timezone to UTC+8
RUN ln -sf /usr/share/zoneinfo/Asia/Singapore /etc/localtime

# Install necessary packages
RUN apt update && apt install cron supervisor -y

# Set working directory
WORKDIR /app

# Copy files to the /app directory
COPY ./requirements.txt ./requirements.txt
COPY ./daily.sh ./daily.sh
COPY ./main.py ./main.py # Assuming this is your FastAPI app
RUN chmod +x /app/daily.sh

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy cron configuration
COPY crontab /mycron
RUN chmod 644 /mycron
RUN crontab /mycron

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Start Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]