# Generated by Django 5.0.1 on 2024-04-03 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0016_customuser_cv'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='role2',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('S', 'Student'), ('P', 'Parent'), ('T', 'Tutor')], max_length=10),
        ),
    ]
