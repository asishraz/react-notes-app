from django.shortcuts import render, HttpResponse
from .models import Note
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def save_note(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get("title")
        description = data.get('description')
        Note.objects.create(title=title, description=description)
        return HttpResponse("notes saved succesfully")

    else:
        return HttpResponse("Invalid request method")
