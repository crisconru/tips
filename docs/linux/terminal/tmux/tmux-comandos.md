# TMUX

La mayoría de la información está sacada de esta web -> [referencia](https://hackernoon.com/a-gentle-introduction-to-tmux-8d784c404340)

tmux es una herramienta para poder "partir" la terminal en varias.

## Instalación

```bash
# Ubuntu
sudo apt install tmux
# Mac
brew install tmux
```

## Funcionamiento

tmux funciona dentro de una terminal. Lo que se hace es invocar el programa y es como si nos creara una nueva terminal. Al hecho de abrir una terminal con tmux lo vamos a llamar "sesion". Las sesiones tienen un nombre, pero si no se especifica, se pone un número por defecto como nombre (1, 2, ...). Una vez abierta una sesión, aparecerá una barra abajo del todo, indicando donde estamos.

Para usar los comandos de tmux debemos pulsar el atajo de teclado `Ctrl+b` y después el comando. Ojo, no a la vez, primero `Ctrl+b` y luego el comando.

Por último podemos cerrar la sesión (eliminarla) o salir de ella (la sesion sigue activa).

Ahora vemos todo con más detalle.

## Abrir una sesión anónima

```bash
tmux
```

## Abrir nueva sesión con nombre

```bash
tmux new -s <nombre-sesion>
```

## Salir de sesión (pero dejandola activa)

Salir de una sesión, pero dejándola activa, se llama `detach`

```bash
# Salir de sesion o detach
Ctrl+b d
```

## Listar sesiones

```bash
tmux ls
```

## Entrar a una sesión

Entrar a una sesión activa se llama `attatch`

```bash
tmux a -t <nombre-sesion>
```

## Matar una sesión

```bash
tmux kill-session -t <nombre-sesion>
```

## Dividir panel verticalmente / horizontalmente

```bash
# Vertical
Ctrl+b %
# Horizontal
Ctrl+b "
```

## Redimensionar paneles

```bash
Ctrl+b :
resize-pane -<dirección> <número-de-lineas>
```

1. Invocar el comando `Ctrl+b :` para que abra el prompt de tmux.
2. Luego ponemos el comando `resize-pane -<dirección> <número-de-lineas>`
      * Con `<dirección>` indicamos hacia donde crece
          * <dirección> = U (up) | D (down) | L (left) | R (derecha)
      * Con `<numero-de-lineas>` le decimos la cantidad de lineas que tiene que desplazarse.

Ejemplo -> Que el panel crezca dos lineas hacia abajo

```bash
Ctrl+b :
resize-panel -D 2
```

## Matar panel actual

```bash
Ctrl+b x
```

## Cambiar de panel

```bash
Ctrl+b <tecla-direccion>
```

## Cambiar de panel cíclicamente

```bash
Ctrl+b o
```

## Cambiar de panel solo entre el actual y el anterior

```bash
Ctrl+b ;
```

## Matar servidor tmux con todas sus sesiones

```bash
tmux kill-server
```
