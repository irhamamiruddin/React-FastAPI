from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
import uvicorn
import os
from dotenv import load_dotenv, find_dotenv
# from server.api import api_router
# from server.config import settings
from modules.socket import initializeSocket

# Load env
load_dotenv(find_dotenv())

app = FastAPI(
    title="REST API",
    description="API for REACT APP.",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Serve static files if the "build" directory exists
# build_dir = "./build"
# if os.path.exists(build_dir):
#     print("Serving static files from %s" % build_dir)
#     app.mount("/", StaticFiles(directory=build_dir, html=True), name="build")
# else:
#     print("Build directory not found.")


app = initializeSocket(app)

if __name__ == "__main__":
    # Get the env
    try:
        HOST = os.getenv('HOST', '0.0.0.0')
        PORT = int(os.getenv('PORT', 5051))
        uvicorn.run(app, host=HOST, port=PORT)
    except Exception as e:
        print("Error running the app: %s", str(e))
