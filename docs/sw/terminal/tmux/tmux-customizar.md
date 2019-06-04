# Customizar tmux

Toda la configuración de tmux se encuentra en el fichero `.tmux.conf`. Es probable que por defecto no haya ningún fichero de configuración. si así fuera, se recomienda ponerlo en `~/.tmux.conf`.

Cuando se quiera cargar la configuración hay que hacer

```bash
tmux source-file <fichero>
```

En nuestro caso sería 

```bash
tmux source-file ~/.tmux.conf
```

## Temas

Jim Myhrbergs tiene un repo lleno de temas -> [tmux-themepack](https://github.com/jimeh/tmux-themepack)

Hay dos maneras de instalarlos, manualmente o a través del **TMP** (tmux plugin manager)

## Cheatsheet

Se adjunta una cheatsheet con todos los comandos -> [Cheatsheet](https://gist.github.com/MohamedAlaa/2961058)

## Oh My Tmux

Repo para customizar a lo ZSH -> [Oh My Tmux!](https://github.com/gpakosz/.tmux)

## El Tao de TMUX

Un libro para saber como trabajar eficientemente con TMUX -> [The Tao of tmux](https://leanpub.com/the-tao-of-tmux/read)
