from django.db import models


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)


    #this line changes the string representation for each task in django admin page
    def __str__(self) -> str:
        return self.title
    
    