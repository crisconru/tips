# TMUX

TODO

Es una herramienta para poder "partir" la terminal en varias.

## Instalación

```bash
# Ubuntu
sudo apt install tmux
# Mac
brew install tmux
```

## Funcionamiento

tmux funciona dentro de una terminal. Lo que se hace es invocar el programa y es como si nos creara una nueva terminal. Al hecho de abrir una terminal con tmux lo vamos a llamar "sesion". Las sesiones tienen un nombre, pero si no se especifica, se pone un número por defecto como nombre (1, 2, ...). Una vez abierta una sesión, aparecerá una barra abajo del todo, indicando donde estamos.

Para usar los comandos de tmux debemos pulsar el atajo de teclado `Ctrl + B` y después el comando. Ojo, no a la vez, primero `Ctrl + B` y luego el comando.

Por último podemos cerrar la sesión (eliminarla) o salir de ella (la sesion sigue activa).

Ahora vemos todo con más detalle.

## Abrir una sesión anónima

```bash
tmux
```

## Abrir nueva sesión con nombre

```bash
tmux new -s [session name]
```

## Salir de sesión

```bash
ctrl+b d
```

## Listar sesiones

```bash
tmux ls
```

## Entrar a una sesión

```bash
tmux a -t [name of session]
```

## Matar una sesión

```bash
tmux kill-session -t [name of session]
```

## Partir panel horizontalmente

```bash
# Horizontalmente
ctrl+b "
# Verticalmente
ctrl+b %
```

## Matar panel actual

```bash
ctrl+b x
```

## Cambiar de panel

```bash
ctrl+b [arrow key]
```

## Rotar paneles

```bash
ctrl+b o
```

## Cycle just between previous and current pane

```bash
ctrl+b ;
```

## Kill tmux server, along with all sessions

```bash
tmux kill-server
```