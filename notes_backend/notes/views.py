# notes/views.py
import json

from django.shortcuts import render, redirect, get_object_or_404
from .models import Note
from django.http import HttpResponse


def save_note(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description')
        Note.objects.create(title=title, description=description)
        return redirect('note_list')  # Redirect to the note list view
    else:
        return HttpResponse('Invalid request method!')


def note_list(request):
    notes = Note.objects.all()
    return render(request, 'notes/note_list.html', {'notes': notes})

def note_detail(request, note_id):
    note = get_object_or_404(Note, pk=note_id)
    return render(request, 'notes/note_detail.html', {'note': note})