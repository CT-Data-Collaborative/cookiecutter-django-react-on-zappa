#!/bin/bash
. /var/lambda/venv/bin/activate
python /var/lambda/task/manage.py migrate
python /var/lambda/task/manage.py runserver_plus 0.0.0.0:8000
