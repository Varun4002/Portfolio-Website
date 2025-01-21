from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware  # <-- Add this import

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify specific ones like ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize Supabase client
url = "maw"
key = "meoww noo copy my db keys :("
supabase: Client = create_client(url, key)

# Define a Pydantic model for the contact form
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.post("/submit-form/")
async def submit_contact_form(contact: ContactForm):
    # Insert data into Supabase
    response = supabase.table("contact_forms").insert({
        "name": contact.name,
        "email": contact.email,
        "message": contact.message
    }).execute()

    # Check for success
    if response.get("status") == 201:
        return JSONResponse(content={"message": "Form submitted successfully!"}, status_code=200)
    else:
        raise HTTPException(status_code=400, detail="Error submitting form")

