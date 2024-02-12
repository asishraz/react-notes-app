# notes/urls.py
from django.urls import path, include
from .views import save_note, NoteListCreateView, NoteDetailView

urlpatterns = [
    path('notes/', NoteListCreateView.as_view(), name='note_list'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note_detail'),
    path('notes/save_note/', save_note, name='save_note'),
]
