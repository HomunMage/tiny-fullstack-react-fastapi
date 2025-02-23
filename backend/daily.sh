#!/bin/bash

echo "daily run this by cron"
# for new date.log
supervisorctl restart fastapi
