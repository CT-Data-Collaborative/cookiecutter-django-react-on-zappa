FROM lambci/lambda:build-python3.6

MAINTAINER {{ cookiecutter.author_name }} <{{ cookiecutter.email }}>
# MAINTAINER Sasha Cuerda <sasha.cuerda@gmail.com>

WORKDIR /task

RUN /var/lang/bin/python3 --m venv ve
# Requirements have to be pulled and installed here, otherwise caching won't work
COPY ./requirements /requirements
RUN . /ve/bin/activate; pip install --no-cache-dir -r /requirements/production.txt; pip install --no-cache-dir -r /requirements/local.txt \
    && rm -rf /requirements

# Fancy prompt to remind you are in zappashell
RUN echo 'export PS1="\[\e[36m\]zappashell>\[\e[m\] "' >> /root/.bashrc

CMD ["bash"]
