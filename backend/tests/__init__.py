from unittest.mock import Mock
import sys

sys.modules["backend.app.models.model"] = Mock()
from backend.main import app
