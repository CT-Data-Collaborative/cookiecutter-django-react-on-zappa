FROM lambci/lambda:build-python3.6

MAINTAINER {{ cookiecutter.author_name }} <{{ cookiecutter.email }}>

WORKDIR /var/lambda/task

RUN pip uninstall -y jmespath
RUN python3 -m venv --system-site-packages /var/lambda/venv
# Requirements have to be pulled and installed here, otherwise caching won't work
COPY ./requirements /requirements
RUN . /var/lambda/venv/bin/activate; pip install zappa
RUN . /var/lambda/venv/bin/activate; pip install --no-cache-dir -r /requirements/production.txt; pip install --no-cache-dir -r /requirements/local.txt \
    && rm -rf /requirements

COPY ./compose/django/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./compose/django/start-dev.sh /start-dev.sh
RUN sed -i 's/\r//' /start-dev.sh
RUN chmod +x /start-dev.sh

# Fancy prompt to remind you are in zappashell
RUN echo 'export PS1="\[\e[36m\]zappashell>\[\e[m\] "' >> /root/.bashrc
RUN echo '. /var/lambda/venv/bin/activate' >> /root/.bashrc

# CMD ["bash"]
CMD ["/entrypoint.sh"]
