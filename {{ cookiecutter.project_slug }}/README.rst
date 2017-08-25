{{ cookiecutter.project_name }}

{{ cookiecutter.description }}

Getting Started
---------------

This project is under development. However, the following steps should yield a development environment that runs the initial application. There are some issues with deploying to Zappa that will hopefully be resolved soon.

1. First install required node packages via::

    $ npm install

2. Build the docker image for holding the Zappa-like environment::

    $ docker build -t zappa .

3. Build and start the dockerized postgres container::

    $ docker-compose -f local.yml up -d

4. To ease the process of launching a local dev server and accessing the docker environment to run zappa commands,
   adding the following aliases to your bash/zsh file is helpful::

     alias zappashell='docker run -ti -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY -e AWS_ACCESS_KEY_ID=$AWS_SECRET_KEY_ID -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION -v $(pwd):/var/lambda/task -v ~/.aws/:/root/.aws -p 9000:9000  --rm zappa bash'

     alias zappaserve='docker run -ti --network=edizappa_default -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY -e AWS_ACCESS_KEY_ID=$AWS_SECRET_KEY_ID -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION -v $(pwd):/var/lambda/task -v ~/.aws/:/root/.aws -p 8000:8000 --rm zappa /start-dev.sh'

5. From the project root directory, where manage.py is located, launch a local dev server in one terminal window::
    
   $ zappaserve

6. In a separate terminal window, run a bash shell from within the docker container via:: 

   $ zappashell

7. To deploy to AWS Lambda, shell into the docker container and run::

    $ zappa dev deploy


        
