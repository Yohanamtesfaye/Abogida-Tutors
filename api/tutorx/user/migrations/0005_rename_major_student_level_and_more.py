# Generated by Django 5.0.1 on 2024-03-30 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_customuser_role'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='major',
            new_name='level',
        ),
        migrations.RenameField(
            model_name='student',
            old_name='university_name',
            new_name='location',
        ),
        migrations.RemoveField(
            model_name='parent',
            name='address',
        ),
        migrations.RemoveField(
            model_name='parent',
            name='number_of_children',
        ),
        migrations.RemoveField(
            model_name='student',
            name='year_of_study',
        ),
        migrations.AddField(
            model_name='customuser',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='location',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='parent',
            name='level',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parent',
            name='location',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parent',
            name='password',
            field=models.CharField(default=1, max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parent',
            name='subject',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='password',
            field=models.CharField(default=1, max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='phone_number',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='subject',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tutor',
            name='cv',
            field=models.FileField(blank=True, upload_to='cv/'),
        ),
    ]
