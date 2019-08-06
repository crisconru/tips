# Playbook

Un playbook es un fichero con un conjunto de recetas (tareas) ordenadas, para no tener que ir introduciendo todo a mano con comandos ad hoc. Usa formato YAML.

```yaml
---
- name: Mi playbook
  hosts: all
  remote_user: pi
  become: true
  tasks:
    - name: copiar fichero hosts
      copy: src=/etc/hosts dest=/etc/hosts
```

Para ejecutarlo

```bash
ansible-playbook [-i <inventario>] [<opciones>] <fichero.yml>
```

## Opciones

* `-i <inventario>` -> Indicar el inventario en formato fichero (estático) / script (dinámico) / directorio (estático + dinámico).
* `--syntax-check` -> Comprobar sintaxus del playbook.
* `--list-tasks` -> Listar tareas.
* `--step` -> Pregunta paso a paso.
* `--start-at-task=<tarea>` -> Empezar por una tarea concreta.
* `--forks=<num de tareas> | -f <num de tareas>` -> Cantidad de tareas en paralelo (por defecto `<num de tareas>` es `5`).
* `-v | -vv | -vvv` -> Aumentar el `verbose` (información de cada operación que se hace).
