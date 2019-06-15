# Comandos

La lista de comandos oficial -> [https://github.com/nvie/gitflow/wiki/Command-Line-Arguments]

## Cheatsheet

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

## Comandos a fondo

### Ver todos los comandos

```bash
git flow
```

### Inicializacion

```bash
# Inicializar repo con git flow
# -d = default -> ramas con nombres por defecto
# -f = force
git flow init [-d] [-f]
```

### Feature

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

### Release

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

### Hotfix

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

### Support

```bash
# Ver ramas support
# -v = verbose
git flow support [list] [-v]

# Inicializar una rama support/<version>
# -F = fetch -> de origin antes de la operacion
# <base> -> commit de master del que se parte
git flow support start [-F] <version> <base>
```
