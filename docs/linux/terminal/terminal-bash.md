# Bash Scripting

Los scripts de bash sirven sobre todo para automatización.

## Ficheros Bash

Suelen acabar con la extensión `.sh`, aunque no es obligatorio. Lo que si es obligatorio es que empiecen con el shebang (comando que empieza por `#` en la primera linea del fichero) que indica como hay que ejecutar el fichero.

```bash
#!/bin/bash
```

En entornos viejos probablemente haya que poner

```bash
#!/bin/sh
```

### Ejecución

Se pueden ejecutar desde la shell haciendo:

1. `./<fichero>`
2. `sh <fichero>`
3. `bash <fichero>`
4. Situándolo dentro de uno de los directorios especiales `/usr/local/bin` o `/usr/bin`

Deberían de tener permisos de lectura como de ejecución. 

## Variables

Las variables serían `<variable>=<valor>`, sin espacios en el igual. Existen diferentes tipos:

* String:
    * El valor va entre comillas dobles `nombre="Paco Pepe"`.
* Numérica:
    * Sin comillas y en un solo bloque `numero=1977`.
* Array (lista):
    * Valores entre paréntesis y separados por un espacio `lista=(Paco Pepe Hernandez)`.
    * Empiezan por la posición cero.
    * Se accede a un elemento concreto usando corchetes `lista[0]="Paco"`.
    * Se pueden añadir elementos `lista[3]="Fernandez`.
* Salida de comando:
    * Se declara entre tildes invertidas \` `fichero='cat fichero.sh'`

Para poder usar una variable anteriormente definida, **EXCEPTO LOS ARRAYS**, se puede usar:

* `$` -> `Mi nombre es $nombre`.
* `(())` -> `((numero++))` ó `((numero=numero+1))`.
* `let ""` -> `let "numero++"` ó `let "numero=numero+1`.

Variable `$?`:

* Si se ha ejecutado un comando anterior, podemos recoger el valor que devuelve con esta variable.
* Si el comando se ha ejecutado sin problemas, devuelve 0.
* Si da algun problema, devuelve otro número / cosa.
    * Para saber que devuelve el comando hay que mirar su man page -> `man <comando>`.

### Arrays

* Declaración:
    * Directamente -> `lista=(uno dos tres)`
    * Poco a poco -> `lista=[0]="uno"; lista[1]="dos"; lista[2]="tres"`.
* Uso con `${}`
    * `$lista` -> Devuelve solo el primer elemento.
    * `$lista[3]` -> Sigue devolviendo el primer elemento junto con las letras `[3]`.
    * `${lista}` -> Devuelve solo el primer elemento.
    * `${lista[3]}` -> Devuelve el cuarto elemento.
    * `${lista[*]}` -> Devuelve todo el array.
    * `${#lista[*]}` -> Devuelve el número de elementos que contiene el array.
    * `${#lista[1]}` -> Devuelve el número de elementos que tiene el segundo elemento del array.
* Borrar con `unset`:
    * `unset lista[1]` -> Borra el segundo elemento.
    * `unset lista` -> Borra todo el array.

## Sintaxis

* No es obligatorio con las tabulaciones.
* Si es muy porculero con los espacios, sobre todo en condiciones, bucles, y demás.
* Los comentarios empiezan por `#`.
* Se pueden poner varias instrucciones por linea separándolas por `;`.
* La sentencia `set -u` después del shebang inicial ayuda a indicar errores de gramática (poner mal el nombre de una variable).

### Operadores

* Operadores booleanes:
    * `true`.
    * `false`.
* Operadores matemáticos:
    * `+` -> Suma.
    * `-` -> Resta.
    * `*` -> Multiplicación.
    * `/` -> Division.
    * `%` -> Módulo.
* Comparaciones lógicas:
    * `-lt` / `-gt` -> Menor (<) / mayor (>) que.
    * `-le` / `-ge` -> Menor o igual (<=) / mayor o igual (>=) que.
    * `-eq` / `-ne` -> Igual (==) / distinto (!=) que.
    * `z` / `n` -> Nulo (ningún carácter) / no nulo (al menos un carácter).
    * `-a` ó `&&` -> AND.
    * `-o` ó `||` -> OR.
* Operadores condicionales de ficheros:
    * `-e` -> Si existe.
    * `-f` -> Si existe y NO es un directorio.
    * `-d` -> Si existe y NO es un fichero.
    * `-s` -> Si existe y no está vacío.
    * `-r` -> Si existe y tiene permisos de lectura.
    * `-w` -> Si existe y tiene permisos de escritura.
    * `-x` -> Si existe y tiene permisos de ejecución.

### Argumentos de entrada

`./<fichero> <arg1> <arg2> <arg3>`

El argumento 0 sería el nombre del propio fichero. Los demás argumentos van separados por espacios. Dentro del fichero podemos usar los argumentos con:

* `$0` -> Primer argumento (nombre del script).
* `$1` -> Segundo argumento.
* `$...`

Se pueden usar como un array:

* `$*` -> Todos los argumentos en formato string (sin `$0`).
* `$@` -> Todos los argumentos en formato array (sin `$0`).
* `$#` -> Número de argumentos (sin `$0`).

Puedes leer argumentos interactivamente con `read <variable>`

```bash
#!/bin/bash

echo "Introduce tu nombre"
read nombre

read -p "Ahora el apellido" apellido

echo "Te llamas $nombre $apellido
```

### `exit`

Existe un comando para salir de un script en un momento concreto y devolver un valor estimado.

```bash
exit <valor>
```

`exit 1` -> Saldría del script devolviendo 1.
`exit` -> Saldría del script devolviendo el valor de la variable `$?` de dentro del script.

### if

```bash
if [ <condicion> ]; then
    <comandos>
elif [ <condicion>]; then
    <comandos>
else
    <comandos>
fi
```

Si la `<condicion>` es un string, deberías de poner `[[ <condicion> ]]` en lugar de `[ <condicion> ]`.

### case

```bash
case <variable> in
    <opcion1>)
        <comandos>
        ;;
    <opcion2>|<opcion3>)
        <comandos>
        ;;
    <opcion4>)
        <comandos>
        ;;
    *)
        <comandos>
esac
```

En las `<opcion>` podemos hacer lo siguiente, si quisiera que se leyera `make` o `Make`, haríamos que `<opcion>` sea `[Mm]ake`.

### while

```bash
while (( <condicion> ))
do
    <comandos>
done
```

### for

```bash
for <elemento> in <array>
do
    <comandos>
done
```

Se recomienda usar la `@` en los arrays de los `for` en lugar de `*`. Ejemplo:

```bash
#!/bin/bash

lista=(uno dos tres)
for i in ${lista[@]}
do
    echo "Elemento $i"
done
```

## Recorrer ficheros externos

Con `while` leemos líneas:

```bash
while read LINE
do
    <comandos>
done < <fichero>
```

Con `for` leemos palabras:

```bash
for <elemento> in <contenido-fichero>
do
    <comandos>
done
```

Un ejemplo, le paso `sh ejemplo.sh mifichero.txt`:

```bash
#!/bin/bash

fichero=$1
pos=1
while read LINE
do
    echo "Linea $pos: $LINE"
    ((pos++))
done < $fichero

palabras=`cat $fichero`
for palabra in $palabras
do
    echo $palabra
done
```
