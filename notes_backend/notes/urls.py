# notes/urls.py
from django.urls import path, include
from .views import save_note, note_list, note_detail

urlpatterns = [
    path('save_note/', save_note, name='save_note'),
    path('', note_list, name='note_list'),
    path('note_detail/<int:note_id>/', note_detail, name='note_detail'),
]
