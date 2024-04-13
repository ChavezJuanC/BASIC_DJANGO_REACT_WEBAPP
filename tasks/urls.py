from django.urls import path, include
from rest_framework import routers
from tasks import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r"tasks", viewset=views.TaskView, basename="tasks")


urlpatterns = [
    path("api/v1/", view=include(router.urls)),
    path("docs/", view=include_docs_urls(title="Tasks API")),
]

# this code takes care of all the requests types like POST, GET, PUT, DELETE #CRUD#
