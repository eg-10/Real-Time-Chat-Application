# Generated by Django 3.1.1 on 2020-09-14 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20200913_1702'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='participants',
            field=models.ManyToManyField(related_name='chats', to='chat.Customer'),
        ),
    ]
