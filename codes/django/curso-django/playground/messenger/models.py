from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import m2m_changed


# Create your models here.
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']


class ThreadManager(models.Manager):
    def find(self, user1, user2):
        # self es lo mismo que Thread.objects.all()
        queryset = self.filter(users=user1).filter(users=user2)
        if len(queryset):
            return queryset[0]

    def find_or_create(self, user1, user2):
        thread = self.find(user1, user2)
        if not thread:
            thread = Thread.objects.create()
            thread.users.add(user1, user2)
        return thread


class Thread(models.Model):
    users = models.ManyToManyField(User, related_name='threads')
    messages = models.ManyToManyField(Message)
    updated = models.DateTimeField(auto_now=True)
    # Model Manager
    objects = ThreadManager()

    class Meta:
        ordering = ['-updated']


def messages_changed(sender, **kwargs):
    instance = kwargs.pop('instance', None)
    action = kwargs.pop('action', None)
    pk_set = kwargs.pop('pk_set', None)
    print(f'{instance} {action} {pk_set}')
    # Busca los mensajes que no deben de estar en el hilo
    false_pk_set = set()
    if action == 'pre_add':
        for msg_pk in pk_set:
            msg = Message.objects.get(pk=msg_pk)
            if msg.user not in instance.users.all():
                print(f'{msg.user} no forma parte del hilo')
                false_pk_set.add(msg_pk)
    # Borra del hilo los mensajes que no deben de estar
    pk_set.difference_update(false_pk_set)
    # Forzar actualizacion haciendo save
    instance.save()

m2m_changed.connect(messages_changed, sender=Thread.messages.through)
