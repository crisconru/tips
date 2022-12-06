# Git Flow

Info oficial -> [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

Repositorio oficial -> [Git Flow en Github](https://github.com/nvie/gitflow)

Git Flow es una forma ordenada de trabajar con GIT en proyectos SW. Consiste en tener todo separado por ramas y seguir una política de rabajo y commits muy específicas con ellas. Así que tendremos:

* `master`:
    * Rama principal que tendrá código final (testado y validado) preparado para ser subido a producción o en producción.
    * No se trabaja sobre ella, es decir, todo el código que le llega es a través de un merge.
    * Todos los "commits" (merges) que hay sobre ella, tienen un `tag` definido, que indica la versión del programa.
* `develop`:
    * Es la rama de desarrollo principal.
    * Para implementar git-flow al menos deben de estar `master` y `develop`.
    * Tiene código de futuras versiones (`master` solo código estable para producción).
    * De ella derivan las demás ramas de desarrollo.
* `feature-<característica>`:
    * Estas son ramas que parten de `develop`.
    * Son para desarrollar una única característica por rama.
    * Cuando se acaba, se mergea con `develop` y se finaliza la rama.
* `release/<version>`:
    * Parten de `develop`.
    * Tienen código estable preparado para ser subido a `master` a falta de un buen testeo.
    * Una vez su código está listo, se mergea tanto con `develop` como con `master` y se finaliza la rama.
* `hofix/<version>`:
    * Parten de `master`.
    * Si en producción se encuentra un error, se genera esta rama, con la versión del código en producción como nombre, se arregla.
    * Por último se mergea con `develop` como con `master` (poniéndole un `tag` que aumente la versión) y se finaliza la rama.
* `support/<version>`:
    * Esto no lo cubre en realidad Git Flow.
    * Las ramas support son para si se mantienen distintas versiones al mismo tiempo.
    * Sería equivalente a una rama `master` pero solo para una versión `major` de tu programa.

Pueden existir incluso más ramas, como las `pull-request/<version>`.

Ejemplo de Git Flow en vertical

![Git Flow Vertical](img/git-flow-1.png)

Ejemplo de Git Flow en horizontal

![Git Flow en horizontal](img/git-flow-2.png)

Otra imagen en horizontal de Git Flow

![Git Flow en horizontal de Atlassian](img/git-flow-3.svg)

## Instalación

Instrucciones para la instalación -> [aquí](https://github.com/nvie/gitflow/wiki/Installation)

```bash
# Linux
sudo apt install git-flow

# Mac OS
brew install git-flow

# Windows
...
```

### Plugins

#### Plugin oficial

Existe un plugin oficial para tener autocompletado en `bash` o `zsh` -> [git-flow-completion](https://github.com/bobthecow/git-flow-completion)

#### Plugin ZSH

ZSH trae ya el suyo propio -> [git-flow plugin](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/git-flow)

Estos son sus alias

| Alias   | Command                    | Description                            |
|---------|----------------------------|----------------------------------------|
| `gfl`   | `git flow`                 | Git-Flow command                       |
| `gfli`  | `git flow init`            | Initialize git-flow repository         |
| `gcd`   | `git checkout develop`     | Check out develop branch               |
| `gch`   | `git checkout hotfix`      | Check out hotfix branch                |
| `gcr`   | `git checkout release`     | Check out release branch               |
| `gflf`  | `git flow feature`         | List existing feature branches         |
| `gflh`  | `git flow hotfix`          | List existing hotfix branches          |
| `gflr`  | `git flow release`         | List existing release branches         |
| `gflfs` | `git flow feature start`   | Start a new feature: `gflfs <name>`    |
| `gflhs` | `git flow hotfix start`    | Start a new hotfix: `gflhs <version>`  |
| `gflrs` | `git flow release start`   | Start a new release: `gflrs <version>` |
| `gflff` | `git flow feature finish`  | Finish feature: `gflff <name>`         |
| `gflfp` | `git flow feature publish` | Publish feature: `gflfp <name>`        |
| `gflhf` | `git flow hotfix finish`   | Finish hotfix: `gflhf <version>`       |
| `gflrf` | `git flow release finish`  | Finish release: `gflrf <version>`      |

## Configuración

### Configurar un diferente repositorio remoto (origin)

```bash
git config gitflow.origin <mi-origin>
```

### Fetchin por defecto antes de operaciones locales

```bash
git config gitflow.feature.start.fetch true
```

Se puede sobreescribir el comando añadiéndole el argumento `--nofetch`

### Evitar etiquetas automáticas creadas en los hotfixes

```bash
git config gitflow.hotfix.finish.notag true
```

## Comandos

La lista de comandos oficial -> [https://github.com/nvie/gitflow/wiki/Command-Line-Arguments]

### Cheatsheet

```bash
# Listar comandos
git flow

# Inicializar repo
git flow init [-d]

# Ramas feature
git flow feature
git flow feature start <name> [<base-commit-from-develop>]
git flow feature finish <name>
git flow feature pull <remote> <name>
git flow feature publish <name>

# Ramas release
git flow release
git flow release start <release> [<base-commit-from-develop>]
git flow release finish <release>

# Ramas hotfix
git flow hotfix
git flow hotfix start <release> [<base-commit-from-master>]
git flow hotfix finish <release>

# Ramas support
git flow support
git flow support start <release> <base-commit-from-master>
```

### Comandos a fondo

#### Ver todos los comandos

```bash
git flow
```

#### Inicializacion

```bash
# Inicializar repo con git flow
# -d = default -> ramas con nombres por defecto
# -f = force
git flow init [-d] [-f]
```

#### Feature

```bash
# Ver ramas feature
# -v = verbose
git flow feature [list] [-v]

# Inicializar una rama feature/<name>
# -F = fetch -> de origin antes de la operacion
# <base> -> commit de develop del que se parte
git flow feature start [-F] <name> [<base>]

# Finalizar una rama feature/<name>
# -r = rebase en vez de merge
# -F = fetch -> de origin antes de la operacion
# -k = keep -> mantener la rama despues de finalizar
# -D = delete -> borrado forzado despues de finalizar
# -S = squash -> aplastar commits durante el merge
git flow feature [-rFkDS] finish <name>

# Pull de la rama remota (de origin)
git flow feature pull <remote> [<name>]

# Push a la rama remota (de origin)
git flow feature publish <name>

# Empezar a seguir feature/<name> que es compartida en origin
git flow feature track <name>

# Cambiar a la rama feature <name>
git flow feature checkout [<name>]

# Ver diferencias respecto a develop
git flow feature diff [<name>]

# Rebase la feature <name> en develop
# -i = interactive
git flow feature rebase [-i] [<name>]

# Eliminar rama feature/<name>
# -f = force -> eliminar rama que no ha sido mergeada
git flow feature delete [-f] <name>
```

#### Release

```bash
# Ver ramas release
# -v = verbose
git flow release [list] [-v]

# Inicializar una rama release/<version>
# -F = fetch -> de origin antes de la operacion
git flow release start [-F] <version>

# Finalizar una rama release/<version>
# -F = fetch -> de origin antes de la operacion
# -s = sign -> firmar release tag criptográficamente
# -u = GPG-key -> usar la clave GPG-key para firmar digitalmente (se usa con -s)
# -m = message -> mensaje del tag
# -p = push -> push a origin despues de la operación
# -k = keep -> mantener la rama despues de finalizar
# -n = no-tag -> no etiquetar esta release
# -S = squash -> aplastar commits durante el merge
git flow release finish [-FsumpknS] <version>

# Push a la rama remota (de origin)
git flow release publish <name>

# Empezar a seguir release/<name> que es compartida en origin
git flow release track <name>

# Eliminar rama release/<name>
# -f = force -> eliminar rama que no ha sido mergeada
git flow release delete [-f] <name>
```

#### Hotfix

```bash
# ver ramas hotfix
# -v = verbose
git flow hotfix [list] [-v]

# Inicializar una rama hotfix/<version>
# -F = fetch -> de origin antes de la operacion
git flow hotfix start [-F] <version> [<base>]

# Finalizar una rama hotfix/<version>
# -F = fetch -> de origin antes de la operacion
# -s = sign -> firmar release tag criptográficamente
# -u = GPG-key -> usar la clave GPG-key para firmar digitalmente (se usa con -s)
# -m = message -> mensaje del tag
# -p = push -> push a origin despues de la operación
# -k = keep -> mantener la rama despues de finalizar
# -n = no-tag -> no etiquetar esta release
# -S = squash -> aplastar commits durante el merge
git flow hotfix finish [-FsumpknS] <version>

# Eliminar rama hotfix/<name>
# -f = force -> eliminar rama que no ha sido mergeada
git flow hotfix delete [-f] <name>
```

#### Support

```bash
# Ver ramas support
# -v = verbose
git flow support [list] [-v]

# Inicializar una rama support/<version>
# -F = fetch -> de origin antes de la operacion
# <base> -> commit de master del que se parte
git flow support start [-F] <version> <base>
```
