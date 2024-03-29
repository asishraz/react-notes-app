import sys
print(sys.path)

import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "notes_backend.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Manually add the path to the directory containing 'notes_backend'
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))

    execute_from_command_line(sys.argv)
