# Puesta a punto

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

## Plugins

### Plugin oficial

Existe un plugin oficial para tener autocompletado en `bash` o `zsh` -> [git-flow-completion](https://github.com/bobthecow/git-flow-completion)

### Plugin ZSH

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
