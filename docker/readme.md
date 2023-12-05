# Docker 

Docker is an open platform for developing, shipping, and running applications.
Docker enables you to separate your applications from your infrastructure so
you can deliver software quickly. With Docker, you can manage your
infrastructure in the same ways you manage your applications.

## The Docker platform

Docker provides the ability to package and run an application in a loosely
isolated environment called a container. The isolation and security lets you
run many containers simultaneously on a given host. Containers are lightweight
and contain everything needed to run the application, so you don't need to rely
on what's installed on the host. You can share containers while you work, and
be sure that everyone you share with gets the same container that works in the
same way.

## Docker architecture

Docker uses a client-server architecture. The Docker client talks to the Docker
daemon, which does the heavy lifting of building, running, and distributing
your Docker containers. The Docker client and daemon can run on the same
system, or you can connect a Docker client to a remote Docker daemon. The
Docker client and daemon communicate using a REST API, over UNIX sockets or a
network interface. Another Docker client is Docker Compose, that lets you work
with applications consisting of a set of containers.

### The Docker daemon

The Docker daemon (`dockerd`) listens for Docker API requests and manages Docker
objects such as images, containers, networks, and volumes. A daemon can also
communicate with other daemons to manage Docker services.

### The Docker client

The Docker client (`docker`) is the primary way that many Docker users interact
with Docker. When you use commands such as `docker run`, the client sends these
commands to `dockerd`, which carries them out. The `docker` command uses the
Docker API. The Docker client can communicate with more than one daemon.

### Docker Desktop

Docker Desktop is an easy-to-install application for your Mac, Windows or Linux
environment that enables you to build and share containerized applications and
microservices.

### Docker registries

A Docker registry stores Docker images. Docker Hub is a public registry that
anyone can use, and Docker looks for images on Docker Hub by default. 

### Docker objects

When you use Docker, you are creating and using images, containers, networks,
volumes, plugins, and other objects. 

- Images

An image is a read-only template with instructions for creating a Docker
container. Often, an image is based on another image, with some additional
customization. You might create your own images or you might only use those
created by others and published in a registry. To build your own image, you
create a Dockerfile with a simple syntax for defining the steps needed to
create the image and run it.

A running container uses an isolated filesystem. This isolated filesystem is
provided by an image, and the image must contain everything needed to run an
application - all dependencies, configurations, scripts, binaries, etc. The
image also contains other configurations for the container, such as environment
variables, a default command to run, and other metadata.

- Containers

A container is a runnable instance of an image. You can create, start, stop,
move, or delete a container using the Docker API or CLI. You can connect a
container to one or more networks, attach storage to it, or even create a new
image based on its current state.

A container is a sandboxed process running on a host machine that is isolated
from all other processes running on that host machine.

To summarize, a container:

- Is a runnable instance of an image. You can create, start, stop, move, or
delete a container using the Docker API or CLI.
- Can be run on local machines, virtual machines, or deployed to the cloud.
- Is portable (and can be run on any OS).
- Is isolated from other containers and runs its own software, binaries,
configurations, etc.

## The underlying technology

Docker is written in the Go programming language and takes advantage of several
features of the Linux kernel to deliver its functionality. Docker uses a
technology called namespaces to provide the isolated workspace called the
container. When you run a container, Docker creates a set of namespaces for
that container. These namespaces provide a layer of isolation. Each aspect of a
container runs in a separate namespace and its access is limited to that
namespace.

## Containerize an application

### Build the app's image

To build the image, you'll need to use a Dockerfile. A Dockerfile is simply a
text-based file with no file extension that contains a script of instructions.
Docker uses this script to build a container image.

1. Create an empty file named `Dockerfile`:

```bash
touch Dockerfile
```

2. Using a text editor or code editor, add the following contents to the
Dockerfile:

```docker
# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

3. Build the image using the following commands:

```bash
docker build -t getting-started .
```

The `CMD` directive specifies the default command to run when starting
a container from this image.

### Start an app container

Now that you have an image, you can run the application in a container using
the `docker run` command.

1. Run your container using the `docker run` command and specify the name of the
image you just created:

```bash
docker run -dp 127.0.0.1:3000:3000 getting-started
```

- The `-d` flag (short for `--detach`) runs the container in the background.
- The `-p` flag (short for `--publish`) creates a port mapping between the host
and the container. The `-p` flag takes a string value in the format of
`HOST:CONTAINER`, where `HOST` is the address on the host, and `CONTAINER` is
the port on the container. The command publishes the container's port 3000 to
`127.0.0.1:3000` (`localhost:3000`) on the host. Without the port mapping, you
wouldn't be able to access the application from the host.

2. After a few seconds, open your web browser to http://localhost:3000. You
should see your app.

### Remove the old container

To remove a container, you first need to stop it. Once it has stopped, you can
remove it. 

1. Get the ID of the container by using the `docker ps` command

```bash
docker ps
```

2. Use the `docker stop` command to stop the container. Replace <the-container-id>
with the ID from `docker ps`

```bash
docker stop <the-container-id>
```

3. Once the container has stopped, you can remove it by using the `docker rm`
command

```bash
docker rm <the-container-id>
```

4. You can stop and remove a container in a single command by adding the `force`
flag to the `docker rm` command

```bash
docker rm -f <the-container-id>
```

### Share the application

Now that you've built an image, you can share it. To share Docker images, you
have to use a Docker registry. The default registry is Docker Hub and is where
all of the images you've used have come from.

1. Create a repository

To push an image, you first need to create a repository on Docker Hub.

2. Push the image

```bash
docker push YOUR-USER-NAME/getting-started
```

## Container volumes

Volumes provide the ability to connect specific filesystem paths of the
container back to the host machine. If you mount a directory in the container,
changes in that directory are also seen on the host machine. If you mount that
same directory across container restarts, you'd see the same files.

There are two main types of volumes:

- Volume mount

    A volume mount is a great choice when you need somewhere persistent to
    store your application data.

- Bind mount

    A bind mount is another type of mount, which lets you share a directory
    from the host's filesystem into the container. When working on an
    application, you can use a bind mount to mount source code into the
    container. The container sees the changes you make to the code immediately,
    as soon as you save a file. This means that you can run processes in the
    container that watch for filesystem changes and respond to them.

## Docker Compose

Docker Compose is a tool that helps you define and share multi-container
applications. With Compose, you can create a YAML file to define the services
and with a single command, you can spin everything up or tear it all down.

The big advantage of using Compose is you can define your application stack in
a file, keep it at the root of your project repository (it's now version
controlled), and easily enable someone else to contribute to your project.
Someone would only need to clone your repository and start the app using
Compose.

## Image-building best practices

### Image layering

Using the `docker image history` command, you can see the command that was used
to create each layer within an image. Each of the lines represents a layer in
the image. The display here shows the base at the bottom with the newest layer
at the top. Using this, you can also quickly see the size of each layer,
helping diagnose large images.

### Layer caching

Once a layer changes, all downstream layers have to be recreated as well.

### Multi-stage builds

Multi-stage builds are an incredibly powerful tool to help use multiple stages
to create an image. There are several advantages for them:

- Separate build-time dependencies from runtime dependencies
- Reduce overall image size by shipping only what your app needs to run

## Sources

- [Docker For Frontend Developers](https://morioh.com/a/3b116a89f0bf/docker-for-frontend-developers)
- [Docker for Frontend Developers](https://www.grusingh.com/post/docker-for-frontend-developers/)
- [Frontend Development with Docker: A simplified guide](https://javascript.plainenglish.io/frontend-development-with-docker-a-simplified-guide-c869f6ee0fe8)
- [Docker for frontend developers](https://blog.logrocket.com/docker-for-front-end-developers/)
- [15+ Best Docker Tutorials For Beginners — Learn Docker Online](https://tutorials.botsfloor.com/top-tutorials-to-learn-docker-to-run-distributed-applications-bce896e260ec)
- [15 Best Docker Tutorials & Courses - Learn Docker Online](https://coursesity.com/blog/best-docker-tutorials/?utm_source=botsfloor&utm_medium=referral&utm_campaign=mediumPost&utm_term=learn-docker)