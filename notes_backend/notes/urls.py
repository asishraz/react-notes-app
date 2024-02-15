# notes/urls.py
from django.urls import path, include
from .views import save_note, NoteListCreateView, NoteDetailView, note_list
from . import views

urlpatterns = [
    path('api/notes/', NoteListCreateView.as_view(), name='note_list'),
    # path('notes/', NoteListCreateView.as_view(), name='note_list'),
    # path('notes/', views.note_list, name='note_list'),
    path('api/notes/<int:pk>/', NoteDetailView.as_view(), name='note_detail'),
    path('api/notes/save_note/', save_note, name='save_note'),
]
