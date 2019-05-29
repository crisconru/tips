# Fecha y Hora

Para ajustar la fecha usamos el comando `date`

## Fecha

`sudo date +%Y%m%d -s "20170628"`

## Hora (formato 24 horas)

`sudo date +%T -s "12:47:24"`

## Hora (formato 12 horas)

`sudo date +%T%p -s "12:47:24AM"`  
`sudo date +%T%p -s "12:47:24PM"`  

## Para más info mirar siempre la ayuda

`date --help`

## Referencias

* [Fecha y Hora en la terminal](https://www.cyberciti.biz/faq/howto-set-date-time-from-linux-command-prompt/)